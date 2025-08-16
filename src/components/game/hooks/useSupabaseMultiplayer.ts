import { useState, useEffect, useRef, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';
import { MultiplayerPlayer, MultiplayerState, Position, GameLocation } from '../types';

interface UseSupabaseMultiplayerProps {
  currentLocation: GameLocation;
  playerPosition: Position;
  currentFrame: number;
  isMoving: boolean;
  playerName?: string;
  fixedPlayerId?: 'coro' | 'joe';
  spriteVariant?: number;
}

export const useSupabaseMultiplayer = ({
  currentLocation,
  playerPosition,
  currentFrame,
  isMoving,
  playerName = 'Anonymous',
  fixedPlayerId,
  spriteVariant = 0
}: UseSupabaseMultiplayerProps) => {
  const PLAYER_ID_STORAGE_KEY = 'pixel_player_id';
  const ONLINE_WINDOW_MS = 10000; // Consider players online if updated within last 10s
  const [multiplayerState, setMultiplayerState] = useState<MultiplayerState>({
    isConnected: false,
    isConnecting: true,
    otherPlayers: [],
    currentPlayerId: null,
    error: null
  });

  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const currentPlayerIdRef = useRef<string | null>(null);
  const updateThrottleMs = 100; // Update every 100ms max

  // Define here so it exists before any effects/handlers reference it
  const updatePlayerPosition = useCallback(async (force = false) => {
    if (!currentPlayerIdRef.current || !multiplayerState.isConnected) return;

    const now = Date.now();
    if (!force && now - lastUpdateRef.current < updateThrottleMs) return;

    lastUpdateRef.current = now;

    try {
      const { error } = await supabase
        .from('player_positions')
        .upsert(
          {
            player_id: currentPlayerIdRef.current,
            player_name: playerName,
            x: playerPosition.x,
            y: playerPosition.y,
            current_frame: currentFrame,
            current_location: currentLocation,
            is_moving: isMoving,
            sprite_variant: 0,
            last_update: new Date().toISOString()
          },
          {
            onConflict: 'player_id',
            ignoreDuplicates: false
          }
        );

      if (error) {
        console.error('Error upserting player position:', error);
      }
    } catch (error) {
      console.error('Error upserting player position:', error);
    }
  }, [
    currentLocation,
    playerPosition.x,
    playerPosition.y,
    currentFrame,
    isMoving,
    playerName,
    multiplayerState.isConnected
  ]);

  

  // Generate or load persistent player ID (stable across refreshes) or use fixed
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

  // Initialize Supabase connection
  useEffect(() => {
    if (!currentPlayerIdRef.current) return;

    const initializeConnection = async () => {
      try {
        setMultiplayerState(prev => ({ ...prev, isConnecting: true, error: null }));

        // Create real-time channel
        const channel = supabase
          .channel('player_positions')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'player_positions'
            },
            (payload) => {
              handleRealtimeUpdate(payload);
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              setMultiplayerState(prev => ({ 
                ...prev, 
                isConnected: true, 
                isConnecting: false 
              }));
              
              // Send initial player data
              updatePlayerPosition(true);
            } else if (status === 'CHANNEL_ERROR') {
              setMultiplayerState(prev => ({ 
                ...prev, 
                isConnected: false, 
                isConnecting: false,
                error: 'Failed to connect to multiplayer server'
              }));
            }
          });

        channelRef.current = channel;

        // Load existing players in current location
        await loadExistingPlayers();

      } catch (error) {
        console.error('Failed to initialize multiplayer:', error);
        setMultiplayerState(prev => ({ 
          ...prev, 
          isConnecting: false, 
          error: 'Connection failed' 
        }));
      }
    };

    initializeConnection();

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
      // Remove player from database when disconnecting
      if (currentPlayerIdRef.current) {
        supabase
          .from('player_positions')
          .delete()
          .eq('player_id', currentPlayerIdRef.current)
          .then(() => {
            console.log('Player removed from database');
          });
      }
    };
  }, [currentPlayerIdRef.current]);

  // Heartbeat to keep player marked as online even when idle
  useEffect(() => {
    if (!multiplayerState.isConnected) return;
    const interval = setInterval(() => {
      // Guard against calling before hook initialization is stable
      Promise.resolve().then(() => updatePlayerPosition(true));
    }, Math.max(3000, updateThrottleMs));
    return () => clearInterval(interval);
  }, [multiplayerState.isConnected, updatePlayerPosition]);

  // Periodically prune stale players from local state
  useEffect(() => {
    const interval = setInterval(() => {
      setMultiplayerState(prev => ({
        ...prev,
        otherPlayers: prev.otherPlayers.filter(p => {
          const t = new Date(p.lastUpdate).getTime();
          return Date.now() - t <= ONLINE_WINDOW_MS && p.currentLocation === currentLocation;
        })
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentLocation]);

  // Load existing players in current location
  const loadExistingPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from('player_positions')
        .select('*')
        .eq('current_location', currentLocation)
        .neq('player_id', currentPlayerIdRef.current)
        .gte('last_update', new Date(Date.now() - ONLINE_WINDOW_MS).toISOString());

      if (error) {
        console.error('Error loading existing players:', error);
        return;
      }

      if (data) {
        const players: MultiplayerPlayer[] = data.map(row => ({
          id: row.id,
          playerId: row.player_id,
          playerName: row.player_name,
          position: { x: row.x, y: row.y },
          currentFrame: row.current_frame,
          currentLocation: row.current_location as GameLocation,
          isMoving: row.is_moving,
          spriteVariant: row.sprite_variant,
          lastUpdate: row.last_update
        }));

        const recentPlayers = players.filter(p => {
          const t = new Date(p.lastUpdate).getTime();
          return Date.now() - t <= ONLINE_WINDOW_MS;
        });

        setMultiplayerState(prev => ({ ...prev, otherPlayers: recentPlayers }));
      }
    } catch (error) {
      console.error('Error loading existing players:', error);
    }
  };

  // Handle real-time updates
  const handleRealtimeUpdate = (payload: any) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    // Ignore updates from current player
    if (newRecord?.player_id === currentPlayerIdRef.current || 
        oldRecord?.player_id === currentPlayerIdRef.current) {
      return;
    }

    setMultiplayerState(prev => {
      let updatedPlayers = [...prev.otherPlayers];

      switch (eventType) {
        case 'INSERT':
        case 'UPDATE':
          if (newRecord && newRecord.current_location === currentLocation) {
            const player: MultiplayerPlayer = {
              id: newRecord.id,
              playerId: newRecord.player_id,
              playerName: newRecord.player_name,
              position: { x: newRecord.x, y: newRecord.y },
              currentFrame: newRecord.current_frame,
              currentLocation: newRecord.current_location,
              isMoving: newRecord.is_moving,
              spriteVariant: newRecord.sprite_variant,
              lastUpdate: newRecord.last_update
            };

            // Only keep recent players
            const isRecent = Date.now() - new Date(player.lastUpdate).getTime() <= ONLINE_WINDOW_MS;
            if (isRecent) {
              const existingIndex = updatedPlayers.findIndex(p => p.playerId === player.playerId);
              if (existingIndex >= 0) {
                updatedPlayers[existingIndex] = player;
              } else {
                updatedPlayers.push(player);
              }
            } else {
              updatedPlayers = updatedPlayers.filter(p => p.playerId !== player.playerId);
            }
          } else {
            // Player moved to different location, remove them
            updatedPlayers = updatedPlayers.filter(p => p.playerId !== newRecord?.player_id);
          }
          break;

        case 'DELETE':
          if (oldRecord) {
            updatedPlayers = updatedPlayers.filter(p => p.playerId !== oldRecord.player_id);
          }
          break;
      }

      // Prune stale players
      const pruned = updatedPlayers.filter(p => {
        const t = new Date(p.lastUpdate).getTime();
        return Date.now() - t <= ONLINE_WINDOW_MS;
      });
      return { ...prev, otherPlayers: pruned };
    });
  };

  // Update position when player moves
  useEffect(() => {
    updatePlayerPosition();
  }, [updatePlayerPosition]);

  // Handle location changes
  useEffect(() => {
    if (multiplayerState.isConnected) {
      // Load players in new location
      loadExistingPlayers();
      // Update our location immediately
      updatePlayerPosition(true);
    }
  }, [currentLocation, multiplayerState.isConnected]);

  return {
    ...multiplayerState,
    updatePlayerPosition: () => updatePlayerPosition(true)
  };
};
