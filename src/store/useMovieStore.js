import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMovieStore = create(
  persist(
    (set) => ({
      movies: [],
      addMovie: (movie) => set((state) => ({
        movies: [...state.movies, { ...movie, id: crypto.randomUUID(), status: 'not-seen', addedAt: new Date().toISOString() }]
      })),
      updateMovieStatus: (id, status) => set((state) => ({
        movies: state.movies.map((m) => m.id === id ? { ...m, status } : m)
      })),
      rateMovie: (id, rating, review, watchedAt) => set((state) => ({
        movies: state.movies.map((m) => m.id === id ? { ...m, rating, review, watchedAt, status: 'seen' } : m)
      })),
      updateMovie: (id, updates) => set((state) => ({
        movies: state.movies.map((m) => m.id === id ? { ...m, ...updates } : m)
      })),
      deleteMovie: (id) => set((state) => ({
        movies: state.movies.filter((m) => m.id !== id)
      })),
    }),
    {
      name: 'movie-storage',
    }
  )
);
