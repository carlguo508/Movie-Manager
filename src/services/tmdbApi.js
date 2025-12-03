const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

class TMDBService {
  constructor() {
    this.apiKey = localStorage.getItem('tmdb_api_key') || '';
  }

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('tmdb_api_key', key);
  }

  getApiKey() {
    return this.apiKey;
  }

  hasApiKey() {
    return !!this.apiKey;
  }

  async searchMovies(query) {
    if (!this.hasApiKey()) {
      return this.getMockResults(query);
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/multi?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error('TMDB API request failed');
      }

      const data = await response.json();
      return data.results
        .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, 10)
        .map(item => this.formatSearchResult(item));
    } catch (error) {
      console.error('TMDB search error:', error);
      return this.getMockResults(query);
    }
  }

  async getMovieDetails(tmdbId, mediaType = 'movie') {
    if (!this.hasApiKey()) {
      return null;
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${tmdbId}?api_key=${this.apiKey}&append_to_response=credits&language=en-US`
      );

      if (!response.ok) {
        throw new Error('TMDB API request failed');
      }

      const data = await response.json();
      return this.formatMovieDetails(data, mediaType);
    } catch (error) {
      console.error('TMDB details error:', error);
      return null;
    }
  }

  formatSearchResult(item) {
    const isMovie = item.media_type === 'movie';
    return {
      tmdbId: item.id,
      title: isMovie ? item.title : item.name,
      year: isMovie
        ? item.release_date?.split('-')[0]
        : item.first_air_date?.split('-')[0],
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null,
      mediaType: item.media_type === 'tv' ? 'TV Show' : 'Movie',
      overview: item.overview,
    };
  }

  formatMovieDetails(data, mediaType) {
    const isMovie = mediaType === 'movie';
    return {
      tmdbId: data.id,
      title: isMovie ? data.title : data.name,
      year: isMovie
        ? data.release_date?.split('-')[0]
        : data.first_air_date?.split('-')[0],
      poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : null,
      runtime: isMovie ? data.runtime : data.episode_run_time?.[0],
      genres: data.genres?.map(g => g.name) || [],
      actors: data.credits?.cast?.slice(0, 5).map(actor => actor.name) || [],
      overview: data.overview,
      mediaType: mediaType === 'tv' ? 'TV Show' : 'Movie',
      tmdbRating: data.vote_average,
    };
  }

  getMockResults(query) {
    // Return mock results when no API key is available
    return [
      {
        tmdbId: `mock-${Date.now()}`,
        title: query,
        year: new Date().getFullYear().toString(),
        poster: `https://placehold.co/500x750/4c1d95/c4b5fd?text=${encodeURIComponent(query)}`,
        mediaType: 'Movie',
        overview: 'Mock result - Add your TMDB API key in Settings for real data',
      }
    ];
  }
}

export const tmdbService = new TMDBService();
