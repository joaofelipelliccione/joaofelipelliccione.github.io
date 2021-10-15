import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
  render() {
    const { onInputChange, searchBoxData, rarityFilter } = this.props;

    return(
      <div id="filtersContainer">
        <h4>Filtros</h4>
        <input
            name="searchBoxData"
            type="text"
            value={ searchBoxData }
            onChange={ onInputChange }
            placeholder="Nome da carta..."
          />
          <select
            name="rarityFilter"
            value={ rarityFilter }
            onChange={ onInputChange }
          >
            <option>Todas</option>
            <option>Normal</option>
            <option>Raro</option>
            <option>Muito Raro</option>
          </select>
      </div>
    );
  }
}

Filters.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  searchBoxData: PropTypes.string.isRequired,
  rarityFilter: PropTypes.string.isRequired,
};

export default Filters;
