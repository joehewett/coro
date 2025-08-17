import { useState, useEffect, useRef } from 'react';
import { Position, MapRect, InteractionZone } from '../types';
import { gameConfig, getFixedCanvasCenteredPosition, canvasToScreenPosition } from '../utils';

export const usePlayerMovement = (mapRect: MapRect, collisionZones: InteractionZone[] = []) => {
  // Store position in canvas coordinates (0,0 to FIXED_CANVAS_WIDTH,FIXED_CANVAS_HEIGHT)
  const [canvasPosition, setCanvasPosition] = useState<Position>({ x: 0, y: 0 });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [facingDirection, setFacingDirection] = useState<'left' | 'right'>('right');
  
  const keysPressed = useRef<Set<string>>(new Set());
  const frameCounterRef = useRef(0);
  const currentCanvasPositionRef = useRef<Position>({ x: 0, y: 0 });

  // Initialize player at center of canvas
  useEffect(() => {
    const centeredCanvasPosition = getFixedCanvasCenteredPosition(gameConfig.hedgehogSize);
    setCanvasPosition(centeredCanvasPosition);
    currentCanvasPositionRef.current = centeredCanvasPosition;
  }, []);

  // Convert canvas position to screen position for rendering
  const screenPosition = mapRect.width > 0 ? canvasToScreenPosition(canvasPosition, mapRect) : { x: 0, y: 0 };

  const updatePosition = () => {
    setCanvasPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let hasMovement = false;

      if (keysPressed.current.has('ArrowUp')) {
        newY = Math.max(0, prev.y - gameConfig.moveSpeed);
        hasMovement = true;
      }
      if (keysPressed.current.has('ArrowDown')) {
        newY = Math.min(gameConfig.FIXED_CANVAS_HEIGHT - gameConfig.hedgehogSize, prev.y + gameConfig.moveSpeed);
        hasMovement = true;
      }
      if (keysPressed.current.has('ArrowLeft')) {
        newX = Math.max(0, prev.x - gameConfig.moveSpeed);
        hasMovement = true;
        setFacingDirection('left');
      }
      if (keysPressed.current.has('ArrowRight')) {
        newX = Math.min(gameConfig.FIXED_CANVAS_WIDTH - gameConfig.hedgehogSize, prev.x + gameConfig.moveSpeed);
        hasMovement = true;
        setFacingDirection('right');
      }

      const newCanvasPosition = { x: newX, y: newY };

      // Update movement state and animation frame
      setIsMoving(hasMovement);
      
      if (hasMovement) {
        frameCounterRef.current++;
        if (frameCounterRef.current % gameConfig.frameUpdateInterval === 0) {
          setCurrentFrame(prev => prev === 0 ? 1 : 0);
        }
      }

      // Update position ref with canvas coordinates
      currentCanvasPositionRef.current = newCanvasPosition;
      return newCanvasPosition;
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
    position: screenPosition, // Screen position for rendering
    canvasPosition, // Canvas position for multiplayer
    currentFrame,
    isMoving,
    facingDirection,
    currentPositionRef: currentCanvasPositionRef, // Canvas coordinates for multiplayer
    updatePosition,
    handleKeyDown,
    handleKeyUp
  };
};
