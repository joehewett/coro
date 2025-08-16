import { useState, useEffect, useRef } from 'react';
import { Position, MapRect } from '../types';
import { gameConfig, getCenteredPosition, constrainPosition } from '../utils';

export const usePlayerMovement = (mapRect: MapRect) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  
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
      }
      if (keysPressed.current.has('ArrowRight')) {
        newX = prev.x + gameConfig.moveSpeed;
        hasMovement = true;
      }

      // Constrain to map boundaries
      const constrainedPosition = constrainPosition({ x: newX, y: newY }, mapRect, gameConfig.hedgehogSize);

      // Update movement state and animation frame
      setIsMoving(hasMovement);
      
      if (hasMovement) {
        frameCounterRef.current++;
        if (frameCounterRef.current % gameConfig.frameUpdateInterval === 0) {
          setCurrentFrame(prev => prev === 0 ? 1 : 0);
        }
      }

      // Update position ref
      currentPositionRef.current = constrainedPosition;
      return constrainedPosition;
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
    currentPositionRef,
    updatePosition,
    handleKeyDown,
    handleKeyUp
  };
};
