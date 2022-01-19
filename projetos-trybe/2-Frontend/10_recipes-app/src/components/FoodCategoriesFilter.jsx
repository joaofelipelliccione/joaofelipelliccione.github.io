import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals as fetchMealsThunk } from '../redux/actions/apiAC';

function FoodCategoriesFilter({ setIsCategoryPressed }) {
  const mealsCategoriesArr = useSelector((state) => state.foodsAndDrinks.mealsCategories);
  const four = 4;
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = React.useState('');

  const onFoodCategoryClick = ({ target }) => {
    const pressedCategory = target.innerHTML;

    if (pressedCategory !== currentCategory) {
      setCurrentCategory(pressedCategory);
      setIsCategoryPressed(true);
      dispatch(fetchMealsThunk(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${pressedCategory}`));
    }

    if (pressedCategory === currentCategory) {
      setCurrentCategory('');
      setIsCategoryPressed(false);
      dispatch(fetchMealsThunk('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    }
  };

  const onAllCategoryClick = () => {
    setCurrentCategory('');
    dispatch(fetchMealsThunk('https://www.themealdb.com/api/json/v1/1/search.php?s='));
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
      {mealsCategoriesArr.filter((_mealCat, i) => (i <= four))
        .map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            onClick={ (e) => onFoodCategoryClick(e) }
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
}

FoodCategoriesFilter.propTypes = {
  setIsCategoryPressed: PropTypes.func.isRequired,
};

export default FoodCategoriesFilter;
