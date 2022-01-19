export const SET_LOGIN_INFO = 'SET_LOGIN_INFO';
export const ADD_FAVORITE_RECIPE = 'ADD_FAVORITE_RECIPE';
export const REMOVE_FAVORITE_RECIPE = 'REMOVE_FAVORITE_RECIPE';
export const START_MEAL_RECIPE = 'START_MEAL_RECIPE';
export const START_DRINK_RECIPE = 'START_DRINK_RECIPE';
export const CONCLUDE_MEAL_RECIPE = 'CONCLUDE_MEAL_RECIPE';
export const CONCLUDE_DRINK_RECIPE = 'CONCLUDE_DRINK_RECIPE';
export const CHECK_MEAL_RECIPE = 'CHECK_MEAL_RECIPE';
export const CHECK_DRINK_RECIPE = 'CHECK_DRINK_RECIPE';

const setLoginInfoAC = (userMail, userPassword) => ({
  type: SET_LOGIN_INFO,
  userMail,
  userPassword,
});

export const addFavoriteRecipeAC = (recipeObj) => ({
  type: ADD_FAVORITE_RECIPE,
  recipeObj,
});

export const removeFavoriteRecipeAC = (recipeId) => ({
  type: REMOVE_FAVORITE_RECIPE,
  recipeId,
});

export const startMealRecipeAC = (recipeId, ingArr) => ({
  type: START_MEAL_RECIPE,
  recipeId,
  ingArr,
});

export const startDrinkRecipeAC = (recipeId, ingArr) => ({
  type: START_DRINK_RECIPE,
  recipeId,
  ingArr,
});

export const concludeMealRecipeAC = (concludedMealRecipeObj, recipeId) => ({
  type: CONCLUDE_MEAL_RECIPE,
  concludedMealRecipeObj,
  recipeId,
});

export const concludeDrinkRecipeAC = (concludedDrinkRecipeObj, recipeId) => ({
  type: CONCLUDE_DRINK_RECIPE,
  concludedDrinkRecipeObj,
  recipeId,
});

export const checkMealRecipeAC = (recipeId, ing) => ({
  type: CHECK_MEAL_RECIPE,
  recipeId,
  ing,
});

export const checkDrinkRecipeAC = (recipeId, ing) => ({
  type: CHECK_DRINK_RECIPE,
  recipeId,
  ing,
});

export default setLoginInfoAC;
