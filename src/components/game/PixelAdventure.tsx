import React, { useState } from 'react';
import { GameLocation } from './types';
import { GameMap, Character, InteractionPrompt, LoadingScreen } from './components';
import { 
  useMapLayout, 
  usePlayerMovement, 
  useNPCBehavior, 
  useGameState, 
  useGameLoop 
} from './hooks';

const PixelAdventure: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<GameLocation>(GameLocation.VILLAGE);
  
  // Custom hooks
  const mapRect = useMapLayout(currentLocation);
  const playerMovement = usePlayerMovement(mapRect);
  const npcBehavior = useNPCBehavior(mapRect, playerMovement.currentPositionRef.current);
  const gameState = useGameState({
    playerPosition: playerMovement.currentPositionRef.current,
    npcPosition: npcBehavior.currentNpcPositionRef.current,
    currentLocation
  });

  // Game loop
  useGameLoop({
    updatePlayerPosition: playerMovement.updatePosition,
    updateNPCPosition: npcBehavior.updateNPCPosition,
    handlePlayerKeyDown: playerMovement.handleKeyDown,
    handlePlayerKeyUp: playerMovement.handleKeyUp,
    handleInteraction: gameState.handleInteraction,
    onLocationChange: setCurrentLocation,
    mapRect
  });

  return (
    <div 
      className="w-screen h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#041704' }}
      tabIndex={0}
    >
      <GameMap currentLocation={currentLocation} mapRect={mapRect} />
      
      <Character 
        position={playerMovement.position}
        currentFrame={playerMovement.currentFrame}
        alt="Player Hedgehog"
      />

      {currentLocation === GameLocation.VILLAGE && (
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
      )}

      <LoadingScreen isLoading={gameState.isLoading} />
    </div>
  );
};

export default PixelAdventure;
