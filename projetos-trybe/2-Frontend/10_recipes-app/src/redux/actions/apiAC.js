// Importando função responsável pela realização do fetch() de 'meals' e de 'drinks'.
// Importando função responsável pela realização do fetch() de 'mealsCategories' e de 'drinksCategories'.
import mealsAndDrinksAPI, { getCategoriesAPI } from '../../services/mealsAndDrinksAPI';

/* Desenvolvendo a loadingAC(), a 1ª Action Creator tradicional.
- A função dela é alterar a key 'loading' para true, sempre que uma requisição for iniciada.
- Ela altera o estado do switch-case 'START_REQUEST_API' e, consequentemente, da Store.
*/
export const START_REQUEST_API = 'START_REQUEST_API';
const loadingAC = () => ({ type: START_REQUEST_API });

/* Desenvolvendo a fetchMealsSuccessAC(), a 2ª Action Creator tradicional.
- A função dela é alterar a key 'loading' para false, a key 'error' para null e preencher a key 'meals' com o conteúdo retornado da API.
*/
export const MEALS_API_SUCCESS = 'MEALS_API_SUCCESS';
const fetchMealsSuccessAC = (mealsArray) => ({ type: MEALS_API_SUCCESS, mealsArray });

/* Desenvolvendo a fetchDrinksSuccessAC(), a 3ª Action Creator tradicional.
- A função dela é alterar a key 'loading' para false, a key 'error' para null e preencher a key 'drinks' com o conteúdo retornado da API.
*/
export const DRINKS_API_SUCCESS = 'DRINKS_API_SUCCESS';
const fetchDrinksSuccessAC = (drinksArray) => ({ type: DRINKS_API_SUCCESS, drinksArray });

/* Desenvolvendo a fetchMealsCategoriesSuccessAC(), a 5ª Action Creator tradicional.
- A função dela é alterar a key 'loading' para false, a key 'error' para null e preencher a key 'mealsCategories' com o conteúdo retornado da API.
*/
export const MEALS_CATEGORIES_API_SUCCESS = 'MEALS_CATEGORIES_API_SUCCESS';
const fetchMealsCategoriesSuccessAC = (mealsCategoriesArray) => (
  { type: MEALS_CATEGORIES_API_SUCCESS, mealsCategoriesArray }
);

/* Desenvolvendo a fetchDrinksCategoriesSuccessAC(), a 6ª Action Creator tradicional.
- A função dela é alterar a key 'loading' para false, a key 'error' para null e preencher a key 'drinksCategories' com o conteúdo retornado da API.
*/
export const DRINKS_CATEGORIES_API_SUCCESS = 'DRINKS_CATEGORIES_API_SUCCESS';
const fetchDrinksCategoriesSuccessAC = (drinksCategoriesArray) => (
  { type: DRINKS_CATEGORIES_API_SUCCESS, drinksCategoriesArray }
);

/* Desenvolvendo a erroAC(), a 4ª Action Creator tradicional.
- A função dela é alterar a key 'loading' para false e a key 'erro' para uma mensagem de erro.
*/
export const API_ERROR = 'API_ERROR';
const erroAC = (errorMsg) => ({ type: API_ERROR, errorMsg });

/* Desenvolvendo a fetchMeals(), a 1ª Action Creator Thunk.
- É uma AC que retornará uma função e não um objeto.
- A função retornada, engloba a mealsAndDrinksAPI() e a 1ª, 2ª e 4ª Actions Creators tradicionais.
*/
export const fetchMeals = (END_POINT) => async (dispatch) => {
  dispatch(loadingAC());
  try {
    const responseAPI = await mealsAndDrinksAPI(END_POINT);
    const mealsObj = responseAPI.meals;
    if (mealsObj === null) {
      throw new Error('No meals found.');
    }
    dispatch(fetchMealsSuccessAC(mealsObj));
  } catch (e) {
    dispatch(erroAC(e.message));
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
};

/* Desenvolvendo a fetchDrinks(), a 2ª Action Creator Thunk.
- É uma AC que retornará uma função e não um objeto.
- A função retornada, engloba a mealsAndDrinksAPI() e a 1ª, 3ª e 4ª Actions Creators tradicionais.
*/
const fetchDrinks = (END_POINT) => async (dispatch) => {
  dispatch(loadingAC());
  try {
    const responseAPI = await mealsAndDrinksAPI(END_POINT);
    const drinksObj = responseAPI.drinks;
    if (drinksObj === null) {
      throw new Error('No drinks found.');
    }
    dispatch(fetchDrinksSuccessAC(drinksObj));
  } catch (e) {
    dispatch(erroAC(e.message));
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
};

/* Desenvolvendo a fetchCategoriesMeals(), a 3ª Action Creator Thunk.
- É uma AC que retornará uma função e não um objeto.
- A função retornada, engloba a getCategoriesAPI() e a 1ª, 2ª e 5ª Actions Creators tradicionais.
*/
export const fetchCategoriesMeals = (END_POINT) => async (dispatch) => {
  dispatch(loadingAC());
  try {
    const responseAPI = await getCategoriesAPI(END_POINT);
    const mealsCategoriesArray = responseAPI.meals;
    dispatch(fetchMealsCategoriesSuccessAC(mealsCategoriesArray));
  } catch (e) {
    dispatch(erroAC(e));
  }
};

/* Desenvolvendo a fetchCategoriesDrinks(), a 4ª Action Creator Thunk.
- É uma AC que retornará uma função e não um objeto.
- A função retornada, engloba a getCategoriesAPI() e a 1ª, 2ª e 6ª Actions Creators tradicionais.
*/
export const fetchCategoriesDrinks = (END_POINT) => async (dispatch) => {
  dispatch(loadingAC());
  try {
    const responseAPI = await getCategoriesAPI(END_POINT);
    const drinksCategoriesArray = responseAPI.drinks;
    dispatch(fetchDrinksCategoriesSuccessAC(drinksCategoriesArray));
  } catch (e) {
    dispatch(erroAC(e));
  }
};

export default fetchDrinks;
