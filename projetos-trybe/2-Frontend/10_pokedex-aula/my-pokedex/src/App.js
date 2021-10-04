import React from 'react';
import Pokemon from './Pokemon';
import pokemonsData from "./data";
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      numOfClicksNextPokBtn: 0,
    }

    this.nextPokemonBtnFunc = this.nextPokemonBtnFunc.bind(this);
  }

  nextPokemonBtnFunc() {
    if(this.state.numOfClicksNextPokBtn === pokemonsData.length - 1) {
      this.setState(() => ({
        numOfClicksNextPokBtn: -1
      }));
    }
    this.setState((lastState) => ({
      numOfClicksNextPokBtn: lastState.numOfClicksNextPokBtn + 1
    }));
  }

  
  
  render() {
    return(
      <main>
        <header id='pageHeader'>
          <h1>Pokédex</h1>
        </header>
        <article id='pokemonsContainer'>
          <Pokemon pokemonData={pokemonsData} pokemonDataIndex={this.state.numOfClicksNextPokBtn}></Pokemon>
          <section className='btnsContainer'>
            <button onClick={this.nextPokemonBtnFunc} id='nextPokemonBtn'>Próximo Pokémon</button>
          </section>
        </article>
      </main>
  )
  };
}

export default App;
