import * as securityService from "../../services/security_service/securityService";
import {
  GET_USER_LOGIN,
  LOG_IN_ACCOUNT,
  LOG_IN_OAUTH2,
  LOG_OUT,
} from "../Type";

export const loginByAccount = (account) => async (dispatch) => {
  const JwtAccount = await securityService.loginByAccount(account);
  if (JwtAccount === undefined) {
    return undefined;
  } else {
    const token = JwtAccount.token;

    localStorage.setItem("token", token);
    localStorage.setItem(
      "username",
      JwtAccount.accountRole.appAccount.username
    );

    dispatch({
      type: LOG_IN_ACCOUNT,
      payload: JwtAccount,
    });
    return "OK";
  }
};

export const loginByOauth2 = (data) => async (dispatch) => {
  dispatch({
    type: LOG_IN_OAUTH2,
    payload: data,
  });
};

export const logOut = (token) => async (dispatch) => {
  await securityService.logOut(token);
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  dispatch({
    type: LOG_OUT,
    payload: null,
  });
};

export const getUserLogin = (token, username) => async (dispatch) => {
  const accountLogin = await securityService.getUserLogin(token, username);
  console.log(accountLogin);
  dispatch({
    type: GET_USER_LOGIN,
    payload: accountLogin,
  });
};
