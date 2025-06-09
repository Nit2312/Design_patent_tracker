import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Bookmark } from 'lucide-react';
import { Patent, useData } from '../contexts/DataContext';

interface AddToWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  patent: Patent;
}

const AddToWatchlistModal: React.FC<AddToWatchlistModalProps> = ({
  isOpen,
  onClose,
  patent,
}) => {
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [newWatchlistDescription, setNewWatchlistDescription] = useState('');
  const { watchlists, addToWatchlist, createWatchlist } = useData();

  const handleAddToExisting = (watchlistId: string) => {
    addToWatchlist(watchlistId, patent);
    onClose();
  };

  const handleCreateNew = async () => {
    if (newWatchlistName.trim()) {
      const newWatchlist = await createWatchlist(newWatchlistName, newWatchlistDescription);
      addToWatchlist(newWatchlist.id, patent);
      setNewWatchlistName('');
      setNewWatchlistDescription('');
      setShowCreateNew(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Add to Watchlist
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{patent.title}</p>
              <p className="text-xs text-gray-600 mt-1">{patent.applicant}</p>
            </div>

            {!showCreateNew ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  {watchlists.map((watchlist) => {
                    const isAlreadyAdded = watchlist.patents.some(p => p.id === patent.id);
                    return (
                      <button
                        key={watchlist.id}
                        onClick={() => !isAlreadyAdded && handleAddToExisting(watchlist.id)}
                        disabled={isAlreadyAdded}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isAlreadyAdded
                            ? 'border-green-200 bg-green-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{watchlist.name}</p>
                            <p className="text-sm text-gray-600">{watchlist.patents.length} patents</p>
                          </div>
                          {isAlreadyAdded && (
                            <Bookmark className="h-5 w-5 text-green-600 fill-current" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowCreateNew(true)}
                  className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create New Watchlist</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Watchlist Name
                  </label>
                  <input
                    type="text"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    placeholder="Enter watchlist name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newWatchlistDescription}
                    onChange={(e) => setNewWatchlistDescription(e.target.value)}
                    placeholder="Brief description of this watchlist"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateNew(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateNew}
                    disabled={!newWatchlistName.trim()}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create & Add
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddToWatchlistModal;