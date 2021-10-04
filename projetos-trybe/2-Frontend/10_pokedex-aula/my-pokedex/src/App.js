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
      fireFilter: 'desativado',
      psychicFilter: 'desativado',
    }

    this.psychicBtnFunc = this.psychicBtnFunc.bind(this);
    this.fireBtnFunc = this.fireBtnFunc.bind(this);
    this.nextPokemonBtnFunc = this.nextPokemonBtnFunc.bind(this);
  }

  fireBtnFunc() {
    if(this.state.fireFilter === 'desativado') {
      this.setState(() => ({
        fireFilter: 'ativado',
        psychicFilter: 'desativado',
        pokemons: pokemonsData.filter((pokemons) => pokemons.type === 'Fire'),
      }));
    } else {
      this.setState(() => ({
        fireFilter: 'desativado',
        pokemons: pokemonsData,
      }));
    }
  }

  psychicBtnFunc() {
    if(this.state.psychicFilter === 'desativado') {
      this.setState(() => ({
        psychicFilter: 'ativado',
        fireFilter: 'desativado',
        pokemons: pokemonsData.filter((pokemons) => pokemons.type === 'Psychic'),
      }));
    } else {
      this.setState(() => ({
        psychicFilter: 'desativado',
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
            <button onClick={this.nextPokemonBtnFunc} id='nextPokemonBtn' className='btns'>Próximo Pokémon</button>
            <button onClick={this.fireBtnFunc} id='fireBtn' className='btns'>Fire: {this.state.fireFilter}</button>
            <button onClick={this.psychicBtnFunc} id='psychicBtn' className='btns'>Psychic: {this.state.psychicFilter}</button>
          </section>
        </article>
      </main>
  )
  };
}

export default App;
