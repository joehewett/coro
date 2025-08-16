import React from 'react';
import { InteractionZone } from '../types';

interface InteractionZonesProps {
  zones: InteractionZone[];
  showDebug?: boolean;
}

export const InteractionZones: React.FC<InteractionZonesProps> = ({ zones, showDebug = false }) => {
  if (!showDebug) return null;

  return (
    <>
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute border border-yellow-400 bg-transparent pointer-events-none"
          style={{
            left: `${zone.x}px`,
            top: `${zone.y}px`,
            width: `${zone.width}px`,
            height: `${zone.height}px`,
            zIndex: 10
          }}
        >
          <div className="text-xs text-yellow-800 font-bold p-1">
            {zone.name}
          </div>
        </div>
      ))}
    </>
  );
};
