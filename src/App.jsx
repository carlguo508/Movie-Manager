import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MovieList } from './components/MovieList';
import { MovieForm } from './components/MovieForm';
import { Settings } from './components/Settings';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<MovieForm />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
