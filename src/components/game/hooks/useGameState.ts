import { useState, useEffect } from 'react';
import { GameLocation } from '../types';
import { gameConfig, isWithinProximity } from '../utils';

interface UseGameStateProps {
  playerPosition: { x: number; y: number };
  npcPosition: { x: number; y: number };
  currentLocation: GameLocation;
}

export const useGameState = ({ playerPosition, npcPosition, currentLocation }: UseGameStateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Check proximity for greeting - only in village
  useEffect(() => {
    if (currentLocation === GameLocation.VILLAGE) {
      const shouldShowGreeting = isWithinProximity(playerPosition, npcPosition);
      setShowGreeting(shouldShowGreeting);
    } else {
      setShowGreeting(false);
    }
  }, [playerPosition, npcPosition, currentLocation]);

  const handleInteraction = (onLocationChange: (location: GameLocation) => void) => {
    if (currentLocation === GameLocation.VILLAGE && !isLoading) {
      const isCloseEnough = isWithinProximity(playerPosition, npcPosition);
      
      if (isCloseEnough) {
        setIsLoading(true);
        
        // Show loading screen for duration, then transition to library
        setTimeout(() => {
          onLocationChange(GameLocation.LIBRARY);
          setIsLoading(false);
        }, gameConfig.loadingDuration);
      }
    }
  };

  return {
    isLoading,
    showGreeting,
    handleInteraction
  };
};
