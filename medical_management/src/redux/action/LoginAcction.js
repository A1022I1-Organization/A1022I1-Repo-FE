
import * as securityService from "../../services/security_service/securityService"
import { LOG_IN } from "../Type";
export const login = (account) => async (dispatch)  => {
    const JwtAccount = await securityService.loginByAccount(account);
    dispatch({
        type: LOG_IN,
        payload: JwtAccount,
      });
};
