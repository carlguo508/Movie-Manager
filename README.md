# Movie Manager

A modern, aesthetically pleasing web application to manage your movie and TV show watchlist. (Vibe Coding using Antigravity, claude sonnet 4.5)

## Features

- 📋 **Classification System**: Organize content into Want to Watch, Watching, and Watched
- 🎭 **Genre & Type Selection**: Categorize by 10+ genres and media types (Movie, TV Show, Reality Show)
- ⭐ **Rating System**: Rate watched content on a 1-10 star scale
- 📝 **Reviews**: Write your thoughts and track when you watched
- 🎲 **Recommendation Engine**: Get random suggestions from your "Want to Watch" list
- 💾 **Data Persistence**: All data saved locally in your browser
- 🎨 **Modern UI**: Dark theme with smooth animations and responsive design

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **React Router** - Navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Usage

1. **Add Movies**: Click "Add New" to add movies/shows with genres
2. **Manage Status**: Use the icons to mark content as Watching or Seen
3. **Rate & Review**: Click on watched items to add ratings and reviews
4. **Get Recommendations**: Click "Recommend Me" to get a random suggestion

## Future Enhancements

- Real API integration (TMDB, OMDb) for automatic poster fetching
- Search and filter within your collection
- Export/import watchlist
- Multiple recommendation algorithms

## License

MIT
