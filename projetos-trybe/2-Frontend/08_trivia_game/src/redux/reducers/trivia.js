// Esse reducer será responsável por tratar as informações do jogo.
import {
  GET_TOKEN_SUCCESS,
  API_REQUEST_ERROR,
  GET_QUESTIONS_SUCCESS,
  CORRECT_ANSWER,
  CLEAN_SCORE,
} from '../action';

const INITIAL_STATE = {
  token: '',
  questions: [],
  assertions: 0,
  score: 0,
  errorMsg: null,
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
    };

  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload.results,
    };

  case API_REQUEST_ERROR:
    return {
      ...state,
      errorMsg: action.errorMsg,
    };

  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: Number(Number(state.assertions) + 1),
      score: Number(Number(action.roundScore) + Number(state.score)),
    };

  case CLEAN_SCORE:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };

  default:
    return state;
  }
}

export default triviaReducer;
