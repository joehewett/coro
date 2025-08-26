import React from 'react';

export interface DiaryEntryData {
  id: string;
  player_id: string;
  player_name: string | null;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface DiaryEntryProps {
  entry: DiaryEntryData;
  onEdit: (entry: DiaryEntryData) => void;
  canEdit: boolean; // Whether current player can edit this entry
  position: { x: number; y: number };
}

export const DiaryEntry: React.FC<DiaryEntryProps> = ({ 
  entry, 
  onEdit, 
  canEdit, 
  position 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div
      className="absolute bg-amber-50 border-2 border-amber-800 rounded-lg p-3 shadow-lg max-w-xs"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 10,
        fontFamily: 'serif'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-amber-900 font-bold text-sm truncate flex-1 mr-2">
          {entry.title}
        </h3>
        {canEdit && (
          <button
            onClick={() => onEdit(entry)}
            className="bg-amber-700 hover:bg-amber-800 text-white text-xs px-2 py-1 rounded font-mono"
            title="Edit entry (Press X)"
          >
            X
          </button>
        )}
      </div>
      
      <div className="text-amber-800 text-xs mb-2 leading-relaxed">
        {truncateContent(entry.content)}
      </div>
      
      <div className="flex justify-between items-center text-xs text-amber-600">
        <span>{entry.player_name || 'Anonymous'}</span>
        <span>{formatDate(entry.created_at)}</span>
      </div>
    </div>
  );
};
