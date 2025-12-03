import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle } from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';
import { useNavigate } from 'react-router-dom';
import { tmdbService } from '../services/tmdbApi';

export function MovieForm() {
  const navigate = useNavigate();
  const { addMovie } = useMovieStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addingId, setAddingId] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    const results = await tmdbService.searchMovies(searchQuery);
    setSearchResults(results);
    setSearching(false);
  };

  const handleSelectResult = async (result, index) => {
    setAddingId(index);

    try {
      // If we have a real TMDB ID, fetch full details
      let movieData;
      // TMDB IDs are numbers, mock IDs are strings starting with 'mock-'
      const isRealTmdbId = result.tmdbId && typeof result.tmdbId === 'number';

      if (isRealTmdbId) {
        const details = await tmdbService.getMovieDetails(result.tmdbId, result.mediaType === 'TV Show' ? 'tv' : 'movie');
        if (details) {
          movieData = {
            title: details.title,
            type: details.mediaType,
            genres: details.genres || [],
            poster: details.poster,
            year: details.year,
            runtime: details.runtime,
            actors: details.actors || [],
            tmdbId: details.tmdbId,
            overview: details.overview,
          };
        } else {
          // If details fetch fails, use basic search result data
          movieData = {
            title: result.title,
            type: result.mediaType,
            genres: [],
            poster: result.poster,
            year: result.year,
            runtime: '',
            actors: [],
            overview: result.overview,
          };
        }
      } else {
        // Use basic search result data
        movieData = {
          title: result.title,
          type: result.mediaType,
          genres: [],
          poster: result.poster,
          year: result.year,
          runtime: '',
          actors: [],
          overview: result.overview,
        };
      }

      // Add the movie directly
      if (movieData) {
        addMovie({
          ...movieData,
          poster: movieData.poster || `https://placehold.co/400x600/1f2937/9ca3af?text=${encodeURIComponent(movieData.title)}`,
        });

        // Clear search and reset state for next movie
        setTimeout(() => {
          setAddingId(null);
          setSearchQuery('');
          setSearchResults([]);
        }, 200);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      // Reset state on error
      setAddingId(null);
      alert('Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Add New Movie/Show
        </h2>

        {/* Search Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search for a movie or TV show
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Type a title and press Enter..."
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              {searching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Click on any result to add it to your "Want to Watch" list
          </p>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden max-h-[500px] overflow-y-auto"
              >
                {searchResults.map((result, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectResult(result, index)}
                    disabled={addingId === index}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-800 transition-colors text-left border-b border-gray-700 last:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: addingId === index ? 1 : 1.01 }}
                  >
                    {result.poster ? (
                      <img
                        src={result.poster}
                        alt={result.title}
                        className="w-16 h-24 object-cover rounded shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-24 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-lg truncate group-hover:text-purple-400 transition-colors">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {result.year && <span className="font-medium">{result.year}</span>}
                        {result.year && result.mediaType && <span className="mx-2">•</span>}
                        {result.mediaType && <span>{result.mediaType}</span>}
                      </div>
                      {result.overview && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {result.overview}
                        </p>
                      )}
                    </div>
                    {addingId === index ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-sm font-medium">Added!</span>
                      </div>
                    ) : (
                      <div className="text-gray-600 group-hover:text-purple-400 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!searching && searchResults.length === 0 && searchQuery === '' && (
            <div className="mt-8 text-center py-12 bg-gray-900/50 rounded-lg border border-gray-700">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Search for movies and TV shows to add to your collection</p>
              <p className="text-sm text-gray-500 mt-1">Results will appear here</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
