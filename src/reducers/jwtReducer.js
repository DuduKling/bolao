import { UPDATE_AUTH_VALUE, UPDATE_IMG_VALUE } from '../actions/actionTypes';

const initialState = {
  userName: "",
  userEmail: "",
  userID: "",
  userImg: "",
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
        userImg: action.userImg,
        userJWT: action.userJWT
      };
    case UPDATE_IMG_VALUE:
      return {
        ...state,
        userImg: action.userImg
      };
    default:
      return state;
  }
}
