import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Star, Film } from 'lucide-react';
import { Rating } from './Rating';
import { EditMovieModal } from './EditMovieModal';

export function MovieInfoModal({ movie, onClose }) {
  const [showEditModal, setShowEditModal] = React.useState(false);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with poster */}
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <img
              src={movie.poster || `https://placehold.co/400x600/2a2a2a/FFF?text=${encodeURIComponent(movie.title)}`}
              alt={movie.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-900 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              {movie.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {movie.year}
                </span>
              )}
              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.runtime} min
                </span>
              )}
              {movie.type && (
                <span className="flex items-center gap-1">
                  <Film className="w-4 h-4" />
                  {movie.type}
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm border border-purple-500/30">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            {movie.status === 'seen' && movie.rating && (
              <div className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-yellow-400">{movie.rating}</span>
                  <Rating value={movie.rating} readOnly />
                </div>
                {movie.review && (
                  <p className="text-gray-300 italic">"{movie.review}"</p>
                )}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>
            )}

            {/* Actors */}
            {movie.actors && movie.actors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.actors.map((actor, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-gray-200 rounded-lg text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all"
              >
                Edit Details
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditMovieModal
          movie={movie}
          onClose={() => {
            setShowEditModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
