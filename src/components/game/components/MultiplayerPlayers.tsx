import React from 'react';
import { MultiplayerPlayer } from '../types';
import { Character } from './Character';

interface MultiplayerPlayersProps {
  players: MultiplayerPlayer[];
  showPlayerNames?: boolean;
}

export const MultiplayerPlayers: React.FC<MultiplayerPlayersProps> = ({ 
  players, 
  showPlayerNames = true 
}) => {
  return (
    <>
      {players.map((player) => (
        <div key={player.playerId} className="relative">
          <Character
            position={player.position}
            currentFrame={player.currentFrame}
            alt={`Player ${player.playerName || player.playerId}`}
            isNPC={false}
            spriteVariant={player.spriteVariant}
          />
          
          {showPlayerNames && player.playerName && (
            <div
              className="absolute text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded pointer-events-none whitespace-nowrap"
              style={{
                left: `${player.position.x + 32}px`, // Center above sprite (sprite is 64px wide)
                top: `${player.position.y - 25}px`, // Above the sprite
                transform: 'translateX(-50%)',
                zIndex: 10,
                fontSize: '10px',
                fontFamily: 'monospace'
              }}
            >
              {player.playerName}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
