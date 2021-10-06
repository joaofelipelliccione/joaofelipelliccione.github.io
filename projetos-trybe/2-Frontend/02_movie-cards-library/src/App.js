import React from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import moviesData from './data';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MovieList movies={ moviesData } />
      <Footer />
    </div>
  );
}

export default App;
