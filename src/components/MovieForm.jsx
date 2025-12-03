import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, X } from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';
import { useNavigate } from 'react-router-dom';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'];
const MEDIA_TYPES = ['Movie', 'TV Show', 'Reality Show'];

export function MovieForm() {
  const navigate = useNavigate();
  const { addMovie } = useMovieStore();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Movie',
    genres: [],
    poster: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addMovie({
      ...formData,
      poster: formData.poster || `https://placehold.co/400x600/1f2937/9ca3af?text=${encodeURIComponent(formData.title)}`,
    });

    setFormData({ title: '', type: 'Movie', genres: [], poster: '' });
    navigate('/');
  };

  // Mock search simulation
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Simulate finding a movie with auto-generated poster
    setFormData({
      title: searchQuery,
      type: 'Movie',
      genres: [],
      poster: `https://placehold.co/400x600/4c1d95/c4b5fd?text=${encodeURIComponent(searchQuery)}`,
    });
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
            Quick Search (Mock)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a movie..."
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This is a mock search. Enter a title and click Search to auto-fill the form.
          </p>
        </div>

        <div className="h-px bg-gray-700 my-6" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title..."
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type
            </label>
            <div className="flex gap-2">
              {MEDIA_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${formData.type === type
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${formData.genres.includes(genre)
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20'
                      : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Poster URL (Optional)
            </label>
            <input
              type="url"
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
              placeholder="https://example.com/poster.jpg"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            {formData.poster && (
              <div className="mt-3">
                <img
                  src={formData.poster}
                  alt="Preview"
                  className="w-32 h-48 object-cover rounded-lg border border-gray-700"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x600/2a2a2a/FFF?text=Invalid+URL`;
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
            >
              <Plus className="w-5 h-5" />
              Add to List
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
