import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
  render() {
    const { onInputChange, searchBoxData } = this.props;

    return(
      <div id="filtersContainer">
        <input
            id="searchBoxFilter"
            data-testid="name-filter"
            name="searchBoxData"
            type="text"
            value={ searchBoxData }
            onChange={ onInputChange }
          />
      </div>
    );
  }
}

export default Filters;
