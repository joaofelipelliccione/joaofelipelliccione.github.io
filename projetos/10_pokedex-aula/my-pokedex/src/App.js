import React from 'react';
import Pokemon from './Pokemon';
import pokemonsData from "./data";
import './App.css';

class App extends React.Component {
  render() {
    return(
      <main>
        <header id='pageHeader'>
          <h1>Pokédex</h1>
        </header>
        <article id='pokemonsContainer'>
          <Pokemon pokemonData={pokemonsData}></Pokemon>
        </article>
      </main>
  )
  };
}

export default App;
