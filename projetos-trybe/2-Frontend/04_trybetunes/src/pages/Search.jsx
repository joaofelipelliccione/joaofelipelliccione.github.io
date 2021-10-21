import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userSearch: '',
      lastSearchedArtist: '',
      albuns: [],
    };
  }

  onInputChange = ({ target }) => { // Função que altera o valor de qualquer estado, sempre que um input for realizado no elemento onde ela está sendo chamada. || OBS: Para que tal função funcione, os 'name' de cada um dos elementos do Forms devem ser iguais ao nome dos estados.
    const { name } = target;
    const formElementValue = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: formElementValue });
  }

  onSearchClick = async () => { // Engloba, entre outras coisas, a função assíncrona searchAlbumsAPI(). Essa última, realiza uma requisição para a API do Itunes que retorna um array de objetos onde, cada objeto, diz respeito à um álbum musical de um determinado artista.
    const { userSearch } = this.state;

    this.setState({
      loading: true,
      lastSearchedArtist: userSearch,
      userSearch: '',
    });

    const response = await searchAlbumsAPI(userSearch);

    this.setState({
      albuns: response,
      loading: false,
    });
  }

  searchWithEnter = (e) => { // Permite pesquisar pressionando a tecla Enter.
    e.preventDefault();
    this.onSearchClick();
  }

  displaySearchBar = () => { // Função que retorna os elementos HTML para que o usuário consiga pesquisar um determinado artista.
    const { userSearch } = this.state;
    const numOfCharacters = 2;

    return (
      <form id="searchArtistForm">
        <input
          id="searchBar"
          data-testid="search-artist-input"
          type="text"
          name="userSearch"
          value={ userSearch }
          onChange={ this.onInputChange }
          onKeyPress={ (event) => event.key === 'Enter' && this.searchWithEnter(event) }
          placeholder="Nome do Artista ou do Álbum"
        />
        <button
          id="search-button"
          data-testid="search-artist-button"
          type="button"
          disabled={ userSearch.length < numOfCharacters } // O botão só será habilitado quando o estado 'username' tiver 3 caracteres ou mais.
          onClick={ this.onSearchClick }
        >
          🔎
        </button>
      </form>
    );
  }

  displayAlbuns = () => { // Função que retorna o elemento HTML a ser renderizado quando o artista pesquisado apresenta álbuns.
    const { lastSearchedArtist, albuns } = this.state;

    return (
      <div id="apiResultContainer2">
        <h3>{`Retorno da pesquisa por: ${lastSearchedArtist}`}</h3>
        <div id="albunsContainer">
          {albuns.map(({ collectionId, artworkUrl100, collectionName, artistName }) => (
            <div id="eachAlbum" key={ collectionId }>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{ collectionName }</p>
              <p>{ artistName }</p>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <span>Abrir Álbum</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  displayWarning = () => ( // Função que retorna o elemento HTML a ser renderizado quando o artista pesquisado não é achado.
    <section id="apiResultContainer2">
      {}
      <h3>Nenhum álbum foi encontrado até agora...</h3>
    </section>
  );

  render() {
    const { loading, albuns } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <main id="searchPageMain">
          <section id="searchBarContainer">
            { loading ? <span>Carregando...</span> : this.displaySearchBar() }
          </section>
          <section id="apiResultContainer">
            { albuns.length > 0 ? this.displayAlbuns() : this.displayWarning() }
          </section>
        </main>
      </div>
    );
  }
}

export default Search;
