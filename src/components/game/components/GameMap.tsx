import React from 'react';
import { MapRect, GameLocation } from '../types';
import { getLocationImageSrc, getLocationAltText } from '../utils';

interface GameMapProps {
  currentLocation: GameLocation;
  mapRect: MapRect;
}

export const GameMap: React.FC<GameMapProps> = ({ currentLocation, mapRect }) => {
  return (
    <img
      src={getLocationImageSrc(currentLocation)}
      alt={getLocationAltText(currentLocation)}
      className="absolute"
      style={{
        left: `${mapRect.x}px`,
        top: `${mapRect.y}px`,
        width: `${mapRect.width}px`,
        height: `${mapRect.height}px`,
        imageRendering: 'pixelated',
        zIndex: 1
      }}
    />
  );
};
