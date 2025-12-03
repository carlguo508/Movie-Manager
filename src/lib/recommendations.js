// Recommendation algorithms for the movie manager

/**
 * Get a random movie from the "Want to Watch" list
 */
export function getRandomRecommendation(movies) {
  const notSeenMovies = movies.filter(m => m.status === 'not-seen');
  if (notSeenMovies.length === 0) return null;

  // Use Math.random() with current timestamp for better randomization
  const randomIndex = Math.floor(Math.random() * notSeenMovies.length);
  return notSeenMovies[randomIndex];
}

/**
 * Recommend based on user's favorite genres (from highest-rated movies)
 */
export function getGenreBasedRecommendation(movies) {
  const notSeenMovies = movies.filter(m => m.status === 'not-seen');
  if (notSeenMovies.length === 0) return null;

  // Get genre preferences from rated movies
  const ratedMovies = movies.filter(m => m.rating && m.rating >= 7);

  if (ratedMovies.length === 0) {
    // No ratings yet, fall back to random
    return getRandomRecommendation(movies);
  }

  // Count genre frequencies weighted by rating
  const genreScores = {};
  ratedMovies.forEach(movie => {
    if (movie.genres && movie.genres.length > 0) {
      movie.genres.forEach(genre => {
        genreScores[genre] = (genreScores[genre] || 0) + movie.rating;
      });
    }
  });

  // Find movies in "Want to Watch" that match preferred genres
  const moviesWithScores = notSeenMovies.map(movie => {
    let score = 0;
    if (movie.genres && movie.genres.length > 0) {
      movie.genres.forEach(genre => {
        score += genreScores[genre] || 0;
      });
    }
    return { movie, score };
  });

  // Sort by score and pick from top 3 randomly (to add variety)
  moviesWithScores.sort((a, b) => b.score - a.score);

  if (moviesWithScores[0].score === 0) {
    // No genre matches, fall back to random
    return getRandomRecommendation(movies);
  }

  const topCandidates = moviesWithScores.slice(0, Math.min(3, moviesWithScores.length));
  const randomIndex = Math.floor(Math.random() * topCandidates.length);
  return topCandidates[randomIndex].movie;
}

/**
 * Recommend highest-rated unwatched movies (if user has rated similar content)
 */
export function getHighestRatedRecommendation(movies) {
  const notSeenMovies = movies.filter(m => m.status === 'not-seen');
  if (notSeenMovies.length === 0) return null;

  // Check if user has any ratings
  const hasRatings = movies.some(m => m.rating);

  if (!hasRatings) {
    // No ratings yet, fall back to random
    return getRandomRecommendation(movies);
  }

  // For movies in "Want to Watch", prioritize those with:
  // 1. TMDB rating (if available)
  // 2. Matching genres with highly-rated movies
  const ratedMovies = movies.filter(m => m.rating && m.rating >= 7);
  const preferredGenres = new Set();

  ratedMovies.forEach(movie => {
    if (movie.genres) {
      movie.genres.forEach(genre => preferredGenres.add(genre));
    }
  });

  const moviesWithScores = notSeenMovies.map(movie => {
    let score = 0;

    // Add TMDB rating if available
    if (movie.tmdbRating) {
      score += movie.tmdbRating * 10;
    }

    // Add bonus for matching preferred genres
    if (movie.genres) {
      const matchingGenres = movie.genres.filter(g => preferredGenres.has(g)).length;
      score += matchingGenres * 5;
    }

    return { movie, score };
  });

  // Sort by score and return top one
  moviesWithScores.sort((a, b) => b.score - a.score);

  if (moviesWithScores[0].score === 0) {
    // No good matches, fall back to random
    return getRandomRecommendation(movies);
  }

  return moviesWithScores[0].movie;
}

/**
 * Get recommendation based on selected algorithm
 */
export function getRecommendation(movies, algorithm = 'random') {
  switch (algorithm) {
    case 'genre':
      return getGenreBasedRecommendation(movies);
    case 'rating':
      return getHighestRatedRecommendation(movies);
    case 'random':
    default:
      return getRandomRecommendation(movies);
  }
}
