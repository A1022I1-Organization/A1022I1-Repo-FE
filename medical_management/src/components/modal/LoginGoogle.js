import { useDispatch } from "react-redux";
import { loginByOauth2 } from "../../redux/action/LoginAcction";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import logoLoginGg from "../img/logoLoginGg.png";
import { Toast } from "bootstrap/dist/js/bootstrap.bundle";
import { toast } from "react-toastify";

export const LoginGoogle = (props) => {
  const { closeModalLogin } = props;

  const dispatch = useDispatch();

  const addUserOauth2 = async (account) => {
    await dispatch(loginByOauth2(account));
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      const account = {
        token: tokenResponse.access_token,
        accountRole: {
          appAccount: {
            employeeName: userInfo.name,
            imgLink: userInfo.picture,
          },
          appRole: {
            name: "ROLE_USER",
          },
        },
      };

      await addUserOauth2(account);
      localStorage.setItem("tokenGoogle", tokenResponse.access_token);
      closeModalLogin();
      toast.success("Đăng nhập thành công !");
    },
    onError: (errorResponse) => {
      // Xử lý lỗi
      console.log(errorResponse);
    },
    flow: "implicit",
    scope: "profile email",
  });

  return (
    <div>
      <img
        src={logoLoginGg}
        className="icon-form-fb"
        alt="Facebook Icon"
        onClick={login}
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "20px",
          bottom: "39px",
          left: "35px",
        }}
      />
    </div>
  );
};
