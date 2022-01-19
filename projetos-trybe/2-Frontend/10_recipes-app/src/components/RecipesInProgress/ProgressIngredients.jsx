import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { checkMealRecipeAC } from '../../redux/actions/userAC';

export default function ProgressIngredients({ ingredientsArr, measureArr,
  idReceita, currentPathName }) {
  const dispatch = useDispatch();

  const onCheckBoxChange = (recipeId, ing) => {
    if (currentPathName.includes('comida')) {
      dispatch(checkMealRecipeAC(recipeId, ing));
    }
  };

  return (
    <div>
      <h3>Ingredientes</h3>
      { ingredientsArr
        .map((ite, index) => (
          <div key={ ite }>
            <label
              className="checkIngredient"
              htmlFor={ ite }
              value={ ite }
              data-testid={ `${index}-ingredient-step` }
              onChange={ () => onCheckBoxChange(idReceita, ite) }
            >
              <input type="checkbox" id={ ite } />
              {`- ${ite} - ${measureArr[index]}`}
            </label>
          </div>))}
    </div>
  );
}

ProgressIngredients.propTypes = {
  ingredientsArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  measureArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  idReceita: PropTypes.string.isRequired,
  currentPathName: PropTypes.string.isRequired,
};
