import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MovieList } from './components/MovieList';
import { MovieForm } from './components/MovieForm';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<MovieForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
