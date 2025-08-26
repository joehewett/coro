import React, { useState, useEffect } from 'react';
import { DiaryEntryData } from './DiaryEntry';

interface DiaryEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  editingEntry?: DiaryEntryData | null;
  isLoading?: boolean;
}

export const DiaryEntryModal: React.FC<DiaryEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingEntry,
  isLoading = false
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);

  // Reset form when modal opens/closes or editing entry changes
  useEffect(() => {
    if (isOpen) {
      if (editingEntry) {
        setTitle(editingEntry.title);
        setContent(editingEntry.content);
      } else {
        setTitle('');
        setContent('');
      }
      setPreview(false);
    }
  }, [isOpen, editingEntry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await onSubmit({ title: title.trim(), content: content.trim() });
      onClose();
    } catch (error) {
      console.error('Error submitting diary entry:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Simple markdown renderer for preview
  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {editingEntry ? 'Edit Diary Entry' : 'New Diary Entry'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter diary entry title..."
                maxLength={100}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                disabled={isLoading}
              >
                {preview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {preview ? (
              <div 
                className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md bg-gray-50 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 resize-vertical"
                placeholder="Write your diary entry here... (Supports basic markdown: **bold**, *italic*, `code`)"
                required
                disabled={isLoading}
              />
            )}

            <div className="text-xs text-gray-500">
              <p>Markdown supported: **bold**, *italic*, `code`</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-amber-600 rounded-md hover:bg-amber-700 disabled:opacity-50"
              disabled={isLoading || !title.trim() || !content.trim()}
            >
              {isLoading ? 'Saving...' : editingEntry ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
