import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "../css/ChangePassword.css";
import * as securityService from "../../services/security_service/securityService";
export const ChangePasswordModal = (props) => {
  const [show, setShow] = useState(false);
  const account = useSelector((store) => store.auth);
  const { openModalChangePassword, closeModalChangePassword } = props;
  const [countDown, setCountDown] = useState(0);
  const [codeRandom, setCodeRandom] = useState();
  const [conformCode, setConformCode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const codeRandom = securityService.randomCodeChangPassword();
    setCodeRandom(codeRandom);
    const dataSendEmail = {
      username: account.accountRole.appAccount.employeeName,
      email: account.accountRole.appAccount.gmail,
      message: codeRandom,
    };
    const checkSendEmail = await securityService.sendEmail(dataSendEmail);
    if (checkSendEmail) {
      setIsLoading(false);
      setCountDown(60);
    }
  };

  useEffect(() => {
    if (countDown > 0 && !conformCode) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    } else if (countDown === 0 || conformCode === true) {
      setCodeRandom("");
    }
  }, [countDown, conformCode]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "30px" }}>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log(conformCode)}
          <div className="card-body">
            <div class="d-flex justify-content-center">
              {isLoading && (
                <div className="overlay">
                  <div className="spinner-container">
                    <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div id="dv-chgane-password">
              {conformCode === false && (
                <Formik
                  initialValues={{
                    inputCode: "",
                  }}
                  validationSchema={Yup.object({
                    inputCode: Yup.string().required("Không được để trống"),
                  })}
                  onSubmit={(values, { setSubmitting, setFieldError }) => {
                    if (values.inputCode !== codeRandom) {
                      setFieldError("inputCode", "Mã không chính xác");
                      setConformCode(false);
                    } else {
                      setConformCode(true);
                    }
                  }}
                >
                  <Form>
                    <div id="dv-conform-code">
                      <Field
                        type="text"
                        className="form-conform-code"
                        id="inputCode"
                        placeholder="Nhập mã"
                        name="inputCode"
                      ></Field>
                      <ErrorMessage
                        name="inputCode"
                        component="p"
                        className="form-input-code-error"
                      />
                    </div>
                    {countDown !== 0 ? (
                      <span id="count-changePassword">{countDown}</span>
                    ) : (
                      <button
                        type="button"
                        className="btn-change-password"
                        id="btn-changePassword"
                        onClick={handleGetCodeChangePassword}
                      >
                        Lấy mã
                      </button>
                    )}
                    <button className="btn-change-password">Xác nhận</button>
                  </Form>
                </Formik>
              )}

              {conformCode && (
                <Formik
                  initialValues={{
                    newPassword: "",
                    conformNewPassword: "",
                    conformPassword: "",
                  }}
                  validationSchema={Yup.object({
                    newPassword: Yup.string().required("Không được để trống"),
                    conformNewPassword: Yup.string()
                      .required("Không được để trống")
                      .oneOf([Yup.ref("newPassword")], "Mật khẩu không khớp"),
                  })}
                  onSubmit={async (
                    values,
                    { setSubmitting, setFieldError }
                  ) => {
                    try {
                      const newPassword = {
                        username: account.accountRole.appAccount.username,
                        password: values.newPassword,
                      };
                      const conformPasswordData = {
                        username: account.accountRole.appAccount.username,
                        password: values.conformPassword,
                      };
                      const checkConformPassword =
                        await securityService.conformPassword(
                          conformPasswordData,
                          account.token
                        );
                      console.log(checkConformPassword);
                      if (checkConformPassword) {
                        const changePasswordSuccess =
                          await securityService.changePassword(
                            newPassword,
                            account.token
                          );
                        if (changePasswordSuccess) {
                          toast.success("Thay đổi mật khẩu thành công");
                          handleClose();
                        } else {
                          toast.error("Thay đổi mật khẩu không thành công!");
                        }
                      } else {
                        setFieldError("conformPassword", "Mật khẩu không đúng");
                      }
                    } catch (error) {
                      console.error("Error submitting form:", error);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <Form>
                    <div className="mb-3" id="input-username">
                      <Field
                        type="password"
                        className="form-change-input"
                        id="newPassword"
                        placeholder="Nhập lại mật khẩu"
                        name="conformPassword"
                      />
                      <ErrorMessage
                        name="conformPassword"
                        component="p"
                        className="form-change-password-error"
                      />
                    </div>

                    <div className="mb-3" id="input-username">
                      <Field
                        type="password"
                        className="form-change-input"
                        id="newPassword"
                        placeholder="Mật khẩu mới"
                        name="newPassword"
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="p"
                        className="form-change-password-error"
                      />
                    </div>
                    <div className="mb-3" id="input-username">
                      <Field
                        type="password"
                        className="form-change-input"
                        id="conformNewPassword"
                        placeholder="Xác nhận mật khẩu mới"
                        name="conformNewPassword"
                      />
                      <ErrorMessage
                        name="conformNewPassword"
                        component="p"
                        className="form-change-password-error"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-change-password"
                      id="btn-changePassword"
                    >
                      Đổi mật khẩu
                    </button>
                  </Form>
                </Formik>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
      </Modal>
    </>
  );
};
