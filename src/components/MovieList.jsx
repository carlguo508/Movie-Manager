import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dices } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { RatingModal } from './RatingModal';
import { useMovieStore } from '../store/useMovieStore';

export function MovieList() {
  const { movies } = useMovieStore();
  const [activeTab, setActiveTab] = useState('not-seen');
  const [ratingMovie, setRatingMovie] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const tabs = [
    { id: 'not-seen', label: 'Want to Watch', count: movies.filter(m => m.status === 'not-seen').length },
    { id: 'watching', label: 'Watching', count: movies.filter(m => m.status === 'watching').length },
    { id: 'seen', label: 'Watched', count: movies.filter(m => m.status === 'seen').length },
  ];

  const filteredMovies = movies.filter(m => m.status === activeTab);

  const handleRecommend = () => {
    const notSeenMovies = movies.filter(m => m.status === 'not-seen');
    if (notSeenMovies.length === 0) {
      alert('No movies in "Want to Watch" list!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * notSeenMovies.length);
    setRecommendation(notSeenMovies[randomIndex]);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2 bg-gray-800 p-1 rounded-xl border border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white/10">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {activeTab === 'not-seen' && movies.filter(m => m.status === 'not-seen').length > 0 && (
          <button
            onClick={handleRecommend}
            className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/30"
          >
            <Dices className="w-5 h-5" />
            Recommend Me
          </button>
        )}
      </div>

      {/* Movie Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-500 text-lg">
            No movies in this category yet.
          </div>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredMovies.map((movie) => (
              <div key={movie.id} onClick={() => activeTab === 'seen' && setRatingMovie(movie)}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Rating Modal */}
      {ratingMovie && (
        <RatingModal
          movie={ratingMovie}
          onClose={() => setRatingMovie(null)}
        />
      )}

      {/* Recommendation Modal */}
      {recommendation && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setRecommendation(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                We Recommend
              </h3>
              <div className="my-6">
                <img
                  src={recommendation.poster || `https://placehold.co/400x600/2a2a2a/FFF?text=${encodeURIComponent(recommendation.title)}`}
                  alt={recommendation.title}
                  className="w-48 h-72 object-cover rounded-lg mx-auto border border-gray-700 shadow-xl"
                />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{recommendation.title}</h4>
              {recommendation.genres && recommendation.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {recommendation.genres.map((genre) => (
                    <span key={genre} className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-md text-xs border border-purple-500/30">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => setRecommendation(null)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
