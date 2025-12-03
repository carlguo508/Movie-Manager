import React from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'];
const MEDIA_TYPES = ['Movie', 'TV Show', 'Reality Show'];
const SORT_OPTIONS = [
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'dateAdded', label: 'Date Added' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'year', label: 'Year (Newest)' },
];

export function FilterPanel({ filters, onChange, onClear }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const activeFilterCount =
    filters.genres.length +
    filters.types.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.sortBy !== 'dateAdded' ? 1 : 0);

  const toggleGenre = (genre) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre];
    onChange({ ...filters, genres: newGenres });
  };

  const toggleType = (type) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types: newTypes });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all flex items-center gap-2"
      >
        <Filter className="w-5 h-5" />
        Filters
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 bg-purple-600 text-white rounded-full text-xs font-medium">
            {activeFilterCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-4 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Filters</h3>
              <div className="flex gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      onClear();
                      setIsOpen(false);
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Genres */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-all ${filters.genres.includes(genre)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-900 text-gray-400 hover:text-white'
                        }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Types */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {MEDIA_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filters.types.includes(type)
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-900 text-gray-400 hover:text-white'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Rating: {filters.minRating > 0 ? filters.minRating : 'Any'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={filters.minRating}
                  onChange={(e) => onChange({ ...filters, minRating: parseInt(e.target.value) })}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Any</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
