import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, X, Trash2 } from 'lucide-react';

export interface SearchHistoryEntry {
  id: string;
  timestamp: string;
  query: string;
  filters: any;
  resultCount: number;
  searchType: 'basic' | 'advanced';
}

interface SearchHistoryProps {
  history: SearchHistoryEntry[];
  onSelectHistory: (entry: SearchHistoryEntry) => void;
  onClearHistory: () => void;
  isVisible: boolean;
  onClose: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelectHistory,
  onClearHistory,
  isVisible,
  onClose,
}) => {
  const formatSearchCriteria = (entry: SearchHistoryEntry) => {
    const criteria = [];
    
    if (entry.query) {
      criteria.push(`Text: "${entry.query}"`);
    }
    
    if (entry.filters) {
      Object.entries(entry.filters).forEach(([key, value]) => {
        if (value && value !== '') {
          if (key === 'dateRange' && typeof value === 'object') {
            const dateRange = value as { from: string; to: string };
            if (dateRange.from || dateRange.to) {
              criteria.push(`Date: ${dateRange.from || 'Any'} to ${dateRange.to || 'Any'}`);
            }
          } else {
            criteria.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
          }
        }
      });
    }
    
    return criteria.length > 0 ? criteria.join(', ') : 'Empty search';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-900">Search History</h3>
              </div>
              <div className="flex items-center space-x-2">
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center space-x-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Clear All</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No search history yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <motion.button
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => onSelectHistory(entry)}
                    className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Search className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          <span className="text-xs font-medium text-primary-600 capitalize">
                            {entry.searchType} Search
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 truncate">
                          {formatSearchCriteria(entry)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {entry.resultCount} results found
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchHistory;