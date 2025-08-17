import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MultiplayerPlayer } from '../types';
import { Character } from './Character';
import { gameConfig } from '../utils';

interface MultiplayerPlayersProps {
  players: MultiplayerPlayer[];
  showPlayerNames?: boolean;
}

type RenderState = {
  x: number;
  y: number;
  frame: number;
  frameCounter: number;
};

export const MultiplayerPlayers: React.FC<MultiplayerPlayersProps> = ({ 
  players, 
  showPlayerNames = true 
}) => {
  const [renderMap, setRenderMap] = useState<Record<string, RenderState>>({});
  const targetsRef = useRef<Record<string, { x: number; y: number; moving: boolean }>>({});
  const rafRef = useRef<number | null>(null);

  // Initialize and update targets when incoming players change
  useEffect(() => {
    const nextTargets: Record<string, { x: number; y: number; moving: boolean }> = {};
    const nextRender: Record<string, RenderState> = { ...renderMap };

    players.forEach(p => {
      nextTargets[p.playerId] = { x: p.position.x, y: p.position.y, moving: p.isMoving };
      if (!nextRender[p.playerId]) {
        nextRender[p.playerId] = {
          x: p.position.x,
          y: p.position.y,
          frame: 0,
          frameCounter: 0
        };
      }
    });

    // Remove states for players no longer present
    Object.keys(nextRender).forEach(id => {
      if (!players.find(p => p.playerId === id)) {
        delete nextRender[id];
      }
    });

    targetsRef.current = nextTargets;
    setRenderMap(nextRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.map(p => `${p.playerId}:${p.position.x},${p.position.y},${p.isMoving}`).join('|')]);

  // Animation / interpolation loop
  useEffect(() => {
    const animate = () => {
      setRenderMap(prev => {
        const updated: Record<string, RenderState> = { ...prev };
        Object.keys(updated).forEach(id => {
          const target = targetsRef.current[id];
          if (!target) return;
          const state = updated[id];

          // Position smoothing (lerp)
          const alpha = 0.2; // smoothing factor
          state.x = state.x + (target.x - state.x) * alpha;
          state.y = state.y + (target.y - state.y) * alpha;

          // Local animation independent of network
          if (target.moving) {
            state.frameCounter += 1;
            if (state.frameCounter % gameConfig.frameUpdateInterval === 0) {
              state.frame = state.frame === 0 ? 1 : 0;
            }
          } else {
            state.frameCounter = 0;
            state.frame = 0;
          }

          updated[id] = { ...state };
        });
        return updated;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const orderedPlayers = useMemo(() => players, [players]);

  return (
    <>
      {orderedPlayers.map((player) => {
        const r = renderMap[player.playerId] || { x: player.position.x, y: player.position.y, frame: 0, frameCounter: 0 };
        const pos = { x: r.x, y: r.y };
        return (
          <React.Fragment key={player.playerId}>
            <Character
              position={pos}
              currentFrame={r.frame}
              alt={`Player ${player.playerName || player.playerId}`}
              isNPC={false}
              spriteVariant={player.spriteVariant}
            />

            {showPlayerNames && player.playerName && (
              <div
                className="absolute text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                style={{
                  left: `${pos.x + 32}px`,
                  top: `${pos.y - 25}px`,
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              >
                {player.playerName}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
