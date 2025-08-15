import React, { useState, useEffect, useRef } from 'react';

const PixelAdventure: React.FC = () => {
  // Village map dimensions and boundaries - fill screen vertically
  const villageHeight = window.innerHeight;
  const villageWidth = villageHeight * (4/3); // Maintain 4:3 aspect ratio
  const hedgehogSize = 48;
  
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

  // NPC hedgehog state
  const [npcPosition, setNpcPosition] = useState({
    x: villageX + villageWidth * 0.3,
    y: villageY + villageHeight * 0.3
  });
  const [npcFrame, setNpcFrame] = useState(0);
  const [npcIsMoving, setNpcIsMoving] = useState(false);
  const npcDirectionRef = useRef({ x: 0, y: 0 });
  const npcMoveTimerRef = useRef(0);
  const npcFrameCounterRef = useRef(0);
  const [showGreeting, setShowGreeting] = useState(false);
  
  // Refs to track current positions for proximity detection
  const currentPlayerPosRef = useRef({ 
    x: villageX + villageWidth / 2 - hedgehogSize / 2, 
    y: villageY + villageHeight / 2 - hedgehogSize / 2 
  });
  const currentNpcPosRef = useRef({
    x: villageX + villageWidth * 0.3,
    y: villageY + villageHeight * 0.3
  });
  
  // Location and interaction state
  const [currentLocation, setCurrentLocation] = useState(1); // 1 = village, 2 = library
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        keysPressed.current.add(event.key);
      }
      
      console.log('showGreeting', showGreeting);
      console.log('isLoading', isLoading);
      console.log('event.key', event.key);
      // Handle interaction with NPC
      if (event.key.toLowerCase() === 'x' && currentLocation === 1 && !isLoading) {
        // Check proximity directly in the key handler
        const distance = Math.sqrt(
          Math.pow(currentPlayerPosRef.current.x - currentNpcPosRef.current.x, 2) + 
          Math.pow(currentPlayerPosRef.current.y - currentNpcPosRef.current.y, 2)
        );
        
        console.log('Key pressed - Distance:', distance, 'Close enough:', distance < 80);
        
        if (distance < 80) {
          console.log('Interaction with NPC');
          event.preventDefault();
          setIsLoading(true);
          
          // Show loading screen for 2 seconds, then transition to library
          setTimeout(() => {
            setCurrentLocation(2);
            setIsLoading(false);
            // Reset player position for new location
            setPosition({ 
              x: villageX + villageWidth / 2 - hedgehogSize / 2, 
              y: villageY + villageHeight / 2 - hedgehogSize / 2 
            });
          }, 2000);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.key);
    };

    const updatePosition = () => {
      const moveSpeed = 3; // Reduced for smoother movement
      
      // Update player position
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

        // Update position ref
        currentPlayerPosRef.current = { x: newX, y: newY };
        return { x: newX, y: newY };
      });

      // Update NPC position and behavior
      let currentPlayerPosition = currentPlayerPosRef.current;

      setNpcPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let hasNpcMovement = false;

        npcMoveTimerRef.current++;

        // Check if player is nearby before moving
        const distanceToPlayer = Math.sqrt(
          Math.pow(currentPlayerPosition.x - prev.x, 2) + Math.pow(currentPlayerPosition.y - prev.y, 2)
        );
        const isPlayerNearby = distanceToPlayer < 80;

        // Change direction every 120 frames (about 2 seconds), but only if player is not nearby
        if (!isPlayerNearby && npcMoveTimerRef.current % 120 === 0) {
          // 30% chance to stop, 70% chance to move in a random direction
          if (Math.random() < 0.3) {
            npcDirectionRef.current = { x: 0, y: 0 };
          } else {
            const directions = [
              { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
              { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 1 }
            ];
            npcDirectionRef.current = directions[Math.floor(Math.random() * directions.length)];
          }
        }

        // Move NPC based on current direction, but stop if player is nearby
        if (!isPlayerNearby && (npcDirectionRef.current.x !== 0 || npcDirectionRef.current.y !== 0)) {
          const npcSpeed = 1.5;
          newX = Math.max(villageX, Math.min(villageX + villageWidth - hedgehogSize, 
            prev.x + npcDirectionRef.current.x * npcSpeed));
          newY = Math.max(villageY, Math.min(villageY + villageHeight - hedgehogSize, 
            prev.y + npcDirectionRef.current.y * npcSpeed));
          hasNpcMovement = true;
        }

        // Update NPC animation
        setNpcIsMoving(hasNpcMovement);
        
        if (hasNpcMovement) {
          npcFrameCounterRef.current++;
          if (npcFrameCounterRef.current % 15 === 0) {
            setNpcFrame(prev => prev === 0 ? 1 : 0);
          }
        }

        // Update NPC position ref
        currentNpcPosRef.current = { x: newX, y: newY };
        return { x: newX, y: newY };
      });

      // Check proximity for greeting - only in village
      if (currentLocation === 1) {
        const distance = Math.sqrt(
          Math.pow(currentPlayerPosRef.current.x - currentNpcPosRef.current.x, 2) + 
          Math.pow(currentPlayerPosRef.current.y - currentNpcPosRef.current.y, 2)
        );
        
        const shouldShowGreeting = distance < 80;
        console.log('Distance:', distance, 'Should show greeting:', shouldShowGreeting, 'Player:', currentPlayerPosRef.current, 'NPC:', currentNpcPosRef.current);
        setShowGreeting(shouldShowGreeting);
      } else {
        setShowGreeting(false);
      }

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
      {/* Background map */}
      <img
        src={currentLocation === 1 ? "/game/village.webp" : "/game/library.webp"}
        alt={currentLocation === 1 ? "Village Map" : "Library Map"}
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
      
      {/* Player hedgehog character */}
      <img
        src={`/game/hedgehog${currentFrame === 0 ? '' : '2'}.png`}
        alt="Player Hedgehog"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '48px',
          height: '48px',
          imageRendering: 'pixelated',
          transition: 'none',
          zIndex: 2
        }}
      />

      {/* NPC hedgehog character - only show in village */}
      {currentLocation === 1 && (
        <img
          src={`/game/hedgehog${npcFrame === 0 ? '' : '2'}.png`}
          alt="NPC Hedgehog"
          style={{
            position: 'absolute',
            left: `${npcPosition.x}px`,
            top: `${npcPosition.y}px`,
            width: '48px',
            height: '48px',
            imageRendering: 'pixelated',
            transition: 'none',
            zIndex: 2,
            filter: 'hue-rotate(120deg)' // Make NPC hedgehog a different color
          }}
        />
      )}

      {/* Interaction prompt - only show in village */}
      {showGreeting && currentLocation === 1 && (
        <div
          style={{
            position: 'absolute',
            left: `${npcPosition.x + hedgehogSize / 2 - 15}px`,
            top: `${npcPosition.y - 40}px`,
            width: '30px',
            height: '25px',
            backgroundColor: '#000',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            zIndex: 3,
            boxShadow: '2px 2px 0px #666'
          }}
        >
          X
          {/* Speech bubble tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '8px solid #000'
            }}
          />
        </div>
      )}

      {/* Loading screen */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: '24px',
              fontFamily: 'monospace',
              marginBottom: '20px'
            }}
          >
            Loading...
          </div>
          <div
            style={{
              width: '200px',
              height: '20px',
              border: '2px solid #fff',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#333'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0f0',
                animation: 'loading 2s ease-in-out'
              }}
            />
          </div>
          <style>
            {`
              @keyframes loading {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
};

export default PixelAdventure;
