import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import logoLoginFb from "../img/logoLoginFb.png";
import logoLoginGg from "../img/logoLoginGg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginByAccount } from "../../redux/action/LoginAcction";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { LoginGoogle } from "./LoginGoogle";
import emailjs from "@emailjs/browser";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SendEmail } from "../SendEmail";
import "../css/ChangePassword.css";
import * as securityService from "../../services/security_service/securityService";

export const ChangePasswordModal = (props) => {
  //Open modal login
  const [show, setShow] = useState(false);
  //call store get data
  const account = useSelector((store) => store.auth);
  //props from headerLogin.js
  const { openModalChangePassword, closeModalChangePassword } = props;
  const [countDown, setCountDown] = useState(0);
  const [codeRandom, setCodeRandom] = useState();
  //   const [isCounting, setIsCounting] = useState(false);

  //Close modal login
  const handleClose = () => {
    closeModalChangePassword();
    setShow(false);
  };

  //Call open modal
  useEffect(() => {
    setShow(openModalChangePassword);
  }, []);

  const handleGetCodeChangePassword = async () => {
    setCountDown(60);
    const codeRandom = securityService.randomCodeChangPassword();
    setCodeRandom(codeRandom);
    const dataSendEmail = {
      username: account.accountRole.appAccount.employeeName,
      email: account.accountRole.appAccount.gmail,
      message: codeRandom,
    };
    await securityService.sendEmail(dataSendEmail);
  };

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [countDown]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "30px" }}>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="card-body"
            style={{ textAlign: "center", alignItems: "center" }}
          >
            <input
              type="text"
              className="form-change-input"
              id="inputCode"
              placeholder="Nhập mã"
              name="code"
            />
            {countDown !== 0 ? (
              <span id="count-changePassword">{countDown}</span>
            ) : (
              <button
                className="btn btn-primary"
                id="btn-changePassword"
                onClick={handleGetCodeChangePassword}
              >
                Lấy mã
              </button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
      </Modal>
    </>
  );
};
