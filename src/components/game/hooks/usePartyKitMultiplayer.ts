import { useState, useEffect, useRef, useCallback } from 'react';
import PartySocket from 'partysocket';
import { MultiplayerPlayer, MultiplayerState, Position, GameLocation } from '../types';
import { 
  ClientMessage, 
  ServerMessage, 
  PlayerState, 
  PlayerUpdateMessage,
  LocationChangeMessage,
  HeartbeatMessage 
} from '../../../shared/partykit-types';

interface UsePartyKitMultiplayerProps {
  currentLocation: GameLocation;
  playerPosition: Position;
  currentFrame: number;
  isMoving: boolean;
  playerName?: string;
  fixedPlayerId?: 'coro' | 'joe';
  spriteVariant?: number;
  facingDirection?: 'left' | 'right';
}

export const usePartyKitMultiplayer = ({
  currentLocation,
  playerPosition,
  currentFrame,
  isMoving,
  playerName = 'Anonymous',
  fixedPlayerId,
  spriteVariant = 0,
  facingDirection = 'right'
}: UsePartyKitMultiplayerProps) => {
  const PLAYER_ID_STORAGE_KEY = 'pixel_player_id';
  
  const [multiplayerState, setMultiplayerState] = useState<MultiplayerState>({
    isConnected: false,
    isConnecting: true,
    otherPlayers: [],
    currentPlayerId: null,
    error: null
  });

  const partySocketRef = useRef<PartySocket | null>(null);
  const currentPlayerIdRef = useRef<string | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const heartbeatIntervalRef = useRef<number | null>(null);
  const updateThrottleMs = 100; // Update every 100ms max

  // Generate or load persistent player ID
  useEffect(() => {
    if (!currentPlayerIdRef.current) {
      if (fixedPlayerId) {
        currentPlayerIdRef.current = fixedPlayerId;
      } else {
        try {
          const existingId = typeof window !== 'undefined' ? localStorage.getItem(PLAYER_ID_STORAGE_KEY) : null;
          if (existingId) {
            currentPlayerIdRef.current = existingId;
          } else {
            const newId = `player_${Math.random().toString(36).slice(2)}_${Date.now()}`;
            currentPlayerIdRef.current = newId;
            if (typeof window !== 'undefined') {
              localStorage.setItem(PLAYER_ID_STORAGE_KEY, newId);
            }
          }
        } catch {
          // Fallback if localStorage not available
          currentPlayerIdRef.current = `player_${Math.random().toString(36).slice(2)}_${Date.now()}`;
        }
      }
      setMultiplayerState(prev => ({ ...prev, currentPlayerId: currentPlayerIdRef.current }));
    }
  }, [fixedPlayerId]);

  // Convert PartyKit PlayerState to local MultiplayerPlayer format
  const convertToMultiplayerPlayer = (playerState: PlayerState): MultiplayerPlayer => ({
    id: playerState.playerId, // Use playerId as id for compatibility
    playerId: playerState.playerId,
    playerName: playerState.playerName,
    position: playerState.position,
    currentFrame: playerState.currentFrame,
    currentLocation: playerState.currentLocation,
    isMoving: playerState.isMoving,
    spriteVariant: playerState.spriteVariant,
    facingDirection: playerState.facingDirection,
    lastUpdate: new Date(playerState.lastUpdate).toISOString()
  });

  // Send player update to server
  const updatePlayerPosition = useCallback(async (force = false) => {
    if (!currentPlayerIdRef.current || !partySocketRef.current || !multiplayerState.isConnected) return;

    const now = Date.now();
    if (!force && now - lastUpdateRef.current < updateThrottleMs) return;

    lastUpdateRef.current = now;

    const message: PlayerUpdateMessage = {
      type: 'player_update',
      playerId: currentPlayerIdRef.current,
      playerName: playerName,
      position: playerPosition,
      currentFrame: currentFrame,
      currentLocation: currentLocation,
      isMoving: isMoving,
      spriteVariant: spriteVariant,
      facingDirection: facingDirection
    };

    try {
      partySocketRef.current.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error sending player update:', error);
    }
  }, [
    currentLocation,
    playerPosition.x,
    playerPosition.y,
    currentFrame,
    isMoving,
    playerName,
    spriteVariant,
    facingDirection,
    multiplayerState.isConnected
  ]);

  // Handle incoming server messages
  const handleServerMessage = useCallback((event: MessageEvent) => {
    try {
      const message: ServerMessage = JSON.parse(event.data);
      
      switch (message.type) {
        case 'player_list':
          // Initial player list when joining
          const players = message.players
            .filter((p: PlayerState) => p.playerId !== currentPlayerIdRef.current)
            .map(convertToMultiplayerPlayer);
          setMultiplayerState(prev => ({ ...prev, otherPlayers: players }));
          break;

        case 'player_joined':
          // New player joined
          if (message.player.playerId !== currentPlayerIdRef.current) {
            const newPlayer = convertToMultiplayerPlayer(message.player);
            setMultiplayerState(prev => ({
              ...prev,
              otherPlayers: [...prev.otherPlayers.filter(p => p.playerId !== newPlayer.playerId), newPlayer]
            }));
          }
          break;

        case 'player_updated':
          // Player position/state updated
          if (message.player.playerId !== currentPlayerIdRef.current) {
            const updatedPlayer = convertToMultiplayerPlayer(message.player);
            setMultiplayerState(prev => ({
              ...prev,
              otherPlayers: prev.otherPlayers.map(p => 
                p.playerId === updatedPlayer.playerId ? updatedPlayer : p
              )
            }));
          }
          break;

        case 'player_left':
          // Player disconnected
          setMultiplayerState(prev => ({
            ...prev,
            otherPlayers: prev.otherPlayers.filter(p => p.playerId !== message.playerId)
          }));
          break;

        case 'error':
          console.error('Server error:', message.message);
          setMultiplayerState(prev => ({ ...prev, error: message.message }));
          break;

        default:
          console.warn('Unknown server message type:', message);
      }
    } catch (error) {
      console.error('Error parsing server message:', error);
    }
  }, []);

  // Initialize PartySocket connection for current location
  useEffect(() => {
    if (!currentPlayerIdRef.current) return;

    setMultiplayerState(prev => ({ ...prev, isConnecting: true, error: null }));

    // Create room name based on location
    const roomName = `location-${currentLocation}`;
    
    // Create PartySocket connection
    const partySocket = new PartySocket({
      host: 'localhost:1999',
      room: roomName,
      id: currentPlayerIdRef.current
    });

    partySocket.addEventListener('open', () => {
      console.log(`✅ Connected to PartyKit room: ${roomName}`);
      setMultiplayerState(prev => ({ 
        ...prev, 
        isConnected: true, 
        isConnecting: false,
        error: null
      }));
      
      // Send initial player state
      updatePlayerPosition(true);
    });

    partySocket.addEventListener('message', handleServerMessage);

    partySocket.addEventListener('close', (event) => {
      console.log('❌ PartySocket connection closed:', event.code, event.reason);
      setMultiplayerState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isConnecting: false
      }));
    });

    partySocket.addEventListener('error', (error) => {
      console.error('🚨 PartySocket error:', error);
      setMultiplayerState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isConnecting: false,
        error: 'Connection failed'
      }));
    });

    // Add connection state logging
    console.log(`🔄 Attempting to connect to PartyKit at localhost:1999, room: ${roomName}`);

    partySocketRef.current = partySocket;

    // Set up heartbeat to keep connection alive
    heartbeatIntervalRef.current = setInterval(() => {
      if (partySocket.readyState === PartySocket.OPEN && currentPlayerIdRef.current) {
        const heartbeat: HeartbeatMessage = {
          type: 'heartbeat',
          playerId: currentPlayerIdRef.current
        };
        partySocket.send(JSON.stringify(heartbeat));
      }
    }, 30000) as any; // Send heartbeat every 30 seconds

    // Cleanup on unmount or location change
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      
      if (partySocket) {
        // Send location change message if we're switching locations
        if (partySocket.readyState === PartySocket.OPEN && currentPlayerIdRef.current) {
          const locationChange: LocationChangeMessage = {
            type: 'location_change',
            playerId: currentPlayerIdRef.current,
            newLocation: currentLocation
          };
          partySocket.send(JSON.stringify(locationChange));
        }
        
        partySocket.close();
      }
      
      // Clear other players when leaving
      setMultiplayerState(prev => ({ ...prev, otherPlayers: [] }));
    };
  }, [currentLocation, currentPlayerIdRef.current, handleServerMessage]);

  // Update position when player moves
  useEffect(() => {
    updatePlayerPosition();
  }, [updatePlayerPosition]);

  return {
    ...multiplayerState,
    updatePlayerPosition: () => updatePlayerPosition(true)
  };
};
