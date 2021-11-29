import { getTokenTriviaAPI, getQuestionsTriviaAPI } from '../../services/triviaApi';

/*
Criação da 1ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a user().
*/
export const SET_LOGIN_INFO = 'SET_LOGIN_INFO';
export const setLoginInfoAC = (name, email) => ({
  type: SET_LOGIN_INFO,
  name,
  email,
});

/*
Criação da 2ª Action Creator. Essa, será chamada dentro do thunk fetchTriviaToken().
- Sua reducer é a trivia().
*/
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
const getTokenAC = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

/*
Criação da 3ª Action Creator. Essa, será chamada dentro do thunk fetchTriviaToken() e do thunk fetchTriviaQuestions().
- Sua reducer é a trivia().
*/
export const API_REQUEST_ERROR = 'API_REQUEST_ERROR';
const apiRequestErrorAc = (errorMsg) => ({ type: API_REQUEST_ERROR, errorMsg });

/*
Criação da 1ª Action Creator Thunk.
- É uma AC especial, que retornará uma função e não um objeto como de costume.
- A função retornada engloba a getTokenTriviaAPI() e as AC 2 e 3, mencionadas acima.
*/
export const fetchTriviaToken = () => async (dispatch) => {
  try { // Tentando realizar o fetch();
    const objResponse = await getTokenTriviaAPI();
    if (objResponse === undefined) {
      throw new Error(); // Caso o retorno da API não seja o esperado, um erro será lançado.
    }
    dispatch(getTokenAC(objResponse)); // Mesmo se o retorno não for o esperado, o dispatch da getTokenAC() ocorrerá, entretanto, irei saber que o erro ocorreu.
  } catch (e) { // Capturando o erro lançado acima, caso ele exista.
    dispatch(apiRequestErrorAc(e));
  }
};

/*
Criação da 4ª Action Creator. Essa, será chamada dentro do thunk fetchTriviaQuestions().
- Sua reducer é a trivia().
*/
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
const getQuestionsAC = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

/*
Criação da 2ª Action Creator Thunk.
- É uma AC especial, que retornará uma função e não um objeto como de costume.
- A função retornada engloba a getQuestionsTriviaAPI() e as AC 3 e 5, mencionadas acima.
*/
export const fetchTriviaQuestions = (token) => async (dispatch) => {
  try { // Tentando realizar o fetch();
    const objResponse = await getQuestionsTriviaAPI(token);
    if (objResponse === undefined || objResponse.response_code !== 0) {
      throw new Error(); // Caso o retorno da API não seja o esperado, um erro será lançado.
    }
    dispatch(getQuestionsAC(objResponse)); // Mesmo se o retorno não for o esperado, o dispatch da getTokenAC() ocorrerá, entretanto, irei saber que o erro ocorreu.
  } catch (e) { // Capturando o erro lançado acima, caso ele exista.
    dispatch(apiRequestErrorAc(e));
  }
};

/*
Criação da 5ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a trivia().
*/
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
const correctAnsInfoAC = (roundScore) => ({
  type: CORRECT_ANSWER,
  roundScore,
});

/*
Criação da 6ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a trivia().
*/
export const CLEAN_SCORE = 'CLEAN_SCORE';
export const cleanScoreAC = () => ({
  type: CLEAN_SCORE,
});

export default correctAnsInfoAC;
