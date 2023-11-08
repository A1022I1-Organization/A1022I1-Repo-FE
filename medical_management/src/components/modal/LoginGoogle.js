import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginByOauth2 } from "../../redux/action/LoginAcction";

export const LoginGoogle = (props) => {
  const dispatch = useDispatch();
  const handleClose = props;
  const addUserOauth2 = async (account) => {
    await dispatch(loginByOauth2(account));
  };
  return (
    <>
      <GoogleOAuthProvider clientId="619186749605-ir7smdf223og7pb0bit1680qqtn7cro9.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            const account = {
              token: "",
              accountRole: {
                appAccount: {
                  username: decoded.name,
                  imgLink: decoded.picture,
                },
                appRole: {
                  name: "ROLE_USER",
                },
              },
            };
            addUserOauth2(account);
            console.log(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        
      </GoogleOAuthProvider>
      
    </>
  );
};
