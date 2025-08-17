import { useState, useEffect, useRef } from 'react';
import { Position, MapRect, InteractionZone } from '../types';
import { gameConfig, getCenteredPosition, getValidPosition } from '../utils';

export const usePlayerMovement = (mapRect: MapRect, collisionZones: InteractionZone[] = []) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [facingDirection, setFacingDirection] = useState<'left' | 'right'>('right');
  
  const keysPressed = useRef<Set<string>>(new Set());
  const frameCounterRef = useRef(0);
  const currentPositionRef = useRef<Position>({ x: 0, y: 0 });

  // Center player when map rectangle is known
  useEffect(() => {
    if (mapRect.width > 0 && mapRect.height > 0) {
      const centeredPosition = getCenteredPosition(mapRect, gameConfig.hedgehogSize);
      setPosition(centeredPosition);
      currentPositionRef.current = centeredPosition;
    }
  }, [mapRect]);

  const updatePosition = () => {
    if (mapRect.width === 0 || mapRect.height === 0) {
      return;
    }

    setPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let hasMovement = false;

      if (keysPressed.current.has('ArrowUp')) {
        newY = prev.y - gameConfig.moveSpeed;
        hasMovement = true;
      }
      if (keysPressed.current.has('ArrowDown')) {
        newY = prev.y + gameConfig.moveSpeed;
        hasMovement = true;
      }
      if (keysPressed.current.has('ArrowLeft')) {
        newX = prev.x - gameConfig.moveSpeed;
        hasMovement = true;
        setFacingDirection('left');
      }
      if (keysPressed.current.has('ArrowRight')) {
        newX = prev.x + gameConfig.moveSpeed;
        hasMovement = true;
        setFacingDirection('right');
      }

      // Get valid position (constrained to map and avoiding collisions)
      const validPosition = getValidPosition(
        { x: newX, y: newY }, 
        prev, 
        gameConfig.hedgehogSize, 
        mapRect, 
        collisionZones
      );

      // Update movement state and animation frame
      setIsMoving(hasMovement);
      
      if (hasMovement) {
        frameCounterRef.current++;
        if (frameCounterRef.current % gameConfig.frameUpdateInterval === 0) {
          setCurrentFrame(prev => prev === 0 ? 1 : 0);
        }
      }

      // Update position ref
      currentPositionRef.current = validPosition;
      return validPosition;
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      keysPressed.current.add(event.key);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key);
  };

  return {
    position,
    currentFrame,
    isMoving,
    facingDirection,
    currentPositionRef,
    updatePosition,
    handleKeyDown,
    handleKeyUp
  };
};
