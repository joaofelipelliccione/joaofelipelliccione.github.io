import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    const trunfoCard = <h4 data-testid="name-card">{ `🌟 ${ cardName }` }</h4>
    const regularCard = <h4 data-testid="name-card">{ cardName }</h4>

    return (
      <div id="cardPreview">
        { cardTrunfo ? trunfoCard : regularCard }
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card" id="cardDescription">{ cardDescription }</p>

        <span data-testid="attr1-card" className="attrs">{`1° Atributo......................... ${cardAttr1}`}</span>
        <br />
        <span data-testid="attr2-card" className="attrs">{`2° Atributo......................... ${cardAttr2}`}</span>
        <br />
        <span data-testid="attr3-card" className="attrs">{`3° Atributo......................... ${cardAttr3}`}</span>
        <br />

        <span data-testid="rare-card" id="cardRarity">{ `Raridade: ${cardRare}` }</span>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
