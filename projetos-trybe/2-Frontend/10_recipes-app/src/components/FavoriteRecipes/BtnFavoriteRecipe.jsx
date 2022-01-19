// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeFavoriteRecipeAC as removeFavoriteRecipe }
  from '../../redux/actions/userAC';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function BtnFavoriteRecipe({ recipeId, index }) {
  const dispatch = useDispatch();

  const onClickFavoriteBtn = () => {
    dispatch(removeFavoriteRecipe(recipeId));
  };

  return (
    <div>
      <div
        className="favoriteBtnContainer"
        onClick={ () => onClickFavoriteBtn() }
        onKeyDown={ () => onClickFavoriteBtn() }
        role="button"
        tabIndex={ 0 }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="Ícone de Favoritar"
        />
      </div>
    </div>
  );
}

BtnFavoriteRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
