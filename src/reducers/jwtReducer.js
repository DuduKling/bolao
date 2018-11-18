import { UPDATE_AUTH_VALUE } from '../actions/actionTypes';

const initialState = {
  userName: ''
};

export const jwtReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_VALUE:
      return {
        ...state,
        userName: action.userName
      };
    default:
      return state;
  }
}
