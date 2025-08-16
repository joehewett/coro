import React from 'react';
import { Position } from '../types';
import { getCharacterImageSrc } from '../utils';

interface CharacterProps {
  position: Position;
  currentFrame: number;
  alt: string;
  isNPC?: boolean;
}

export const Character: React.FC<CharacterProps> = ({ 
  position, 
  currentFrame, 
  alt, 
  isNPC = false 
}) => {
  return (
    <img
      src={getCharacterImageSrc(currentFrame)}
      alt={alt}
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '48px',
        height: '48px',
        imageRendering: 'pixelated',
        transition: 'none',
        zIndex: 2,
        filter: isNPC ? 'hue-rotate(120deg)' : 'none'
      }}
    />
  );
};
