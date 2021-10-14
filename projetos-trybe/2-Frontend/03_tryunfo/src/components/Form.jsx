import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const whenHasTrunfo = (
      <span className="checkBoxLabel">
        Você já possui um Super Trunfo em seu baralho!
      </span>
    );

    const whenHasNotTrunfo = (
      <label htmlFor="trunfoCard-input" className="checkBoxLabel">
        <input
          id="trunfoCard-input"
          data-testid="trunfo-input"
          name="cardTrunfo"
          type="checkbox"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        Super Trybe Trunfo
      </label>
    );

    return (
      <form id="newCardForm">
        <label htmlFor="cardName-input" className="stdLabel">
          Nome:
          <br />
          <input
            id="cardName-input"
            data-testid="name-input"
            name="cardName"
            type="text"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <br />

        <label htmlFor="cardDescription-input" className="stdLabel">
          Descrição:
          <br />
          <textarea
            id="cardDescription-input"
            data-testid="description-input"
            name="cardDescription"
            rows="5"
            cols="10"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <br />

        <label htmlFor="cardAttr1-input" className="attrLabel">
          1° Atributo:
          <input
            id="cardAttr1-input"
            data-testid="attr1-input"
            name="cardAttr1"
            type="number"
            min="0"
            max="90"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <br />

        <label htmlFor="cardAttr2-input" className="attrLabel">
          2° Atributo:
          <input
            id="cardAttr2-input"
            data-testid="attr2-input"
            name="cardAttr2"
            type="number"
            min="0"
            max="90"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <br />

        <label htmlFor="cardAttr3-input" className="attrLabel">
          3° Atributo:
          <input
            id="cardAttr3-input"
            data-testid="attr3-input"
            name="cardAttr3"
            type="number"
            min="0"
            max="90"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <br />

        <label htmlFor="cardImage-input" className="stdLabel">
          Imagem:
          <br />
          <input
            id="cardImage-input"
            data-testid="image-input"
            name="cardImage"
            type="text"
            placeholder="🔗"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <br />

        <label htmlFor="cardRare-input" className="stdLabel">
          Raridade:
          <br />
          <select
            id="cardRare-input"
            data-testid="rare-input"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option>Normal</option>
            <option>Raro</option>
            <option>Muito raro</option>
          </select>
        </label>

        <br />

        {hasTrunfo ? whenHasTrunfo : whenHasNotTrunfo }

        <button
          id="save-button"
          data-testid="save-button"
          name="saveBtn"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
