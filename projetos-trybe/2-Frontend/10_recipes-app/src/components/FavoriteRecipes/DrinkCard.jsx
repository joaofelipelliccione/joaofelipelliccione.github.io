import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import ShareBtn from './FavoriteRecipeShareBtn';
import BtnFavoriteRecipe from './BtnFavoriteRecipe';

export default function DrinkCard({ favoriteRecipesArray }) {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <div>
      {favoriteRecipesArray.map((rec, index) => (
        rec.type === 'bebida'
        && (
          <div key={ index }>
            <Link
              to={ `/bebidas/${rec.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ rec.image }
                alt="Imagem da Receita"
                width="160px"
              />
            </Link>
            <h4 data-testid={ `${index}-horizontal-top-text` }>{rec.alcoholicOrNot}</h4>
            <Link
              to={ `/bebidas/${rec.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {rec.name}
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{rec.doneDate}</p>
            <ShareBtn
              index={ index }
              recipeId={ rec.id }
              type={ rec.type }
              currentPathName={ currentPathName }
            />
            <BtnFavoriteRecipe
              recipeId={ rec.id }
              index={ index }
            />
          </div>)
      ))}
    </div>
  );
}

DrinkCard.propTypes = {
  favoriteRecipesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
