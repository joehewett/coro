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
  size?: { width: number; height: number };
}

export const DiaryEntry: React.FC<DiaryEntryProps> = ({ 
  entry, 
  onEdit, 
  canEdit, 
  position,
  size = { width: 240, height: 160 }
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getPlayerInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div
      className="absolute bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer group overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 1,
        fontFamily: 'serif'
      }}
    >
      {/* Decorative top border */}
      <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"></div>
      
      {/* Card content */}
      <div className="p-4 h-full flex flex-col relative">
        {/* Header with title and edit button */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-amber-900 font-bold text-base leading-tight flex-1 mr-2 group-hover:text-amber-800 transition-colors">
            {entry.title}
          </h3>
          {canEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(entry);
              }}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs px-3 py-1.5 rounded-lg font-mono font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
              title="Edit entry (Press X)"
            >
              ✏️
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className="text-amber-800 text-sm mb-4 leading-relaxed flex-1 overflow-hidden">
          <p className="line-clamp-4">{truncateContent(entry.content)}</p>
        </div>
        
        {/* Footer with author and date */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
              {getPlayerInitials(entry.player_name)}
            </div>
            <span className="text-amber-700 text-sm font-medium">
              {entry.player_name || 'Anonymous'}
            </span>
          </div>
          <div className="text-amber-600 text-xs bg-amber-100 px-2 py-1 rounded-full">
            {formatDate(entry.created_at)}
          </div>
        </div>
        
        {/* Subtle decorative corner */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-200 to-transparent opacity-30 rounded-bl-full"></div>
      </div>
    </div>
  );
};
