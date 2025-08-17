import React, { forwardRef } from 'react';
import { GameLocation, MapRect } from '../types';
import { getLocationImageSrc, getLocationAltText, gameConfig } from '../utils';

interface GameMapProps {
  currentLocation: GameLocation;
  mapRect: MapRect;
}

export const GameMap = forwardRef<HTMLImageElement, GameMapProps>(
  ({ currentLocation, mapRect }, ref) => {
    return (
      <img
        ref={ref}
        src={getLocationImageSrc(currentLocation)}
        alt={getLocationAltText(currentLocation)}
        className="transition-opacity duration-300 absolute"
        style={{
          imageRendering: 'pixelated',
          zIndex: 1,
          width: `${gameConfig.FIXED_CANVAS_WIDTH}px`,
          height: `${gameConfig.FIXED_CANVAS_HEIGHT}px`,
          transform: `scale(${mapRect.width / gameConfig.FIXED_CANVAS_WIDTH})`,
          transformOrigin: 'top left',
          left: `${mapRect.x}px`,
          top: `${mapRect.y}px`,
        }}
      />
    );
  }
);

GameMap.displayName = 'GameMap';
