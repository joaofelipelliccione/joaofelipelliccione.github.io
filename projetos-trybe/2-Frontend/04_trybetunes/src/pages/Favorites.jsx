import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

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
      <div id="page-favorites" data-testid="page-favorites">
        <Header />
        <main id="favoritesPageMain">
          {favoriteSongs.map((microObj) => (
            <div key={ microObj.trackId } className="eachFavTrack">
              <img src={ microObj.artworkUrl60 } alt={ microObj.collectionName } />
              <span id="artistNameFav" >{ microObj.artistName }</span>
              <MusicCard trackInfo={ microObj } key={ microObj.trackId } />
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default Favorites;
