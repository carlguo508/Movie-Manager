import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Star, Trash2 } from 'lucide-react';
import { Rating } from './Rating';
import { cn } from '../lib/utils';
import { useMovieStore } from '../store/useMovieStore';

export function MovieCard({ movie }) {
  const { deleteMovie, updateMovieStatus } = useMovieStore();

  const statusColors = {
    'seen': 'bg-green-500/20 text-green-400 border-green-500/50',
    'not-seen': 'bg-red-500/20 text-red-400 border-red-500/50',
    'watching': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
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

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 truncate" title={movie.title}>{movie.title}</h3>

        {movie.status === 'seen' && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 font-bold">{movie.rating}</span>
              <Rating value={movie.rating} readOnly />
            </div>
            {movie.review && (
              <p className="text-gray-400 text-sm line-clamp-2 italic">"{movie.review}"</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex gap-2">
            {movie.status !== 'seen' && (
              <button
                onClick={() => updateMovieStatus(movie.id, 'seen')}
                className="p-2 rounded-full hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors"
                title="Mark as Seen"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
            {movie.status !== 'watching' && (
              <button
                onClick={() => updateMovieStatus(movie.id, 'watching')}
                className="p-2 rounded-full hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                title="Mark as Watching"
              >
                <Clock className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => deleteMovie(movie.id)}
            className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
