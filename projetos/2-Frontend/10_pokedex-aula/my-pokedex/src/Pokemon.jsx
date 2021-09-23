import React from "react";

class Pokemon extends React.Component {
  render() {
    return(
      this.props.pokemonData.map((pokemon) => (
        <div key={pokemon.id} className='pokInfo'>
          <h2>{pokemon.name}</h2>
          <p>{pokemon.type}</p>
          <p>Average Weigth: {`${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`}</p>
          <img src={pokemon.image} alt={pokemon.name}></img>
          <nav>
            <a href={pokemon.moreInfo} target='_blank' rel="noreferrer">More Info!</a>
          </nav>
        </div>
    ))
    )
  };
}

export default Pokemon;