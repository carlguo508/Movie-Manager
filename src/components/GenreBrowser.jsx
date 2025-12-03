import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { useMovieStore } from '../store/useMovieStore';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'];

export function GenreBrowser({ onClose }) {
  const { movies } = useMovieStore();
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Get genre counts
  const genreCounts = useMemo(() => {
    const counts = {};
    GENRES.forEach(genre => {
      counts[genre] = movies.filter(m => m.genres?.includes(genre)).length;
    });
    return counts;
  }, [movies]);

  // Filter movies by selected genre
  const filteredMovies = useMemo(() => {
    if (!selectedGenre) return [];
    return movies.filter(m => m.genres?.includes(selectedGenre));
  }, [movies, selectedGenre]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Browse by Genre
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Genre Selection */}
        {!selectedGenre ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GENRES.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">{genre}</div>
                  <div className="text-sm text-gray-400">
                    {genreCounts[genre]} {genreCounts[genre] === 1 ? 'movie' : 'movies'}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-xl transition-all" />
              </motion.button>
            ))}
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedGenre(null)}
              className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all"
            >
              ← Back to Genres
            </button>

            {/* Genre Title */}
            <h3 className="text-2xl font-bold text-white mb-6">
              {selectedGenre} Movies ({filteredMovies.length})
            </h3>

            {/* Movies Grid */}
            {filteredMovies.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No {selectedGenre} movies in your collection yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
