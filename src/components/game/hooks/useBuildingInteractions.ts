import { useState, useEffect } from 'react';
import { GameLocation, InteractionZone } from '../types';
import { getInteractionZonesForLocation, findNearbyInteractionZone, getLocationImageSrc, convertRelativeZonesToAbsolute } from '../utils';
import { gameConfig } from '../utils';

interface UseBuildingInteractionsProps {
  playerPosition: { x: number; y: number };
  currentLocation: GameLocation;
  imageBounds: { x: number; y: number; width: number; height: number };
}

export const useBuildingInteractions = ({ playerPosition, currentLocation, imageBounds }: UseBuildingInteractionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentInteractionZone, setCurrentInteractionZone] = useState<InteractionZone | null>(null);
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);

  // Get interaction zones for current location and convert to absolute coordinates
  const relativeZones = getInteractionZonesForLocation(currentLocation);
  const interactionZones = convertRelativeZonesToAbsolute(relativeZones, imageBounds);

  // Check if player is in any interaction zone
  useEffect(() => {
    if (imageBounds.width > 0 && imageBounds.height > 0) {
      const zone = findNearbyInteractionZone(playerPosition, interactionZones, 32, gameConfig.hedgehogSize);
      setCurrentInteractionZone(zone);
      setShowInteractionPrompt(!!zone);
    }
  }, [playerPosition, interactionZones, imageBounds]);

  const handleBuildingInteraction = (onLocationChange: (location: GameLocation) => void) => {
    if (currentInteractionZone && !isLoading) {
      setIsLoading(true);
      
      // Preload the target location image
      const targetLocation = currentInteractionZone.targetLocation;
      const img = new Image();
      img.src = getLocationImageSrc(targetLocation);
      
      // Wait for both the loading duration and image to load
      const loadingTimer = new Promise(resolve => 
        setTimeout(resolve, gameConfig.loadingDuration)
      );
      
      const imageLoader = new Promise(resolve => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true); // Continue even if image fails to load
        }
      });
      
      Promise.all([loadingTimer, imageLoader]).then(() => {
        onLocationChange(targetLocation);
        setIsLoading(false);
      });
    }
  };

  return {
    isLoading,
    currentInteractionZone,
    showInteractionPrompt,
    handleBuildingInteraction,
    interactionZones
  };
};
