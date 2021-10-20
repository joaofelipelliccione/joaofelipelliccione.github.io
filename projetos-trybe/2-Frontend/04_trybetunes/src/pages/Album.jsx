import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

  getMusicsFromAlbum = async () => { // Engloba, entre outras coisas, a função assíncrona getMusics(). Essa última, realiza uma requisição para a API do Itunes que retorna um array de objetos onde, cada objeto, diz respeito à uma música de um determinado álbum.
    const { match: { params: { id } } } = this.props; // O id é uma informação acumulada pelo próprio <Route /> que encapsula o componente React de classe "Album".

    const response = await getMusics(id);

    this.setState({ // O primeiro elemento do array (índice 0), oriundo da response, acumula informações do album e não de uma música específica, como ocorre nos elementos de índice >= 1.
      musics: response,
      albumImg: response[0].artworkUrl100,
      albumName: response[0].collectionName,
      artist: response[0].artistName,
    });
  }

  render() {
    const { musics, albumImg, albumName, artist } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          <section className="albumInfoContainer">
            <img src={ albumImg } alt={ albumName } />
            <h4 data-testid="album-name">{ albumName }</h4>
            <p data-testid="artist-name">{ artist }</p>
          </section>
          <section id="tracksListContainer">
            {musics.map((microObj, index) => (
              index > 0 && <MusicCard trackInfo={ microObj } key={ microObj.trackId } />
              // O primeiro elemento do array (índice 0) acumula informações do album e não de uma música específica.
            ))}
          </section>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
