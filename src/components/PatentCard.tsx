import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Bookmark, Calendar, Building, Award } from 'lucide-react';
import { Patent, useData } from '../contexts/DataContext';
import AddToWatchlistModal from './AddToWatchlistModal';

interface PatentCardProps {
  patent: Patent;
}

const PatentCard: React.FC<PatentCardProps> = ({ patent }) => {
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const { watchlists } = useData();

  const isInWatchlist = watchlists.some(w => 
    w.patents.some(p => p.id === patent.id)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
      >
        <div className="relative">
          <img
            src={patent.image}
            alt={patent.title}
            className="w-full h-48 object-cover"
          />
          {patent.similarity && (
            <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {patent.similarity}% match
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(patent.status)}`}>
              {patent.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {patent.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Building className="h-4 w-4 mr-2" />
              {patent.applicant}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(patent.filingDate).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Award className="h-4 w-4 mr-2" />
              {patent.class}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {patent.description}
          </p>

          <div className="flex items-center justify-between">
            <Link
              to={`/patents/${patent.id}`}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">View Details</span>
            </Link>

            <button
              onClick={() => setShowWatchlistModal(true)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all ${
                isInWatchlist
                  ? 'bg-accent-100 text-accent-700 hover:bg-accent-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isInWatchlist ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">
                {isInWatchlist ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <AddToWatchlistModal
        isOpen={showWatchlistModal}
        onClose={() => setShowWatchlistModal(false)}
        patent={patent}
      />
    </>
  );
};

export default PatentCard;