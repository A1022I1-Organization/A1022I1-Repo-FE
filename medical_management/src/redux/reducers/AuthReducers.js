import {
  GET_USER_LOGIN as GET_USER_LOGIN_ACCOUNT,
  LOG_IN_ACCOUNT,
  LOG_OUT,
  LOG_IN_OAUTH2,
  GET_USER_LOGIN_GOOGLE
} from "../Type";

export const authReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN_ACCOUNT:
      return payload;
    case LOG_OUT:
      return payload;
    case GET_USER_LOGIN_ACCOUNT:
      return payload;
    case GET_USER_LOGIN_GOOGLE:
      return payload;
    case LOG_IN_OAUTH2:
      return payload;
    default:
      return state;
  }
};
