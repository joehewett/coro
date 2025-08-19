import React, { useState, useEffect, useRef } from 'react';
import { GameLocation } from './types';
import { GameMap, Character, LoadingScreen, InteractionZones, BuildingInteractionPrompt, MultiplayerPlayers, ConnectionStatus, CharacterSelect, PlayerDebugInfo, ProximityVisualization } from './components';
import { 
  useFixedCanvasLayout,
  usePlayerMovement, 
  useNPCBehavior, 
  useGameState, 
  useGameLoop,
  useBuildingInteractions,
  useImageBounds,
  usePartyKitMultiplayer,
  useCenteredFixedCanvasLayout
} from './hooks';
import { getInteractionZonesForLocation, convertRelativeZonesToCanvas } from './utils';

const PixelAdventure: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>(GameLocation.VILLAGE);
  const [selectedCharacter, setSelectedCharacter] = useState<'coro' | 'joe' | null>(null);
  const [showDebug, setShowDebug] = useState(true); // Enable debug mode by default
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks - use fixed canvas layout
  const mapRect = useCenteredFixedCanvasLayout();
  const imageBounds = useImageBounds(currentLocation);
  
  // Get collision zones in canvas coordinates for movement collision detection
  const canvasCollisionZones = convertRelativeZonesToCanvas(getInteractionZonesForLocation(currentLocation));
  
  const buildingInteractions = useBuildingInteractions({
    playerPosition: { x: 0, y: 0 }, // Will be updated by the movement hooks
    currentLocation,
    imageBounds: imageBounds.imageBounds
  });
  
  // Pass canvas collision zones to movement hooks
  const playerMovement = usePlayerMovement(mapRect, canvasCollisionZones);
  const npcBehavior = useNPCBehavior(mapRect, playerMovement.currentPositionRef.current, canvasCollisionZones);
  
  const gameState = useGameState({
    playerPosition: playerMovement.currentPositionRef.current,
    npcPosition: npcBehavior.currentNpcPositionRef.current,
    currentLocation
  });

  // Update building interactions with actual player position (use screen coordinates)
  const updatedBuildingInteractions = useBuildingInteractions({
    playerPosition: playerMovement.position, // Use screen position, not canvas position
    currentLocation,
    imageBounds: imageBounds.imageBounds
  });

  // Multiplayer functionality - use canvas coordinates
  const multiplayer = usePartyKitMultiplayer({
    currentLocation,
    canvasPosition: playerMovement.currentPositionRef.current, // Canvas coordinates
    currentFrame: playerMovement.currentFrame,
    isMoving: playerMovement.isMoving,
    playerName: selectedCharacter ?? 'Player',
    fixedPlayerId: selectedCharacter ?? undefined,
    spriteVariant: selectedCharacter === 'joe' ? 1 : 0,
    facingDirection: playerMovement.facingDirection,
    mapRect: mapRect
  });

  // Auto-focus the game container to ensure keyboard events are captured
  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);

  // Game loop
  useGameLoop({
    updatePlayerPosition: playerMovement.updatePosition,
    updateNPCPosition: npcBehavior.updateNPCPosition,
    handlePlayerKeyDown: playerMovement.handleKeyDown,
    handlePlayerKeyUp: playerMovement.handleKeyUp,
    handleInteraction: (onLocationChange) => {
      // Try building interaction first, then NPC interaction
      if (updatedBuildingInteractions.currentInteractionZone) {
        updatedBuildingInteractions.handleBuildingInteraction(onLocationChange);
      } else {
        gameState.handleInteraction(onLocationChange);
      }
    },
    onLocationChange: setCurrentLocation,
    mapRect
  });

  return (
    <div 
      ref={gameContainerRef}
      className="w-screen h-screen relative overflow-hidden flex items-center justify-center outline-none"
      style={{ backgroundColor: '#041704' }}
      tabIndex={0}
    >
      {!selectedCharacter && (
        <CharacterSelect onSelect={(c) => setSelectedCharacter(c)} />
      )}
      <GameMap ref={imageBounds.imageRef} currentLocation={currentLocation} mapRect={mapRect} />
      
      {/* Debug: Show interaction zones */}
      <InteractionZones 
        zones={updatedBuildingInteractions.interactionZones} 
        showDebug={showDebug}
        playerPosition={playerMovement.position}
        proximityRadius={32}
      />
      
      {/* Proximity visualization */}
      <ProximityVisualization
        playerPosition={playerMovement.position}
        proximityRadius={32}
        characterSize={64}
        showDebug={showDebug}
      />

      {/* Current player */}
      <Character 
        position={playerMovement.position}
        currentFrame={playerMovement.currentFrame}
        alt="Player Hedgehog"
        facingDirection={playerMovement.facingDirection}
        showDebugBounds={showDebug}
      />

      {/* Other multiplayer players */}
      <MultiplayerPlayers 
        players={multiplayer.otherPlayers}
        showPlayerNames={true}
      />

      {/* {currentLocation === GameLocation.VILLAGE && (
        <>
          <Character 
            position={npcBehavior.npcPosition}
            currentFrame={npcBehavior.npcFrame}
            alt="NPC Hedgehog"
            isNPC={true}
          />
          
          <InteractionPrompt 
            npcPosition={npcBehavior.npcPosition}
            show={gameState.showGreeting}
          />
        </>
      )} */}

      {/* Building interaction prompt */}
      <BuildingInteractionPrompt 
        zone={updatedBuildingInteractions.currentInteractionZone}
        show={updatedBuildingInteractions.showInteractionPrompt}
      />

      <LoadingScreen isLoading={gameState.isLoading || updatedBuildingInteractions.isLoading} />
      
      {/* Connection status indicator */}
      <ConnectionStatus 
        isConnected={multiplayer.isConnected}
        isConnecting={multiplayer.isConnecting}
        error={multiplayer.error}
        playerCount={multiplayer.otherPlayers.length + 1} // +1 for current player
      />

      {/* Debug info for player coordinates */}
      {/* <PlayerDebugInfo 
        currentPlayerPosition={playerMovement.currentPositionRef.current}
        currentPlayerId={multiplayer.currentPlayerId}
        otherPlayers={multiplayer.otherPlayers}
        playerName={selectedCharacter ?? 'Player'}
      /> */}

      {/* Debug Panel */}
      {/* <DebugPanel
        playerPosition={playerMovement.position}
        playerCanvasPosition={playerMovement.currentPositionRef.current}
        mapRect={mapRect}
        imageBounds={imageBounds.imageBounds}
        currentInteractionZone={updatedBuildingInteractions.currentInteractionZone}
        showInteractionPrompt={updatedBuildingInteractions.showInteractionPrompt}
        showDebug={showDebug}
      /> */}

      {/* Debug Toggle Button */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-2 rounded text-sm font-mono z-50 hover:bg-gray-700"
      >
        Debug: {showDebug ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default PixelAdventure;
