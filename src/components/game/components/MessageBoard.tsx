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

  // Calculate positions for diary entries in a grid layout
  const getEntryPosition = (index: number) => {
    const entriesPerRow = 3;
    const entryWidth = 200;
    const entryHeight = 150;
    const padding = 20;
    const startX = (mapRect.width - (entriesPerRow * entryWidth + (entriesPerRow - 1) * padding)) / 2;
    const startY = 100;

    const row = Math.floor(index / entriesPerRow);
    const col = index % entriesPerRow;

    return {
      x: startX + col * (entryWidth + padding),
      y: startY + row * (entryHeight + padding)
    };
  };

  // Create button position (top center)
  const createButtonPosition = {
    x: mapRect.width / 2 - 100,
    y: 30
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
          zIndex: 20
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
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-mono text-sm font-bold shadow-lg flex items-center space-x-2"
            title="Create new diary entry (Press X)"
          >
            <span>Create New Entry</span>
            <span className="font-bold">X</span>
          </button>
        </div>
      )}

      {/* Diary entries */}
      {entries.map((entry, index) => (
        <DiaryEntry
          key={entry.id}
          entry={entry}
          onEdit={handleEditEntry}
          canEdit={entry.player_id === currentPlayerId}
          position={getEntryPosition(index)}
        />
      ))}

      {/* No entries message */}
      {entries.length === 0 && !loadingEntries && (
        <div
          className="absolute flex flex-col items-center justify-center bg-amber-50 border-2 border-amber-300 rounded-lg p-6 text-amber-800"
          style={{
            left: `${mapRect.width / 2 - 150}px`,
            top: `${mapRect.height / 2 - 50}px`,
            width: '300px',
            height: '100px',
            zIndex: 10,
            fontFamily: 'serif'
          }}
        >
          <div className="text-lg font-bold mb-2">Welcome to the Message Board!</div>
          <div className="text-sm text-center">No diary entries yet. Be the first to share your thoughts!</div>
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
