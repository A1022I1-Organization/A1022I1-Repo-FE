import React, { useContext, useEffect, useMemo, useState } from "react";
import "../components/css/HeaderCss.css";
import logoHeader from "../components/img/logoHeader.png";
import { LoginModal } from "../components/modal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/action/LoginAcction";
import * as securityService from "../services/security_service/securityService";
import {
  getUserLoginAccount,
  getUserLoginGoogle,
} from "../redux/action/LoginAcction";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { ChangePasswordModal } from "../components/modal/ChangePasswordModal";
export const Header = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const navigate = useNavigate();

  const closeModalLogin = () => {
    setOpenModalLogin(false);
  };
  const closeModalChangePassword = () => {
    setOpenModalChangePassword(false);
  };

  const handleOpenModalLogin = () => {
    setOpenModalLogin(true);
  };
  const handleOpenModalChangePassword = () => {
    setOpenModalChangePassword(true);
  };

  //call store get data
  const account = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  console.log(account);
  useEffect(() => {
    const tokenAccount = localStorage.getItem("tokenAccount");
    const tokenGoogle = localStorage.getItem("tokenGoogle");
    console.log(tokenGoogle);
    const username = localStorage.getItem("username");
    if ((tokenAccount && username) !== null && tokenGoogle === null) {
      getUserLoginByAccount(tokenAccount, username);
      console.log("chạy 1");
    } else if (tokenGoogle !== null) {
      console.log("chạy 2");
      getUserLoginByGoogle(tokenGoogle);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logOut(account.token));
    toast.success("Đăng xuất thành công !");
  };
  const getUserLoginByAccount = async (token, username) => {
    dispatch(getUserLoginAccount(token, username));
  };
  const getUserLoginByGoogle = async (token) => {
    dispatch(getUserLoginGoogle(token));
  };
  const role = useMemo(() => {
    if (account === null) {
      navigate("");
      return "guest";
    } else if (account.accountRole.appRole.name === "ROLE_ADMIN") {
      // navigate("/supply/list");
      return "admin";
    } else if (account.accountRole.appRole.name === "ROLE_EMPLOYEE") {
      navigate("/supply/list");
      return "employee";
    } else if (account.accountRole.appRole.name === "ROLE_USER") {
      navigate("");
      return "user";
    }
  }, [account]);
  console.log(role);

  return (
    <div>
      <div id="header">
        <div className="header-top">
          <div className="row" id="row-hd-top">
            <div className="col" />
            <div className="col-3">
              <div className="hd-top-sdt">
                <div className="content-top-sdt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    fill="currentColor"
                    className="bi bi-telephone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    />
                  </svg>
                  <span>(+84) 74524210</span>
                </div>
              </div>
              <div className="hd-top-email">
                <div className="content-top-email">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    fill="currentColor"
                    className="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                  <span>phamhuy1642004@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="col-4" />
            <div className="col-3" />
            <div className="col" />
          </div>
        </div>
        <div className="header-main">
          <div className="row" id="hd-row-main">
            <div className="col" />
            {/* <div className="col"> */}
            <NavLink to="" className="col" style={{ textDecoration: "none" }}>
              <img src={logoHeader} id="hd-main-img-logo" />
            </NavLink>
            {/* </div> */}
            <div
              className="col-8 d-flex justify-content-center align-items-center"
              id="hd-main-title"
            >
              CÙNG TẠO CƠ HỘI THÀNH CÔNG - HƯỚNG TỚI SỨC KHỎE CỘNG ĐỒNG
            </div>
            {role === "guest" && (
              <div className="col">
                <div className="item-user-cart">
                  <div className="hd-img-user">
                    <span
                      id="sign-in"
                      onClick={() => {
                        handleOpenModalLogin();
                      }}
                    >
                      Đăng nhâp
                    </span>
                  </div>
                </div>
              </div>
            )}
            {(role === "admin" || role === "user" || role === "employee") && (
              <div className="col">
                <div className="item-user-cart">
                  <div className="hd-img-user">
                    <div className="dropdown">
                      <button
                        className="btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          id="img-user"
                          src={account.accountRole.appAccount.imgLink}
                          className="rounded-circle"
                          alt
                        />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <img
                              id="dropdown-img-user"
                              src={account.accountRole.appAccount.imgLink}
                              alt
                              className="rounded-circle"
                            />
                            <span id="dropdown-img-text">
                              {account.accountRole.appAccount.employeeName}
                            </span>
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          {(role === "admin" || role === "employee") && (
                            <span
                              class="dropdown-item"
                              onClick={() => handleOpenModalChangePassword()}
                            >
                              Đổi mật khẩu
                            </span>
                          )}
                        </li>
                        <li>
                          <span
                            className="dropdown-item"
                            id="sign-out"
                            onClick={handleLogout}
                          >
                            Đăng xuất
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* <a class="" id="sign-out" href="#">Đăng nhâp</a> */}
                  </div>
                </div>
              </div>
            )}

            <div className="col" />
          </div>
        </div>
        <div className="header-navbar">
          <div className="row" id="hd-row-navbar">
            <div className="col" />
            {(role === "guest" || role === "user") && (
              <div className="col-8 d-flex justify-content-center align-items-center">
                <NavLink
                  to=""
                  className="hd-content-navbar"
                  style={{ textDecoration: "none" }}
                >
                  TRANG CHỦ
                </NavLink>
                <button className="hd-content-navbar">GIỚI THIỆU</button>
                <NavLink
                  to="/list"
                  className="hd-content-navbar"
                  style={{ textDecoration: "none" }}
                >
                  SẢN PHẨM
                </NavLink>
                <button className="hd-content-navbar">ĐỐI TÁC</button>
                <button className="hd-content-navbar">LIÊN HỆ</button>
              </div>
            )}

            {(role === "admin" || role === "employee") && (
              <div class="col-4 d-flex justify-content-center align-items-center">
                <NavLink
                  to="/supply/list"
                  className="hd-content-navbar"
                  style={{ textDecoration: "none" }}
                >
                  QUẢN LÝ
                </NavLink>
                <NavLink
                  to="/supply/list"
                  className="hd-content-navbar"
                  style={{ textDecoration: "none" }}
                >
                  THỐNG KÊ
                </NavLink>
                {role === "admin" && (
                  <NavLink
                    // to=""
                    className="hd-content-navbar"
                    style={{ textDecoration: "none" }}
                  >
                    TÀI KHOẢN
                  </NavLink>
                )}
              </div>
            )}

            <div className="col" />
          </div>
        </div>
      </div>
      {openModalLogin && (
        <LoginModal
          openModalLogin={openModalLogin}
          closeModalLogin={closeModalLogin}
        />
      )}
      {openModalChangePassword && (
        <ChangePasswordModal
          openModalChangePassword={openModalChangePassword}
          closeModalChangePassword={closeModalChangePassword}
        />
      )}
    </div>
  );
};
