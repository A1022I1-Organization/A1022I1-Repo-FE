import {
  GET_USER_LOGIN,
  LOG_IN_ACCOUNT,
  LOG_OUT,
  LOG_IN_OAUTH2,
} from "../Type";

export const authReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN_ACCOUNT:
      return payload;
    case LOG_OUT:
      return payload;
    case GET_USER_LOGIN:
      return payload;
    case LOG_IN_OAUTH2:
      return payload;
    default:
      return state;
  }
};
