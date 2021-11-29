// Esse reducer será responsável por tratar as informações da pessoa usuária.
import { SET_LOGIN_INFO } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function user(state = INITIAL_STATE, action) { // Reducer responsável por armazenar o nome e o e-mail do usuário logado. Sua Action Creator é a setLoginInfoAC().
  switch (action.type) {
  case SET_LOGIN_INFO:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };

  default:
    return state;
  }
}

export default user;
