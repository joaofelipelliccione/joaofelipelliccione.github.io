import React, {} from 'react';
import PropTypes from 'prop-types';
import FavoriteBtn from '../FoodOrDrinksDetailsComponents/Header/FavoriteBtn';
import ShareBtn from '../FoodOrDrinksDetailsComponents/Header/ShareBtn';

export default function ProgressHeader({ isColoredDrink,
  isColoredMeal, recipeInfo, currentPathName }) {
  return (
    <header>
      <div>
        {currentPathName.includes('comidas')
          ? (
            <img
              width="250px"
              data-testid="recipe-photo"
              src={ recipeInfo.strMealThumb }
              alt="Food Recipe"
            />)
          : (
            <img
              width="250px"
              data-testid="recipe-photo"
              src={ recipeInfo.strDrinkThumb }
              alt="Drink Recipe"
            />)}
        {currentPathName.includes('comidas')
          ? <h1 data-testid="recipe-title">{ recipeInfo.strMeal }</h1>
          : <h1 data-testid="recipe-title">{ recipeInfo.strDrink }</h1>}
        {currentPathName.includes('comidas')
          ? <h3 data-testid="recipe-category">{ recipeInfo.strCategory }</h3>
          : <h3 data-testid="recipe-category">{ recipeInfo.strAlcoholic }</h3>}
      </div>
      <FavoriteBtn
        recipeInfo={ recipeInfo }
        currentPathName={ currentPathName }
        isColoredDrink={ isColoredDrink }
        isColoredMeal={ isColoredMeal }
      />
      <ShareBtn
        currentPathName={ currentPathName }
      />
    </header>
  );
}

ProgressHeader.propTypes = {
  currentPathName: PropTypes.string.isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  isColoredDrink: PropTypes.bool.isRequired,
  isColoredMeal: PropTypes.bool.isRequired,
};
