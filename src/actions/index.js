import { UPDATE_AUTH_VALUE, UPDATE_IMG_VALUE } from './actionTypes';

export const updateJWT = value => ({
  type: UPDATE_AUTH_VALUE,
  userName: value.userName,
  userEmail: value.userEmail,
  userID: value.userID,
  userImg: value.userImg,
  userJWT: value.userJWT
});

export const updateImage = value => ({
  type: UPDATE_IMG_VALUE,
  userImg: value.userImg
});
