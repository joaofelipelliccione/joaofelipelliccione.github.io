import React from 'react';
import PropTypes from 'prop-types';

function RecipesMadeFilters({ setSelectFilter }) {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setSelectFilter('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setSelectFilter('Food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setSelectFilter('Drinks') }
      >
        Drinks
      </button>
    </div>
  );
}

RecipesMadeFilters.propTypes = {
  setSelectFilter: PropTypes.func.isRequired,
};

export default RecipesMadeFilters;
