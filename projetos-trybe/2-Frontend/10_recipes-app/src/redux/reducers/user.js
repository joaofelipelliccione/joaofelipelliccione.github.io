import { SET_LOGIN_INFO,
  ADD_FAVORITE_RECIPE,
  REMOVE_FAVORITE_RECIPE,
  START_MEAL_RECIPE,
  START_DRINK_RECIPE,
  CONCLUDE_MEAL_RECIPE,
  CONCLUDE_DRINK_RECIPE,
  CHECK_MEAL_RECIPE,
  CHECK_DRINK_RECIPE,
} from '../actions/userAC';

const INITIAL_STATE = {
  userMail: '',
  userPassword: '',
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} },
  inProgressRecipesChecked: JSON.parse(localStorage.getItem('inProgressRecipesChecked'))
  || { cocktails: {}, meals: {} },
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_LOGIN_INFO:
    return {
      ...state,
      userMail: action.userMail,
      userPassword: action.userPassword,
    };

  case ADD_FAVORITE_RECIPE:
    return {
      ...state,
      favoriteRecipes: [...state.favoriteRecipes, action.recipeObj],
    };

  case REMOVE_FAVORITE_RECIPE:
    return {
      ...state,
      favoriteRecipes: [...state.favoriteRecipes
        .filter(({ id }) => (id !== action.recipeId))],
    };

  case START_MEAL_RECIPE:
    return {
      ...state,
      inProgressRecipes: {
        cocktails: { ...state.inProgressRecipes.cocktails },
        meals: {
          ...state.inProgressRecipes.meals,
          [action.recipeId]: action.ingArr,
        },
      },
    };

  case START_DRINK_RECIPE:
    return {
      ...state,
      inProgressRecipes: {
        cocktails: {
          ...state.inProgressRecipes.cocktails,
          [action.recipeId]: action.ingArr,
        },
        meals: { ...state.inProgressRecipes.meals },
      },
    };

  case CONCLUDE_MEAL_RECIPE:
    return {
      ...state,
      doneRecipes: [...state.doneRecipes, action.concludedMealRecipeObj],
      inProgressRecipes: {
        cocktails: { ...state.inProgressRecipes.cocktails },
        meals: {
          ...Object.entries(state.inProgressRecipes.meals)
            .filter((microArr) => microArr[0] !== action.recipeId),
        },
      },
    };

  case CONCLUDE_DRINK_RECIPE:
    return {
      ...state,
      doneRecipes: [...state.doneRecipes, action.concludedDrinkRecipeObj],
      inProgressRecipes: {
        cocktails: {
          ...Object.entries(state.inProgressRecipes.cocktails)
            .filter((microArr) => microArr[0] !== action.recipeId),
        },
        meals: { ...state.inProgressRecipes.meals },
      },
    };

  case CHECK_MEAL_RECIPE: // REFAZER LÓGICA
    return {
      ...state,
      inProgressRecipesChecked: {
        cocktails: { ...state.inProgressRecipesChecked.cocktails },
        meals: {
          ...state.inProgressRecipesChecked.meals,
          checked: { ...state.inProgressRecipesChecked.meals.checked,
            [action.recipeId]: [action.ing] },
        },
      },
    };

  case CHECK_DRINK_RECIPE: // REFAZER LÓGICA
    return {
      ...state,
      inProgressRecipesChecked: {
        cocktails: {
          ...state.inProgressRecipesChecked.cocktails,
          checked: { ...state.inProgressRecipesChecked.cocktails.checked,
            [action.recipeId]: [action.ing] },
        },
        meals: { ...state.inProgressRecipesChecked.meals },
      },
    };

  default:
    return state;
  }
}

export default user;
