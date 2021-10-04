import React from 'react';
import Pokemon from './Pokemon';
import pokemonsData from "./data";
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemons: pokemonsData,
      numOfClicksNextPokBtn: 0,
      fireFilter: 'disable',
    }

    this.fireBtnFunc = this.fireBtnFunc.bind(this);
    this.nextPokemonBtnFunc = this.nextPokemonBtnFunc.bind(this);
  }

  fireBtnFunc() {
    if(this.state.fireFilter === 'disable') {
      this.setState(() => ({
        fireFilter: 'enable',
        pokemons: pokemonsData.filter((pokemons) => pokemons.type === 'Fire'),
      }));
    } else {
      this.setState(() => ({
        fireFilter: 'disable',
        pokemons: pokemonsData,
      }));
    }
  }

  nextPokemonBtnFunc() {
    if(this.state.numOfClicksNextPokBtn === this.state.pokemons.length - 1) {
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
          <Pokemon pokemonData={this.state.pokemons} pokemonDataIndex={this.state.numOfClicksNextPokBtn}></Pokemon>
          <section className='btnsContainer'>
            <button onClick={this.nextPokemonBtnFunc} id='nextPokemonBtn'>Próximo Pokémon</button>
            <button onClick={this.fireBtnFunc} id='fireBtn'>{this.state.fireFilter}</button>
          </section>
        </article>
      </main>
  )
  };
}

export default App;
