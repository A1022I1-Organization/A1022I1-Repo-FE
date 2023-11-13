import { useNavigate } from "react-router-dom";
import * as securityService from "../../services/security_service/securityService";
import {
  GET_USER_LOGIN,
  GET_USER_LOGIN_GOOGLE,
  LOG_IN_ACCOUNT,
  LOG_IN_OAUTH2,
  LOG_OUT,
} from "../Type";

export const loginByAccount = (account) => async (dispatch) => {
  const JwtAccount = await securityService.loginByAccount(account);
  console.log(JwtAccount);
  if (JwtAccount === undefined) {
    return undefined;
  } else {
    const token = JwtAccount.token;
    localStorage.setItem("tokenAccount", token);
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
  localStorage.removeItem("tokenGoogle");
  localStorage.removeItem("tokenAccount");
  dispatch({
    type: LOG_OUT,
    payload: null,
  });
};

export const getUserLoginAccount = (token, username) => async (dispatch) => {
  const accountLogin = await securityService.getUserLoginAccount(
    token,
    username
  );
  console.log(accountLogin);
  dispatch({
    type: GET_USER_LOGIN,
    payload: accountLogin,
  });
};
export const getUserLoginGoogle = (token) => async (dispatch) => {
  const accountLogin = await securityService.getUserLoginGoogle(token);
  console.log(accountLogin);
  dispatch({
    type: GET_USER_LOGIN_GOOGLE,
    payload: accountLogin,
  });
};
