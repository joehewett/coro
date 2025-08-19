import React from 'react';
import { InteractionZone } from '../types';

interface InteractionZonesProps {
  zones: InteractionZone[];
  showDebug?: boolean;
  playerPosition?: { x: number; y: number };
  proximityRadius?: number;
}

export const InteractionZones: React.FC<InteractionZonesProps> = ({ 
  zones, 
  showDebug = false, 
  playerPosition,
  proximityRadius = 32
}) => {
  if (!showDebug) return null;

  const isPlayerNearZone = (zone: InteractionZone) => {
    if (!playerPosition) return false;
    const zoneX = zone.x ?? 0;
    const zoneY = zone.y ?? 0;
    const zoneWidth = zone.width ?? 0;
    const zoneHeight = zone.height ?? 0;
    
    const px = playerPosition.x + 32; // Character center
    const py = playerPosition.y + 32; // Character center
    
    return (
      px >= zoneX - proximityRadius &&
      px <= zoneX + zoneWidth + proximityRadius &&
      py >= zoneY - proximityRadius &&
      py <= zoneY + zoneHeight + proximityRadius
    );
  };

  return (
    <>
      {zones.map((zone) => {
        const isNear = isPlayerNearZone(zone);
        return (
          <div key={zone.id}>
            {/* Main interaction zone */}
            <div
              className={`absolute border-2 pointer-events-none ${
                isNear 
                  ? 'border-green-400 bg-green-400 bg-opacity-30' 
                  : 'border-yellow-400 bg-yellow-400 bg-opacity-10'
              }`}
              style={{
                left: `${zone.x}px`,
                top: `${zone.y}px`,
                width: `${zone.width}px`,
                height: `${zone.height}px`,
                zIndex: 10
              }}
            >
              <div className={`text-xs font-bold p-1 ${
                isNear ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {zone.name}
              </div>
            </div>
            
            {/* Proximity detection area */}
            <div
              className="absolute border border-dashed border-blue-300 bg-transparent pointer-events-none"
              style={{
                left: `${(zone.x ?? 0) - proximityRadius}px`,
                top: `${(zone.y ?? 0) - proximityRadius}px`,
                width: `${(zone.width ?? 0) + 2 * proximityRadius}px`,
                height: `${(zone.height ?? 0) + 2 * proximityRadius}px`,
                zIndex: 9
              }}
            />
            
            {/* Zone center point */}
            <div
              className="absolute bg-purple-500 pointer-events-none"
              style={{
                left: `${(zone.x ?? 0) + (zone.width ?? 0) / 2 - 2}px`,
                top: `${(zone.y ?? 0) + (zone.height ?? 0) / 2 - 2}px`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                zIndex: 11
              }}
            />
            
            {/* Zone coordinates */}
            <div
              className="absolute text-xs font-mono text-purple-600 bg-white bg-opacity-80 px-1 pointer-events-none"
              style={{
                left: `${zone.x}px`,
                top: `${(zone.y ?? 0) + (zone.height ?? 0) + 5}px`,
                zIndex: 12
              }}
            >
              x:{Math.round(zone.x ?? 0)} y:{Math.round(zone.y ?? 0)} w:{Math.round(zone.width ?? 0)} h:{Math.round(zone.height ?? 0)}
            </div>
            
            {/* Relative coordinates */}
            <div
              className="absolute text-xs font-mono text-blue-600 bg-white bg-opacity-80 px-1 pointer-events-none"
              style={{
                left: `${zone.x}px`,
                top: `${(zone.y ?? 0) + (zone.height ?? 0) + 20}px`,
                zIndex: 12
              }}
            >
              rel: {zone.relativeX?.toFixed(2)}, {zone.relativeY?.toFixed(2)}
            </div>
          </div>
        );
      })}
    </>
  );
};
