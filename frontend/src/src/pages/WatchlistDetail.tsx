import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, FileText, Plus, Download, Edit, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import PatentCard from '../components/PatentCard';

const WatchlistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { watchlists, removeFromWatchlist } = useData();
  
  const watchlist = watchlists.find(w => w.id === id);

  if (!watchlist) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Watchlist Not Found</h2>
        <p className="text-gray-600 mb-4">The watchlist you're looking for doesn't exist.</p>
        <Link
          to="/watchlists"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Watchlists</span>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <Link
          to="/watchlists"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{watchlist.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(watchlist.status)}`}>
              {watchlist.status}
            </span>
          </div>
          <p className="text-gray-600">{watchlist.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-50 rounded-xl">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{watchlist.patents.length}</p>
              <p className="text-sm text-gray-600">Patents</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-secondary-50 rounded-xl">
              <Calendar className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(watchlist.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Created</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent-50 rounded-xl">
              <Plus className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{watchlist.tags.length}</p>
              <p className="text-sm text-gray-600">Tags</p>
            </div>
          </div>
        </div>

        {watchlist.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {watchlist.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Patents in this Watchlist</h2>
          <Link
            to="/search"
            className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Patents</span>
          </Link>
        </div>

        {watchlist.patents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patents yet</h3>
            <p className="text-gray-600 mb-4">Start adding patents to this watchlist.</p>
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Search Patents</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.patents.map((patent, index) => (
              <motion.div
                key={patent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                <PatentCard patent={patent} />
                <button
                  onClick={() => removeFromWatchlist(watchlist.id, patent.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100"
                  title="Remove from watchlist"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WatchlistDetail;