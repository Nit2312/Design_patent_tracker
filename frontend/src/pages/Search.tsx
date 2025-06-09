import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Upload, BarChart3, Clock, AlertCircle } from 'lucide-react';
import { useData, Patent } from '../contexts/DataContext';
import PatentCard from '../components/PatentCard';
import AdvancedSearchFilters from '../components/AdvancedSearchFilters';
import SearchHistory, { SearchHistoryEntry } from '../components/SearchHistory';
import { useSearchHistory } from '../hooks/useSearchHistory';

interface SearchFilters {
  applicant?: string;
  class?: string;
  status?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  country?: string;
  inventor?: string;
  patentNumber?: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'basic' | 'advanced'>('basic');
  const [showFilters, setShowFilters] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [results, setResults] = useState<Patent[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState('');
  const { searchPatents, isLoading } = useData();
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const validateSearch = () => {
    // Check if query has content
    if (query.trim()) return true;
    
    // Check if image is selected
    if (selectedImage) return true;
    
    // Check if any filter has content
    const hasFilters = Object.entries(filters).some(([key, value]) => {
      if (key === 'dateRange' && value) {
        const dateRange = value as { from: string; to: string };
        return dateRange.from || dateRange.to;
      }
      return value && value !== '';
    });
    
    return hasFilters;
  };

  const handleSearch = async () => {
    setSearchError('');
    
    if (!validateSearch()) {
      setSearchError('Please enter search criteria in at least one field (text query, image, or filters).');
      return;
    }
    
    setHasSearched(true);
    const searchResults = await searchPatents(query, filters, selectedImage || undefined);
    setResults(searchResults);

    // Add to search history
    addToHistory({
      query,
      filters,
      resultCount: searchResults.length,
      searchType: searchMode,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setSearchError(''); // Clear any previous errors
    }
  };

  const handleHistorySelect = (entry: SearchHistoryEntry) => {
    setQuery(entry.query);
    setFilters(entry.filters || {});
    setSearchMode(entry.searchType);
    setShowHistory(false);
    
    // If it was an advanced search, show the filters
    if (entry.searchType === 'advanced') {
      setShowFilters(true);
    }
  };

  const resetAllFields = () => {
    setQuery('');
    setFilters({});
    setSelectedImage(null);
    setSearchError('');
    setResults([]);
    setHasSearched(false);
  };

  const resetFilters = () => {
    setFilters({});
    setSearchError('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Patent Search</h1>
        <p className="text-gray-600 mt-2">Search and discover design patents with intelligent matching.</p>
      </motion.div>

      {/* Search Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative"
      >
        {/* Search Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchMode('basic')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                searchMode === 'basic'
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Basic Search
            </button>
            <button
              onClick={() => setSearchMode('advanced')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                searchMode === 'advanced'
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Advanced Search
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Clock className="h-4 w-4" />
              <span className="text-sm">History</span>
              {history.length > 0 && (
                <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                  {history.length}
                </span>
              )}
            </button>
            <button
              onClick={resetAllFields}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-sm">Reset All</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Basic Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patents by product name, description, or keywords... (Optional)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchError('');
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Upload Image (Optional)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {selectedImage && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedImage.name}</span>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSearchError('');
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {searchError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{searchError}</span>
            </motion.div>
          )}

          {/* Advanced Filters Toggle */}
          {searchMode === 'advanced' && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                </span>
              </button>
            </div>
          )}

          {/* Advanced Filters */}
          {showFilters && searchMode === 'advanced' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-6 border-t border-gray-200"
            >
              <AdvancedSearchFilters 
                filters={filters} 
                onChange={(newFilters) => {
                  setFilters(newFilters);
                  setSearchError('');
                }}
                onReset={resetFilters}
              />
            </motion.div>
          )}

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </div>
            ) : (
              'Search Patents'
            )}
          </button>
        </div>

        {/* Search History Dropdown */}
        <SearchHistory
          history={history}
          onSelectHistory={handleHistorySelect}
          onClearHistory={clearHistory}
          isVisible={showHistory}
          onClose={() => setShowHistory(false)}
        />
      </motion.div>

      {/* Search Results */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results ({results.length})
            </h2>
            {results.length > 0 && (
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analyze Results</span>
                </button>
              </div>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patents found</h3>
              <p className="text-gray-600 mb-4">No patents match your search criteria.</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Try:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Using different keywords or terms</li>
                  <li>Removing some filters to broaden your search</li>
                  <li>Checking your spelling</li>
                  <li>Using more general terms</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((patent) => (
                <PatentCard key={patent.id} patent={patent} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Search;