import { combineReducers } from 'redux';
import user from './user';
import foodsAndDrinks from './foodsAndDrinks';

const rootReducer = combineReducers({ user, foodsAndDrinks });

export default rootReducer;
