import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import FavoriteRecipeShareBtn from './FavoriteRecipeShareBtn';
import BtnFavoriteRecipe from './BtnFavoriteRecipe';

export default function MealCard({ favoriteRecipesArray }) {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <div>
      { favoriteRecipesArray.map((rec, index) => (
        rec.type === 'comida'
        && (
          <div key={ rec.id }>
            <Link
              to={ `/comidas/${rec.id}` }
            >
              <img
                src={ rec.image }
                alt="Imagem da Receita"
                data-testid={ `${index}-horizontal-image` }
                width="160px"
              />
            </Link>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${rec.area} - ${rec.category}`}
            </h4>
            <Link
              to={ `/comidas/${rec.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {rec.name}
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{rec.doneDate}</p>
            <FavoriteRecipeShareBtn
              index={ index }
              recipeId={ rec.id }
              type={ rec.type }
              currentPathName={ currentPathName }
            />
            <BtnFavoriteRecipe
              recipeId={ rec.id }
              index={ index }
            />
          </div>
        )
      )) }
    </div>
  );
}

MealCard.propTypes = {
  favoriteRecipesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
