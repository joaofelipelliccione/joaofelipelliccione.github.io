import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import fetchDrinks from '../redux/actions/apiAC';

function DrinkCategoriesFilter({ setIsCategoryPressed }) {
  const drinksCategArray = useSelector((state) => state.foodsAndDrinks.drinksCategories);
  const four = 4;
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = React.useState('');

  const onDrinkCategoryClick = ({ target }) => {
    const pressedCategory = target.innerHTML;

    if (pressedCategory !== currentCategory) {
      setCurrentCategory(pressedCategory);
      setIsCategoryPressed(true);
      dispatch(fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${pressedCategory}`));
    }

    if (pressedCategory === currentCategory) {
      setCurrentCategory('');
      setIsCategoryPressed(false);
      dispatch(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
    }
  };

  const onAllCategoryClick = () => {
    setCurrentCategory('');
    dispatch(fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));
  };

  return (
    <div className="foodCategoriesFilterContainer">
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => onAllCategoryClick() }
      >
        All
      </button>
      {drinksCategArray.filter((_drinkCat, i) => (i <= four))
        .map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            onClick={ (e) => onDrinkCategoryClick(e) }
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
}

DrinkCategoriesFilter.propTypes = {
  setIsCategoryPressed: PropTypes.func.isRequired,
};

export default DrinkCategoriesFilter;
