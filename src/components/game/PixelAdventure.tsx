import React, { useState, useEffect, useRef } from 'react';
import { GameLocation } from './types';
import { GameMap, Character, InteractionPrompt, LoadingScreen, InteractionZones, BuildingInteractionPrompt, MultiplayerPlayers, ConnectionStatus, CharacterSelect } from './components';
import { 
  useMapLayout, 
  usePlayerMovement, 
  useNPCBehavior, 
  useGameState, 
  useGameLoop,
  useBuildingInteractions,
  useImageBounds,
  usePartyKitMultiplayer
} from './hooks';

const PixelAdventure: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>(GameLocation.VILLAGE);
  const [selectedCharacter, setSelectedCharacter] = useState<'coro' | 'joe' | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks
  const mapRect = useMapLayout(currentLocation);
  const imageBounds = useImageBounds(currentLocation);
  const buildingInteractions = useBuildingInteractions({
    playerPosition: { x: 0, y: 0 }, // Will be updated by the movement hooks
    currentLocation,
    imageBounds: imageBounds.imageBounds
  });
  
  // Pass collision zones to movement hooks
  const playerMovement = usePlayerMovement(mapRect, buildingInteractions.interactionZones);
  const npcBehavior = useNPCBehavior(mapRect, playerMovement.currentPositionRef.current, buildingInteractions.interactionZones);
  
  const gameState = useGameState({
    playerPosition: playerMovement.currentPositionRef.current,
    npcPosition: npcBehavior.currentNpcPositionRef.current,
    currentLocation
  });

  // Update building interactions with actual player position
  const updatedBuildingInteractions = useBuildingInteractions({
    playerPosition: playerMovement.currentPositionRef.current,
    currentLocation,
    imageBounds: imageBounds.imageBounds
  });

  // Multiplayer functionality
  const multiplayer = usePartyKitMultiplayer({
    currentLocation,
    playerPosition: playerMovement.currentPositionRef.current,
    currentFrame: playerMovement.currentFrame,
    isMoving: playerMovement.isMoving,
    playerName: selectedCharacter ?? 'Player',
    fixedPlayerId: selectedCharacter ?? undefined,
    spriteVariant: selectedCharacter === 'joe' ? 1 : 0,
    facingDirection: playerMovement.facingDirection
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
      <GameMap ref={imageBounds.imageRef} currentLocation={currentLocation} />
      
      {/* Debug: Show interaction zones (remove in production) */}
      <InteractionZones zones={updatedBuildingInteractions.interactionZones} showDebug={true} />
      
      {/* Current player */}
      <Character 
        position={playerMovement.position}
        currentFrame={playerMovement.currentFrame}
        alt="Player Hedgehog"
        facingDirection={playerMovement.facingDirection}
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
    </div>
  );
};

export default PixelAdventure;
