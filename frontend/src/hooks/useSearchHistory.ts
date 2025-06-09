import { useState, useEffect } from 'react';
import { SearchHistoryEntry } from '../components/SearchHistory';

const STORAGE_KEY = 'designpattrack_search_history';
const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedHistory = JSON.parse(stored);
        setHistory(parsedHistory);
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [history]);

  const addToHistory = (entry: Omit<SearchHistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: SearchHistoryEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    setHistory(prev => {
      // Remove any existing entry with the same search criteria to avoid duplicates
      const filtered = prev.filter(item => {
        const sameQuery = item.query === newEntry.query;
        const sameFilters = JSON.stringify(item.filters) === JSON.stringify(newEntry.filters);
        const sameType = item.searchType === newEntry.searchType;
        return !(sameQuery && sameFilters && sameType);
      });

      // Add new entry at the beginning and limit to MAX_HISTORY_ITEMS
      return [newEntry, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
};