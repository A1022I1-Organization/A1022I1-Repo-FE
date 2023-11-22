import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../css/LoginModalCss.css";
import logoLoginFb from "../img/logoLoginFb.png";
import logoLoginGg from "../img/logoLoginGg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginByAccount } from "../../redux/action/LoginAcction";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { LoginGoogle } from "./LoginGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const LoginModal = (props) => {
  //Open modal login
  const [show, setShow] = useState(false);
  //call store get data
  const account = useSelector((store) => store.auth);
  console.log(account);
  const dispatch = useDispatch();
  //Close modal login
  const handleClose = () => {
    closeModalLogin();
    setShow(false);
  };
  const checkCloseModalGg = () => {
    closeModalLogin();
    setShow(false);
  };

  //props from headerLogin.js
  const { openModalLogin, closeModalLogin } = props;

  //Call open modal
  useEffect(() => {
    setShow(openModalLogin);
  }, []);
  const navigate = useNavigate();

  const handleLoginByAccount = async (account) => {
    const checkAccount = await dispatch(loginByAccount(account));

    return checkAccount;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "30px" }}>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <div id="modal-form">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  username: Yup.string().required(
                    "Vui lòng nhập tên tài khoản"
                  ),
                  password: Yup.string().required("Vui lòng nhập mật khẩu"),
                })}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                  const checkLogin = await handleLoginByAccount(values);
                  console.log(checkLogin);
                  if (checkLogin === undefined) {
                    toast.error("Đăng nhập không công !");
                    setFieldError(
                      "password",
                      "Tên đăng nhập hoặc mật khẩu không đúng"
                    );
                  } else {
                    toast.success("Đăng nhập thành công !");
                    handleClose();
                    navigate("/supply/list");
                  }
                }}
              >
                <Form>
                  <div className="mb-3" id="input-username">
                    <Field
                      type="text"
                      className="form-login-input"
                      id="inputUsername"
                      placeholder="Tên tài khoản"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="span"
                      className="form-login-error"
                    />
                  </div>
                  <div className="mb-3" id="input-password">
                    <Field
                      type="password"
                      className="form-login-input"
                      id="inputPassword"
                      placeholder="Nhập mật khẩu"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="form-login-error"
                    />
                  </div>
                  <div className="form-login-checkbox">
                    <input type="checkbox" id="inputRemember" />
                    <label htmlFor="inputRemember" className="form-label">
                      Nhớ mật khẩu
                    </label>
                    <span id="form-login-forgot-password">Quên mật khẩu ?</span>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn-fomr-login">Đăng nhập</button>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="form-login-logo">
              <div id="form-icon-center">
                <img
                  src={logoLoginFb}
                  className="icon-form-fb"
                  alt="Facebook Icon"
                />
                <GoogleOAuthProvider clientId="619186749605-ir7smdf223og7pb0bit1680qqtn7cro9.apps.googleusercontent.com">
                  <img
                    src={logoLoginGg}
                    className="icon-form-gg"
                    alt="Google Icon"
                    htmlFor="loginGoogle"
                  />
                  <LoginGoogle closeModalLogin={checkCloseModalGg} />
                </GoogleOAuthProvider>
              </div>
            </div>
            <hr id="hr-form-login" />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
      </Modal>
    </>
  );
};
