import React, { forwardRef } from 'react';
import { GameLocation } from '../types';
import { getLocationImageSrc, getLocationAltText } from '../utils';

interface GameMapProps {
  currentLocation: GameLocation;
}

export const GameMap = forwardRef<HTMLImageElement, GameMapProps>(
  ({ currentLocation }, ref) => {
    return (
      <img
        ref={ref}
        src={getLocationImageSrc(currentLocation)}
        alt={getLocationAltText(currentLocation)}
        className="transition-opacity duration-300"
        style={{
          imageRendering: 'pixelated',
          zIndex: 1
        }}
      />
    );
  }
);

GameMap.displayName = 'GameMap';
