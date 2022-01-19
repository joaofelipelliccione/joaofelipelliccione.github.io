import React from 'react';
import PropTypes from 'prop-types';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

function FDDetailsHeader({ isColoredDrink, isColoredMeal, recipeInfo, currentPathName }) {
  return (
    <header>
      <div>
        {currentPathName.includes('comidas')
          ? (
            <img
              data-testid="recipe-photo"
              width="250px"
              src={ recipeInfo.strMealThumb }
              alt="Food Recipe"
            />)
          : (
            <img
              data-testid="recipe-photo"
              width="250px"
              src={ recipeInfo.strDrinkThumb }
              alt="Drink Recipe"
            />)}
        {currentPathName.includes('comidas')
          ? <h1 data-testid="recipe-title">{recipeInfo.strMeal}</h1>
          : <h1 data-testid="recipe-title">{recipeInfo.strDrink}</h1>}
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

FDDetailsHeader.propTypes = {
  isColoredDrink: PropTypes.bool.isRequired,
  isColoredMeal: PropTypes.bool.isRequired,
  currentPathName: PropTypes.string.isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FDDetailsHeader;
