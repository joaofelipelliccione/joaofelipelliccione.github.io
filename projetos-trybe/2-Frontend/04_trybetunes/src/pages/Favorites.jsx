import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.recoverFavorites();
  }

  componentDidUpdate() { // Importante para que, quando uma música favorita for removida, ela pare de ser renderizada na página.
    this.recoverFavorites();
  }

  recoverFavorites = async () => { // Engloba, entre outras coisas, a função assíncrona getFavoriteSongs(). Essa última, recupera o array de objetos referente às músicas favoritas, que estão salvas no local storage.
    const favSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs: favSongs,
    });
  }

  render() {
    const { favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <main>
          {favoriteSongs.map((microObj) => (
            <div key={ microObj.trackId } className="eachFavTrack">
              <img src={ microObj.artworkUrl30 } alt={ microObj.collectionName } />
              <p>{ microObj.artistName }</p>
              <MusicCard trackInfo={ microObj } key={ microObj.trackId } />
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default Favorites;
