import { jwtReducer } from './jwtReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  AuthJWTState: jwtReducer
});
