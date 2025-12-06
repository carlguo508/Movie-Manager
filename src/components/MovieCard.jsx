import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Star, Trash2, Film as FilmIcon } from 'lucide-react';
import { Rating } from './Rating';
import { MovieInfoModal } from './MovieInfoModal';
import { RatingModal } from './RatingModal';
import { cn } from '../lib/utils';
import { useMovieStore } from '../store/useMovieStore';

export function MovieCard({ movie }) {
  const { deleteMovie, updateMovieStatus, updateMovie } = useMovieStore();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusColors = {
    'seen': 'bg-green-500/20 text-green-400 border-green-500/50',
    'not-seen': 'bg-red-500/20 text-red-400 border-red-500/50',
    'watching': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  };

  const handleDelete = () => {
    deleteMovie(movie.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={() => setShowInfoModal(true)}
        className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-square relative overflow-hidden">
          <img
            src={movie.poster || `https://placehold.co/400x600/2a2a2a/FFF?text=${encodeURIComponent(movie.title)}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
          <div className="absolute top-2 right-2">
            <span className={cn("px-2 py-1 rounded-md text-xs font-medium border backdrop-blur-md", statusColors[movie.status])}>
              {movie.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          {movie.type && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-black/50 text-white backdrop-blur-md border border-white/10">
                {movie.type}
              </span>
            </div>
          )}
        </div>

        <div className="p-2">
          <h3 className="text-sm font-bold text-white mb-0.5 truncate" title={movie.title}>{movie.title}</h3>

          {/* Year and Runtime */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            {movie.year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {movie.year}
              </span>
            )}
            {movie.runtime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {movie.runtime}m
              </span>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="px-1.5 py-0.5 bg-purple-600/20 text-purple-400 rounded text-xs border border-purple-500/30">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.status === 'seen' && (
            <div
              className="mb-1 pt-1 border-t border-gray-700/50 -mx-2 px-2 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 font-bold text-sm">{movie.rating || '?'}</span>
                <Rating
                  value={movie.rating || 0}
                  onChange={(newRating) => {
                    updateMovie(movie.id, { rating: newRating });
                  }}
                />
              </div>

              {/* Watched Date */}
              {movie.watchedAt && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(movie.watchedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-gray-700/50">
            <div className="flex gap-1">
              {movie.status !== 'seen' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateMovieStatus(movie.id, 'seen');
                  }}
                  className="p-1.5 rounded-full hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors"
                  title="Mark as Seen"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
              {movie.status !== 'watching' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateMovieStatus(movie.id, 'watching');
                  }}
                  className="p-1.5 rounded-full hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                  title="Mark as Watching"
                >
                  <FilmIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-1.5 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Info Modal */}
      {showInfoModal && (
        <MovieInfoModal
          movie={movie}
          onClose={() => setShowInfoModal(false)}
        />
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal
          movie={movie}
          onClose={() => setShowRatingModal(false)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Delete Movie?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">"{movie.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all text-white"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
