import { UPDATE_AUTH_VALUE } from './actionTypes';

export const updateJWT = value => ({
  type: UPDATE_AUTH_VALUE,
  userName: value.userName,
  userEmail: value.userEmail,
  userID: value.userID,
  userJWT: value.userJWT
});
