import React from 'react';
import { Position } from '../types';
import { getCharacterImageSrc } from '../utils';

interface CharacterProps {
  position: Position;
  currentFrame: number;
  alt: string;
  isNPC?: boolean;
  spriteVariant?: number;
  facingDirection?: 'left' | 'right';
}

export const Character: React.FC<CharacterProps> = ({ 
  position, 
  currentFrame, 
  alt, 
  isNPC = false,
  spriteVariant = 0,
  facingDirection = 'right'
}) => {
  return (
    <img
      src={getCharacterImageSrc(currentFrame)}
      alt={alt}
      className={`absolute ${facingDirection === 'left' ? 'scale-x-[-1]' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '64px',
        height: '64px',
        imageRendering: 'pixelated',
        transition: 'none',
        zIndex: 2,
        filter: isNPC ? 'hue-rotate(120deg)' : spriteVariant > 0 ? `hue-rotate(${spriteVariant * 60}deg)` : 'none'
      }}
    />
  );
};
