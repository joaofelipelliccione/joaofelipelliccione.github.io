import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProgressHeader from '../components/RecipesInProgress/ProgressHeader';
import ProgressIngredients from '../components/RecipesInProgress/ProgressIngredients';
import ProgressInstructions from '../components/RecipesInProgress/ProgressInstructions';
import ProgressFinishBtn from '../components/RecipesInProgress/ProgressFinishBtn';

export default function RecipesInProgress() {
  const { idReceita } = useParams();
  const location = useLocation();
  const currentPathName = location.pathname;
  const END_POINT_FOOD = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  const END_POINT_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  const [recipeInfo, setrecipeInfo] = useState({});
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [measureArr, setMeasureArr] = useState([]);
  const [mustRenderFinishBtn, setMustRenderFinishBtn] = React.useState(true);
  const favoriteRecipesArr = useSelector((state) => state.user.favoriteRecipes);

  const inProgressRecipesObj = useSelector((state) => state.user.inProgressRecipes);
  const doneRecipeArr = useSelector((state) => state.user.doneRecipes);

  // ==========================FETCH=====================================
  useEffect(() => {
    if (currentPathName.includes('comidas')) {
      fetch(END_POINT_FOOD)
        .then((response) => response.json())
        .then((data) => setrecipeInfo(data.meals[0]));
    }
    if (currentPathName.includes('bebidas')) {
      fetch(END_POINT_DRINK)
        .then((response) => response.json())
        .then((data) => setrecipeInfo(data.drinks[0]));
    }
  }, []);
  // ================================HEART-COLOR=======================================

  const [isColoredMeal, setIsColoredMeal] = useState(false);
  const [isColoredDrink, setIsColoredDrink] = useState(false);

  const changeColor = () => {
    if (currentPathName.includes('comidas')) {
      if (favoriteRecipesArr.some(({ id }) => id === idReceita)) {
        setIsColoredMeal(true);
      } else setIsColoredMeal(false);
    }
    if (currentPathName.includes('bebidas')) {
      if (favoriteRecipesArr.some(({ id }) => id === idReceita)) {
        setIsColoredDrink(true);
      } else setIsColoredDrink(false);
    }
  };

  React.useEffect(() => {
    changeColor();
  }, [favoriteRecipesArr]);

  React.useEffect(() => {
    changeColor();
  }, [idReceita]);

  // ==========================INGREDIENTS-LIST=====================================
  const filter = () => {
    const keysIngre = Object.keys(recipeInfo)
      .filter((item) => item.includes('strIngredient'));
    const keysMeasu = Object.keys(recipeInfo)
      .filter((item) => item.includes('strMeasure'));
    const ingredients = keysIngre.map((item) => recipeInfo[item])
      .filter((remove) => remove !== '' && remove !== null);
    const measure = keysMeasu.map((item) => recipeInfo[item]);

    setIngredientsArr(ingredients);
    setMeasureArr(measure);
  };

  useEffect(() => {
    filter();
  }, [recipeInfo]);
  // =======================================================================

  // ==========================FAVORITE-RECIPES-LS=====================================
  React.useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArr));
  }, [favoriteRecipesArr]);
  // ===============================================================================

  // ==========================IN-PROGRESS-RECIPES-LS=====================================
  React.useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesObj));
  }, [inProgressRecipesObj]);
  // ====================================================================================

  // ==========================RENDER OR NOT FINISH-BTN=====================================
  const verifyMealStatus = () => {
    const isRecipeDone = doneRecipeArr.some(({ id }) => id === idReceita);
    if (isRecipeDone) {
      setMustRenderFinishBtn(false);
    }
    if (!isRecipeDone) {
      setMustRenderFinishBtn(true);
    }
  };

  React.useEffect(() => {
    verifyMealStatus();
  }, [idReceita]);

  React.useEffect(() => {
    verifyMealStatus();
  }, []);

  // =======================================================================

  return (
    <section>
      <ProgressHeader
        recipeInfo={ recipeInfo }
        currentPathName={ currentPathName }
        isColoredMeal={ isColoredMeal }
        isColoredDrink={ isColoredDrink }
      />
      <ProgressIngredients
        ingredientsArr={ ingredientsArr }
        measureArr={ measureArr }
        idReceita={ idReceita }
        currentPathName={ currentPathName }
      />
      <ProgressInstructions
        recipeInfo={ recipeInfo }
        currentPathName={ currentPathName }
      />
      {mustRenderFinishBtn
      && <ProgressFinishBtn
        idReceita={ idReceita }
        currentPathName={ currentPathName }
        recipeInfo={ recipeInfo }
      />}
    </section>
  );
}
