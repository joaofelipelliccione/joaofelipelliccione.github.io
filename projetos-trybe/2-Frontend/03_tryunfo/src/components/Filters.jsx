import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
  render() {
    const { onInputChange, searchBoxData, rarityFilter } = this.props;

    return(
      <div id="filtersContainer">
        <input
            id="searchBoxFilter"
            name="searchBoxData"
            type="text"
            value={ searchBoxData }
            onChange={ onInputChange }
          />
          <select
            id="raritySelectFilter"
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
