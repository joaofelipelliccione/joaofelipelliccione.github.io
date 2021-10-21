import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

class MusicCard extends React.Component { // É chamado dentro de <Album /> e <Favorites />.
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.recoverFavorites();
  }

  recoverFavorites = async () => { // Engloba, entre outras coisas, a função assíncrona getFavoriteSongs(). Essa última, recupera o array de objetos, referente às músicas favoritas, que estão salvas no local storage.
    this.setState({ loading: true });

    const favSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: favSongs,
    });
  }

  addRemoveFavorites = async ({ target }) => { // Engloba, entre outras coisas, as funções assíncronas addSong() e removeSong(). Essas últimas, marcam e desmarcam (respectivamente) uma determinada música como favorita, atualizando o local storage.
    const { trackInfo } = this.props;
    this.setState({ loading: true });

    if (target.checked) {
      await addSong(trackInfo);
      await this.recoverFavorites();
    } else {
      await removeSong(trackInfo);
      await this.recoverFavorites();
      // window.location.reload(false);
    }

    this.setState({ loading: false });
  }

  render() {
    const { trackInfo: { trackName, previewUrl, trackId } } = this.props;
    const { loading, favoriteSongs } = this.state;

    return (
      <div className="eachTrack">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          ❤️
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackId }
            onClick={ this.addRemoveFavorites }
            checked={ favoriteSongs.some((microObj) => microObj.trackId === trackId) } // Se a 'trackId' do momento for encontrada na lista de favoritas, o checkbox será marcado (true).
          />
        </label>
        {loading && <span>...</span>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
