import React from 'react';
import propTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component { // Componente React que se transformará em cards de filmes. Será chamado dentro do Componente React de classe 'MovieList'.
  render() {
    const { movie: { title, subtitle, storyline, imagePath, rating } } = this.props; // Utilizando object destructuring para captar as informações necessárias para o desenvolvimento de cada card. A props 'movie', desse componente, recebe um objeto que contêm informações de um determinado filme.

    return (
      <div className='movie-card'>
        <img src={ imagePath } alt={ title } className='movie-card-image' />
        <div className='movie-card-body'>
          <h4 className='movie-card-title'>{ title }</h4>
          <h5  className='movie-card-subtitle'>{ subtitle }</h5>
          <p className='movie-card-storyline'>{ storyline }</p>
        </div>
        <Rating rating={ `🌟 ${rating}` } />
      </div>
    );
  }
}

// PropTypes:
MovieCard.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string,
    subtitle: propTypes.string,
    storyline: propTypes.string,
    imagePath: propTypes.string,
    rating: propTypes.number,
  }).isRequired,
};

export default MovieCard;
