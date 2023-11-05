import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../css/LoginModalCss.css";
import logoLoginFb from "../../logo/logoLoginFb.png";
import logoLoginGg from "../../logo/logoLoginGg.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/LoginAcction";
import { Field, Form, Formik } from "formik";
export const LoginModal = (props) => {
  //Open modal login
  const [show, setShow] = useState(false);

  //call store get data
  const token = useSelector((store) => store.auth);
  console.log(token);
  const dispatch = useDispatch();

  //Close modal login
  const handleClose = () => {
    closeModalLogin();
    setShow(false);
  };

  //props from headerLogin.js
  const { openModalLogin, closeModalLogin } = props;

  //Call open modal
  useEffect(() => {
    setShow(openModalLogin);
  }, []);

  const handleLogin = (account) => {
    dispatch(login(account));
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
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  handleLogin(values);
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
                  </div>
                  <div className="mb-3" id="input-password">
                    <Field
                      type="password"
                      className="form-login-input"
                      id="inputPassword"
                      placeholder="Nhập mật khẩu"
                      name="password"
                    />
                  </div>
                  <div className="form-login-checkbox">
                    <Field type="checkbox" id="inputRemember" />
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
                <img
                  src={logoLoginGg}
                  className="icon-form-gg"
                  alt="Google Icon"
                />
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
