import React from 'react';
import PropTypes from 'prop-types';

export default function FavoriteRecipesFilters({ setSelectFilter }) {
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

FavoriteRecipesFilters.propTypes = {
  setSelectFilter: PropTypes.func.isRequired,
};
