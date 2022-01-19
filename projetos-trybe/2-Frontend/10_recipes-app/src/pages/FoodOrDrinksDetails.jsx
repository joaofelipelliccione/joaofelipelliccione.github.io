import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FDDetailsHeader
  from '../components/FoodOrDrinksDetailsComponents/Header/FDDetailsHeader';
import FDDetailsIngredients
  from '../components/FoodOrDrinksDetailsComponents/FDDetailsIngredients';
import FDDetailsInstructions
  from '../components/FoodOrDrinksDetailsComponents/FDDetailsInstructions';
import FDDetailsRecommended
  from '../components/FoodOrDrinksDetailsComponents/FDDetailsRecommended';
import FDDetailsVideo
  from '../components/FoodOrDrinksDetailsComponents/FDDetailsVideo';
import '../styles/FoodOrDrinksDetails.css';
import FDDetailsStartBtn
  from '../components/FoodOrDrinksDetailsComponents/FDDetailsStartBtn';

function FoodOrDrinksDetails() {
  const { idReceita } = useParams();
  const location = useLocation();
  const currentPathName = location.pathname;
  const startRecipe = 'Iniciar Receita';
  const continueRecipe = 'Continuar Receita';

  const END_POINT_FOOD_FILTER_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  const END_POINT_DRINK_FILTER_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  const END_POINT_FOOD_RANDOM = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const END_POINT_DRINK_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const [recipeInfo, setRecipeInfo] = React.useState({});
  const [ingredientsArr, setIngredientsArr] = React.useState([]);
  const [measureArr, setMeasureArr] = React.useState([]);
  const [recommendedFD, setRecommendedFD] = React.useState([]);
  const [startBtnStatus, setStartBtnStatus] = React.useState(startRecipe);
  const [mustRenderStartBtn, setMustRenderStartBtn] = React.useState(true);

  const favoriteRecipesArr = useSelector((state) => state.user.favoriteRecipes);
  const inProgressRecipesObj = useSelector((state) => state.user.inProgressRecipes);
  const doneRecipeArr = useSelector((state) => state.user.doneRecipes);

  // ==========================HEART-COLOR=====================================
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
  // =======================================================================

  // ==========================FETCH=====================================
  React.useEffect(() => {
    if (currentPathName.includes('comidas')) {
      fetch(END_POINT_FOOD_FILTER_ID)
        .then((response) => response.json())
        .then((data) => setRecipeInfo(data.meals[0]));
    }
    if (currentPathName.includes('bebidas')) {
      fetch(END_POINT_DRINK_FILTER_ID)
        .then((response) => response.json())
        .then((data) => setRecipeInfo(data.drinks[0]));
    }
  }, [idReceita]);

  React.useEffect(() => {
    if (currentPathName.includes('comidas')) {
      fetch(END_POINT_DRINK_RANDOM)
        .then((response) => response.json())
        .then((data) => setRecommendedFD(data.drinks));
    }
    if (currentPathName.includes('bebidas')) {
      fetch(END_POINT_FOOD_RANDOM)
        .then((response) => response.json())
        .then((data) => setRecommendedFD(data.meals));
    }
  }, [idReceita]);
  // =======================================================================

  // ==========================INGREDIENTS-LIST=====================================
  const filter = () => {
    const keysIngre = Object.keys(recipeInfo)
      .filter((item) => item.includes('strIngredient'));
    const keysMeasu = Object.keys(recipeInfo)
      .filter((item) => item.includes('strMeasure'));
    const ingredients = keysIngre.map((item) => recipeInfo[item])
      .filter((ing) => ing !== '' && ing !== null);
    const measure = keysMeasu.map((item) => recipeInfo[item]);

    setIngredientsArr(ingredients);
    setMeasureArr(measure);
  };

  React.useEffect(() => {
    filter();
  }, [recipeInfo]);
  // =======================================================================

  // ==========================FAVORITE-RECIPES-LS=====================================
  React.useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArr));
  }, [favoriteRecipesArr]);
  // =======================================================================

  // ==========================RENDER OR NOT START/CONTINUE-BTN=====================================
  const verifyMealStatus = () => {
    const isMealRecipeDone = doneRecipeArr.some(({ id }) => id === idReceita);
    const isMealRecipeInProgress = inProgressRecipesObj.meals[idReceita];

    if (isMealRecipeDone) {
      setMustRenderStartBtn(false);
    }
    if (!isMealRecipeDone) {
      setMustRenderStartBtn(true);
      if (isMealRecipeInProgress) {
        setStartBtnStatus(continueRecipe);
      } else {
        setStartBtnStatus(startRecipe);
      }
    }
  };

  const verifyDrinkStatus = () => {
    const isMealRecipeDone = doneRecipeArr.some(({ id }) => id === idReceita);
    const isDrinkRecipeInProgress = inProgressRecipesObj.cocktails[idReceita];

    if (isMealRecipeDone) {
      setMustRenderStartBtn(false);
    }
    if (!isMealRecipeDone) {
      setMustRenderStartBtn(true);
      if (isDrinkRecipeInProgress) {
        setStartBtnStatus(continueRecipe);
      } else {
        setStartBtnStatus(startRecipe);
      }
    }
  };

  React.useEffect(() => {
    if (currentPathName.includes('comidas')) {
      verifyMealStatus();
    }
    if (currentPathName.includes('bebidas')) {
      verifyDrinkStatus();
    }
  }, [idReceita]);

  React.useEffect(() => {
    if (currentPathName.includes('bebidas')) {
      verifyDrinkStatus();
    }
    if (currentPathName.includes('comidas')) {
      verifyMealStatus();
    }
  }, []);

  // =======================================================================

  return (
    <div>
      <FDDetailsHeader
        recipeInfo={ recipeInfo }
        currentPathName={ currentPathName }
        isColoredMeal={ isColoredMeal }
        isColoredDrink={ isColoredDrink }
      />
      <FDDetailsIngredients
        ingredientsArr={ ingredientsArr }
        measureArr={ measureArr }
      />
      <FDDetailsInstructions recipeInfo={ recipeInfo } />
      {currentPathName.includes('comidas')
      && (
        <FDDetailsVideo
          recipeInfo={ recipeInfo }
          currentPathName={ currentPathName }
        />)}
      <FDDetailsRecommended
        recommendedFD={ recommendedFD }
        currentPathName={ currentPathName }
      />
      {mustRenderStartBtn
        && <FDDetailsStartBtn
          startBtnStatus={ startBtnStatus }
          setStartBtnStatus={ setStartBtnStatus }
          currentPathName={ currentPathName }
          idReceita={ idReceita }
          ingredientsArr={ ingredientsArr }
        />}
    </div>
  );
}

export default FoodOrDrinksDetails;
