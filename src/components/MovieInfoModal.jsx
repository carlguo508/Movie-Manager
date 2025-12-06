import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Star, Film, MessageSquare } from 'lucide-react';
import { Rating } from './Rating';
import { EditMovieModal } from './EditMovieModal';
import { useMovieStore } from '../store/useMovieStore';

export function MovieInfoModal({ movie, onClose }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { updateMovie } = useMovieStore();

  // Local state for immediate UI feedback
  const [rating, setRating] = useState(movie.rating || 0);
  const [review, setReview] = useState(movie.review || '');
  const [watchedAt, setWatchedAt] = useState(
    movie.watchedAt ? new Date(movie.watchedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );

  // Sync state if movie prop updates
  useEffect(() => {
    setRating(movie.rating || 0);
    setReview(movie.review || '');
    setWatchedAt(movie.watchedAt ? new Date(movie.watchedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  }, [movie]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    updateMovie(movie.id, { rating: newRating });
  };

  const handleReviewChange = (e) => {
    const newReview = e.target.value;
    setReview(newReview);
    updateMovie(movie.id, { review: newReview });
  };

  const handleWatchedAtChange = (e) => {
    const newWatchedAt = e.target.value;
    setWatchedAt(newWatchedAt);
    updateMovie(movie.id, { watchedAt: newWatchedAt });
  };

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
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
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

            {/* Rating & Notes Section - Always visible for interaction if seen, or shows read-only if not? 
                Actually sticking to 'seen' check to mimic previous behavior, but maybe user wants to note first? 
                Let's stick to 'seen' for rating, but maybe notes can be independent?
                For now, grouping them as requested "same page as rating".
            */}
            {movie.status === 'seen' && (
              <div className="mb-6 p-5 bg-gray-900/50 rounded-xl border border-gray-700/50 space-y-4">
                {/* Rating Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Rating</label>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-yellow-500">{rating || '?'}</span>
                    <div className="pb-1">
                      <Rating value={rating} onChange={handleRatingChange} />
                    </div>
                  </div>
                </div>


                {/* Watched Date Input */}
                <div>
                  <label className="block text-sm font-medium text-yellow-400 mb-3 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-yellow-400" />
                    <span className="text-base">When did you watch it?</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={watchedAt}
                      onChange={handleWatchedAtChange}
                      className="w-full px-4 py-3.5 bg-gray-800/50 border-2 border-yellow-500/40 rounded-lg text-gray-100 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer hover:border-yellow-500/60 hover:bg-gray-800/70"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                {/* Notes Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Notes
                  </label>
                  <textarea
                    value={review}
                    onChange={handleReviewChange}
                    placeholder="Write your thoughts about the movie..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all resize-none text-sm"
                  />
                </div>
              </div>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm border border-purple-500/30">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{movie.overview}</p>
              </div>
            )}

            {/* Director */}
            {movie.director && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm border border-blue-500/30">
                  {movie.director}
                </span>
              </div>
            )}

            {/* Actors */}
            {movie.actors && movie.actors.length > 0 && (
              <div className="mb-8">
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
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all text-white"
              >
                Edit Details
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-900 hover:bg-black rounded-lg font-medium transition-all text-gray-400 hover:text-white"
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
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
