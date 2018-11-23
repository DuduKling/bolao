import { UPDATE_AUTH_VALUE } from '../actions/actionTypes';

const initialState = {
  userName: "",
  userEmail: "",
  userID: "",
  userJWT: ""
};

export const jwtReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_VALUE:
      return {
        ...state,
        userName: action.userName,
        userEmail: action.userEmail,
        userID: action.userID,
        userJWT: action.userJWT
      };
    default:
      return state;
  }
}
