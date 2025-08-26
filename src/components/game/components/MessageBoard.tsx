import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DiaryEntry, DiaryEntryData } from './DiaryEntry';
import { DiaryEntryModal } from './DiaryEntryModal';
import { MapRect } from '../types';

interface MessageBoardProps {
  currentPlayerId: string | null;
  currentPlayerName: string | null;
  mapRect: MapRect;
  showCreateButton: boolean;
  onCreateClick?: () => void;
  triggerCreateModal?: boolean;
  onModalTriggered?: () => void;
}

export const MessageBoard: React.FC<MessageBoardProps> = ({
  currentPlayerId,
  currentPlayerName,
  mapRect,
  showCreateButton,
  onCreateClick,
  triggerCreateModal,
  onModalTriggered
}) => {
  const [entries, setEntries] = useState<DiaryEntryData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(true);

  // Load diary entries on component mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Handle direct modal trigger from parent
  useEffect(() => {
    if (triggerCreateModal) {
      setEditingEntry(null);
      setIsModalOpen(true);
      onModalTriggered?.();
    }
  }, [triggerCreateModal, onModalTriggered]);

  const loadEntries = async () => {
    try {
      setLoadingEntries(true);
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading diary entries:', error);
        return;
      }

      setEntries(data || []);
    } catch (error) {
      console.error('Error loading diary entries:', error);
    } finally {
      setLoadingEntries(false);
    }
  };

  const handleCreateEntry = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
    onCreateClick?.();
  };

  const handleEditEntry = (entry: DiaryEntryData) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleSubmitEntry = async (data: { title: string; content: string }) => {
    if (!currentPlayerId) return;

    try {
      setIsLoading(true);

      if (editingEntry) {
        // Update existing entry
        const { error } = await supabase
          .from('diary_entries')
          .update({
            title: data.title,
            content: data.content,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingEntry.id)
          .eq('player_id', currentPlayerId); // Ensure user can only edit their own entries

        if (error) {
          console.error('Error updating diary entry:', error);
          return;
        }
      } else {
        // Create new entry
        const { error } = await supabase
          .from('diary_entries')
          .insert({
            player_id: currentPlayerId,
            player_name: currentPlayerName,
            title: data.title,
            content: data.content
          });

        if (error) {
          console.error('Error creating diary entry:', error);
          return;
        }
      }

      // Reload entries to get updated data
      await loadEntries();
    } catch (error) {
      console.error('Error submitting diary entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate responsive grid layout
  const calculateGridLayout = () => {
    const totalEntries = entries.length;
    const containerPadding = 60;
    const availableWidth = mapRect.width - (2 * containerPadding);
    const availableHeight = mapRect.height - 180; // Reserve space for header and create button
    
    // Determine optimal columns based on screen size and entry count
    let cols: number;
    let cardWidth: number;
    let cardHeight: number;
    
    if (availableWidth > 1200) {
      cols = Math.min(4, Math.ceil(Math.sqrt(totalEntries * 1.2)));
      cardWidth = 280;
      cardHeight = 200;
    } else if (availableWidth > 800) {
      cols = Math.min(3, Math.ceil(Math.sqrt(totalEntries)));
      cardWidth = 260;
      cardHeight = 180;
    } else {
      cols = Math.min(2, Math.ceil(Math.sqrt(totalEntries)));
      cardWidth = 240;
      cardHeight = 160;
    }
    
    const gap = 24;
    const actualCardWidth = Math.min(cardWidth, (availableWidth - (cols - 1) * gap) / cols);
    
    return { cols, cardWidth: actualCardWidth, cardHeight, gap };
  };

  const getEntryPosition = (index: number) => {
    const { cols, cardWidth, cardHeight, gap } = calculateGridLayout();
    const containerPadding = 60;
    
    const totalGridWidth = cols * cardWidth + (cols - 1) * gap;
    const startX = containerPadding + (mapRect.width - 2 * containerPadding - totalGridWidth) / 2;
    const startY = 120; // Space for header and create button
    
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      x: startX + col * (cardWidth + gap),
      y: startY + row * (cardHeight + gap),
      width: cardWidth,
      height: cardHeight
    };
  };

  // Create button position (top center)
  const createButtonPosition = {
    x: mapRect.width / 2 - 120,
    y: 40
  };

  if (loadingEntries) {
    return (
      <div
        className="absolute flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-mono"
        style={{
          left: `${mapRect.width / 2 - 100}px`,
          top: `${mapRect.height / 2 - 25}px`,
          width: '200px',
          height: '50px',
          zIndex: 1
        }}
      >
        Loading entries...
      </div>
    );
  }

  return (
    <>
      {/* Create button */}
      {showCreateButton && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: `${createButtonPosition.x}px`,
            top: `${createButtonPosition.y}px`,
            zIndex: 15
          }}
        >
          <button
            onClick={handleCreateEntry}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-serif text-base font-semibold shadow-xl border-2 border-emerald-500 hover:border-emerald-400 transition-all duration-200 transform hover:scale-105 flex items-center space-x-3"
            title="Create new diary entry (Press X)"
          >
            <span>✍️ Create New Entry</span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-md font-mono text-sm font-bold">X</span>
          </button>
        </div>
      )}

      {/* Diary entries */}
      {entries.map((entry, index) => {
        const position = getEntryPosition(index);
        return (
          <DiaryEntry
            key={entry.id}
            entry={entry}
            onEdit={handleEditEntry}
            canEdit={entry.player_id === currentPlayerId}
            position={position}
            size={{ width: position.width, height: position.height }}
          />
        );
      })}

      {/* No entries message */}
      {entries.length === 0 && !loadingEntries && (
        <div
          className="absolute flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-2xl p-8 text-amber-900 shadow-2xl"
          style={{
            left: `${mapRect.width / 2 - 200}px`,
            top: `${mapRect.height / 2 - 80}px`,
            width: '400px',
            height: '160px',
            zIndex: 1,
            fontFamily: 'serif'
          }}
        >
          <div className="text-2xl font-bold mb-3 text-amber-800">📖 Welcome to the Message Board!</div>
          <div className="text-base text-center leading-relaxed text-amber-700">
            No diary entries yet. Be the first to share your thoughts and experiences!
          </div>
          <div className="mt-3 text-sm text-amber-600 italic">Press X near the board to create an entry</div>
        </div>
      )}

      {/* Modal for creating/editing entries */}
      <DiaryEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitEntry}
        editingEntry={editingEntry}
        isLoading={isLoading}
      />
    </>
  );
};
