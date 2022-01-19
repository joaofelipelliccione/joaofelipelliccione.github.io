// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteRecipeAC as addFavoriteRecipe,
  removeFavoriteRecipeAC as removeFavoriteRecipe } from '../../../redux/actions/userAC';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

export default function FavoriteBtn({ isColoredDrink, isColoredMeal,
  recipeInfo, currentPathName }) {
  // REDUX========
  const favoriteRecipesArr = useSelector((state) => state.user.favoriteRecipes);
  const dispatch = useDispatch();

  // FUNÇÕES FAVORITE
  const saveFavoriteBtnMeal = () => {
    const favoriteMealRecipeObj = {
      id: recipeInfo.idMeal,
      type: 'comida',
      area: recipeInfo.strArea,
      category: recipeInfo.strCategory,
      alcoholicOrNot: '',
      name: recipeInfo.strMeal,
      image: recipeInfo.strMealThumb,
    };

    const isThisMealFav = favoriteRecipesArr.some(({ id }) => id === recipeInfo.idMeal);

    if (!isThisMealFav) {
      dispatch(addFavoriteRecipe(favoriteMealRecipeObj));
    } else {
      dispatch(removeFavoriteRecipe(recipeInfo.idMeal));
    }
  };

  const saveFavoriteBtnDrink = () => {
    const favoriteDrinkRecipeObj = {
      id: recipeInfo.idDrink,
      type: 'bebida',
      area: '',
      category: recipeInfo.strCategory,
      alcoholicOrNot: recipeInfo.strAlcoholic,
      name: recipeInfo.strDrink,
      image: recipeInfo.strDrinkThumb,
    };

    const isThisDrinkFav = favoriteRecipesArr.some(({ id }) => id === recipeInfo.idDrink);

    if (!isThisDrinkFav) {
      dispatch(addFavoriteRecipe(favoriteDrinkRecipeObj));
    } else {
      dispatch(removeFavoriteRecipe(recipeInfo.idDrink));
    }
  };

  const onClickFavoriteBtn = () => {
    if (currentPathName.includes('comidas')) {
      saveFavoriteBtnMeal();
    }
    if (currentPathName.includes('bebidas')) {
      saveFavoriteBtnDrink();
    }
  };

  return (
    <div>
      {/* ========FAVORITE========= */}
      <div
        className="favoriteBtnContainer"
        onClick={ () => onClickFavoriteBtn() }
        onKeyDown={ () => onClickFavoriteBtn() }
        role="button"
        tabIndex={ 0 }
      >
        {currentPathName.includes('comidas')
          ? (
            <img
              data-testid="favorite-btn"
              src={ isColoredMeal ? blackHeartIcon : whiteHeartIcon }
              alt="Ícone de Favoritar"
            />)
          : (
            <img
              data-testid="favorite-btn"
              src={ isColoredDrink ? blackHeartIcon : whiteHeartIcon }
              alt="Ícone de Favoritar"
            />)}
      </div>
    </div>
  );
}

FavoriteBtn.propTypes = {
  isColoredDrink: PropTypes.bool.isRequired,
  isColoredMeal: PropTypes.bool.isRequired,
  currentPathName: PropTypes.string.isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};
