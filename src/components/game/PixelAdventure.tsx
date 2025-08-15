import React, { useState, useEffect, useRef } from 'react';

const PixelAdventure: React.FC = () => {
  // Village map dimensions and boundaries
  const villageWidth = 800;
  const villageHeight = 600;
  const hedgehogSize = 32;
  
  // Calculate village position to center it on screen
  const villageX = (window.innerWidth - villageWidth) / 2;
  const villageY = (window.innerHeight - villageHeight) / 2;
  
  // Start hedgehog in the center of the village
  const [position, setPosition] = useState({ 
    x: villageX + villageWidth / 2 - hedgehogSize / 2, 
    y: villageY + villageHeight / 2 - hedgehogSize / 2 
  });
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationRef = useRef<number>();
  const frameCounterRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        keysPressed.current.add(event.key);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.key);
    };

    const updatePosition = () => {
      const moveSpeed = 3; // Reduced for smoother movement
      
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let hasMovement = false;

        if (keysPressed.current.has('ArrowUp')) {
          newY = Math.max(villageY, prev.y - moveSpeed);
          hasMovement = true;
        }
        if (keysPressed.current.has('ArrowDown')) {
          newY = Math.min(villageY + villageHeight - hedgehogSize, prev.y + moveSpeed);
          hasMovement = true;
        }
        if (keysPressed.current.has('ArrowLeft')) {
          newX = Math.max(villageX, prev.x - moveSpeed);
          hasMovement = true;
        }
        if (keysPressed.current.has('ArrowRight')) {
          newX = Math.min(villageX + villageWidth - hedgehogSize, prev.x + moveSpeed);
          hasMovement = true;
        }

        // Update movement state and animation frame
        setIsMoving(hasMovement);
        
        if (hasMovement) {
          frameCounterRef.current++;
          // Switch frame every 10 animation frames (about 6 times per second)
          if (frameCounterRef.current % 10 === 0) {
            setCurrentFrame(prev => prev === 0 ? 1 : 0);
          }
        }

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    animationRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        backgroundColor: '#041704',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      tabIndex={0}
    >
      {/* Village background map */}
      <img
        src="/game/village.webp"
        alt="Village Map"
        style={{
          position: 'absolute',
          left: `${villageX}px`,
          top: `${villageY}px`,
          width: `${villageWidth}px`,
          height: `${villageHeight}px`,
          imageRendering: 'pixelated',
          zIndex: 1
        }}
      />
      
      {/* Hedgehog character */}
      <img
        src={`/game/hedgehog${currentFrame === 0 ? '' : '2'}.png`}
        alt="Hedgehog"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '32px',
          height: '32px',
          imageRendering: 'pixelated',
          transition: 'none',
          zIndex: 2
        }}
      />
    </div>
  );
};

export default PixelAdventure;
