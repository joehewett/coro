import { useState, useEffect, useRef } from 'react';
import { Position, MapRect } from '../types';
import { gameConfig, getDefaultNPCPosition, constrainPosition, getRandomDirection, shouldNPCStop, isWithinProximity } from '../utils';

export const useNPCBehavior = (mapRect: MapRect, playerPosition: Position) => {
  const [npcPosition, setNpcPosition] = useState<Position>({ x: 0, y: 0 });
  const [npcFrame, setNpcFrame] = useState(0);
  const [npcIsMoving, setNpcIsMoving] = useState(false);
  
  const npcDirectionRef = useRef<Position>({ x: 0, y: 0 });
  const npcMoveTimerRef = useRef(0);
  const npcFrameCounterRef = useRef(0);
  const currentNpcPositionRef = useRef<Position>({ x: 0, y: 0 });

  // Place NPC when map rectangle is known
  useEffect(() => {
    if (mapRect.width > 0 && mapRect.height > 0) {
      const defaultPosition = getDefaultNPCPosition(mapRect);
      setNpcPosition(defaultPosition);
      currentNpcPositionRef.current = defaultPosition;
    }
  }, [mapRect]);

  const updateNPCPosition = () => {
    if (mapRect.width === 0 || mapRect.height === 0) {
      return;
    }

    setNpcPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let hasNpcMovement = false;

      npcMoveTimerRef.current++;

      // Check if player is nearby before moving
      const isPlayerNearby = isWithinProximity(playerPosition, prev);

      // Change direction every interval, but only if player is not nearby
      if (!isPlayerNearby && npcMoveTimerRef.current % gameConfig.npcDirectionChangeInterval === 0) {
        if (shouldNPCStop()) {
          npcDirectionRef.current = { x: 0, y: 0 };
        } else {
          npcDirectionRef.current = getRandomDirection();
        }
      }

      // Move NPC based on current direction, but stop if player is nearby
      if (!isPlayerNearby && (npcDirectionRef.current.x !== 0 || npcDirectionRef.current.y !== 0)) {
        newX = prev.x + npcDirectionRef.current.x * gameConfig.npcSpeed;
        newY = prev.y + npcDirectionRef.current.y * gameConfig.npcSpeed;
        hasNpcMovement = true;
      }

      // Constrain to map boundaries
      const constrainedPosition = constrainPosition({ x: newX, y: newY }, mapRect, gameConfig.hedgehogSize);

      // Update NPC animation
      setNpcIsMoving(hasNpcMovement);
      
      if (hasNpcMovement) {
        npcFrameCounterRef.current++;
        if (npcFrameCounterRef.current % gameConfig.npcFrameUpdateInterval === 0) {
          setNpcFrame(prev => prev === 0 ? 1 : 0);
        }
      }

      // Update NPC position ref
      currentNpcPositionRef.current = constrainedPosition;
      return constrainedPosition;
    });
  };

  return {
    npcPosition,
    npcFrame,
    npcIsMoving,
    currentNpcPositionRef,
    updateNPCPosition
  };
};
