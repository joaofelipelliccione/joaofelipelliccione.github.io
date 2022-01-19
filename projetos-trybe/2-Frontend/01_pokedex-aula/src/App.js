import React from 'react'; // 1° Passo: Importar o React para dentro do arquivo.
import Pokemon from './Pokemon';
import pokemonsData from "./data";
import './App.css';

class App extends React.Component { // 2° Passo: Criar componente React de classe 'App'.
  constructor() { // 3° Passo: Chamar a constructor() para sobrescrever suas ações default, geralmente definidas por debaixo dos panos.
    super(); // 4° Passo: Chamar a super() para garantir que a lógica do React rode antes que as ações abaixo. Sem a super(), nada colocado dentro da constructor() funcionará.

    // 6° Passo: Criação de um micro-objeto que armazenará os valores de cada um dos estados do componente. Esse micro-objeto, será o valor da key 'state', presente no macro-objeto 'this'.
    this.state = {
      pokemons: pokemonsData,
      numOfClicksNextPokBtn: 0,
      fireFilter: 'desativado',
      psychicFilter: 'desativado',
    }

    // 7° Passo: Informando ao React que as funções definidas no 5° Passo, que não são nativas, estão ligadas (bind()) ao this do componente. 
    this.psychicBtnFunc = this.psychicBtnFunc.bind(this);
    this.fireBtnFunc = this.fireBtnFunc.bind(this);
    this.nextPokemonBtnFunc = this.nextPokemonBtnFunc.bind(this);
  }

  // 5° Passo: Criar as funções responsáveis pela alteração de determinados estados do componente, definidos no 6° passo.

  fireBtnFunc() { // Função que estrutura o filtro de tipo 'Fire'. Ao ser acionada, ela altera os valores das keys 'fireFilter', 'psychicFilter' e 'pokemons'. As respectivas chaves estão presentes dentro de um micro-objeto que é o value da key 'state', presente no macro-objeto 'this'.
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

  psychicBtnFunc() { // Função que estrutura o filtro de tipo 'Psychic'. Ao ser acionada, ela altera os valores das keys 'psychicFilter', 'fireFilter', 'pokemons'. As respectivas chaves estão presentes dentro de um micro-objeto que é o value da key 'state', presente no macro-objeto 'this'.
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

  nextPokemonBtnFunc() { // Função responsável pela lógica do botão 'Próximo Pokemon'. Ao ser acionada, ela altera os valores da key 'numOfClicksNextPokBtn'. Essa última chave está presente dentro de um micro-objeto que é o value da key 'state', presente no macro-objeto 'this'.
    if(this.state.numOfClicksNextPokBtn === this.state.pokemons.length - 1) {
      this.setState(() => ({
        numOfClicksNextPokBtn: -1
      }));
    }
    this.setState((lastState) => ({
      numOfClicksNextPokBtn: lastState.numOfClicksNextPokBtn + 1
    }));
  }

  // 8° Passo: Renderizando...
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

export default App; // 9° Passo: Exportando o componente React de classe 'App', que será chamado dentro da ReactDOM.render(), localizada no arquivo index.js
