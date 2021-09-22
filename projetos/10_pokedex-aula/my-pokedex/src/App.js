import React from 'react';
import Pokemon from './Pokemon';
import pokemonsData from "./data";
import './App.css';

class App extends React.Component {
  render() {
    return(
      <main id='pokemonsContainer'>
        <Pokemon pokemonData={pokemonsData}></Pokemon>
      </main>
    )
  };
}

export default App;
