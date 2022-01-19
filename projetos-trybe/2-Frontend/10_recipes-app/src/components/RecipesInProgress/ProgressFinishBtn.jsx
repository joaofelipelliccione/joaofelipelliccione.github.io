import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { concludeMealRecipeAC, concludeDrinkRecipeAC } from '../../redux/actions/userAC';

function ProgressFinishBtn({ currentPathName,
  idReceita, recipeInfo }) {
  const history = useHistory();
  const dispatch = useDispatch();

  // ==========================DATA-CONCLUSÃO-RECEITA=====================
  const getDateOfConclusion = () => {
    const completeDate = new Date(); // Thu Dec 09 2021 08:22:25 GMT-0300 (Horário Padrão de Brasília).
    const day = String(completeDate.getDate()).padStart(2, '0'); // Caso seja dia 1 à 9, um 0 será adicionado. Resultado: 01, 02, 03....
    const month = String(completeDate.getMonth() + 1).padStart(2, '0'); // Caso seja mês 1 à 9, um 0 será adicionado. Resultado: 01, 02, 03....
    const year = completeDate.getFullYear(); // 2021
    return `${day}/${month}/${year}`;
  };
  // =======================================================================

  // ==========================DONE-RECIPES-REDUX=====================
  const concludeRecipeClick = () => {
    if (currentPathName.includes('comidas')) {
      const concludedMealObj = {
        id: idReceita,
        type: 'comida',
        area: recipeInfo.strArea,
        category: recipeInfo.strCategory,
        alcoholicOrNot: '',
        name: recipeInfo.strMeal,
        image: recipeInfo.strMealThumb,
        doneDate: getDateOfConclusion(),
        tags: recipeInfo.strTags.split(','),
      };

      dispatch(concludeMealRecipeAC(concludedMealObj, idReceita));
      history.push('/receitas-feitas');
    }
    if (currentPathName.includes('bebidas')) {
      const concludedDrinkObj = {
        id: idReceita,
        type: 'bebida',
        area: '',
        category: recipeInfo.strCategory,
        alcoholicOrNot: recipeInfo.strAlcoholic,
        name: recipeInfo.strDrink,
        image: recipeInfo.strDrinkThumb,
        doneDate: getDateOfConclusion(),
        tags: [],
      };

      dispatch(concludeDrinkRecipeAC(concludedDrinkObj, idReceita));
      history.push('/receitas-feitas');
    }
  };
  // =======================================================================

  return (
    <button
      onClick={ () => concludeRecipeClick() }
      className="startRecipeBtn"
      data-testid="finish-recipe-btn"
      type="button"
    >
      Finalizar Receita
    </button>
  );
}

ProgressFinishBtn.propTypes = {
  currentPathName: PropTypes.string.isRequired,
  idReceita: PropTypes.string.isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProgressFinishBtn;
