# Movie Manager

A modern, aesthetically pleasing web application to manage your movie and TV show watchlist. (Vibe Coding using Antigravity, claude sonnet 4.5)

## Live Demo

🚀 **[View Live Demo](https://carlguo508.github.io/Movie-Manager/)**

## Features
\
- 📋 **Classification System**: Organize content into Want to Watch, Watching, and Watched
- 🔍 **Smart Search & Filter**: Real-time search and advanced filtering by genre, type, and rating
- 🎭 **Genre Browser**: Visual way to browse your collection by genre
- ✏️ **Edit & Manage**: Edit movie details and safely delete with confirmation
- ⭐ **Rating System**: Rate watched content on a 1-10 star scale
- 📝 **Reviews**: Write your thoughts and track when you watched
- 🎲 **Smart Recommendations**: 
  - Random Pick (truly random!)
  - Genre-based (based on your favorites)
  - Highest Rated (critically acclaimed)
- 🎬 **TMDB Integration**: Automatic metadata fetching (posters, cast, runtime, etc.)
- 💾 **Data Persistence**: All data saved locally in your browser
- 🎨 **Modern UI**: Dark theme with smooth animations and responsive design

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **React Router** - Navigation (HashRouter for static deployment)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key (free from [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. Clone the repository
```bash
git clone https://github.com/carlguo508/Movie-Manager.git
cd Movie-Manager
```

2. Install dependencies
```bash
npm install
```

3. Configure API Key (Optional but recommended)
Create a `.env.local` file in the root directory:
```
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Deployment

This project is configured for GitHub Pages.

```bash
npm run deploy
```

## Usage

1. **Add Movies**: Click "Add New" to search TMDB and add movies/shows
2. **Browse**: Use the Genre Browser or Search/Filter bar to find content
3. **Manage**: Mark as Watching/Seen, Edit details, or Delete
4. **Rate & Review**: Click on watched items to add ratings and reviews
5. **Get Recommendations**: Click "Recommend Me" for smart suggestions

## Future Enhancements

- Export/import watchlist (JSON backup)
- Social sharing features
- User accounts for cross-device sync

## License

MIT
