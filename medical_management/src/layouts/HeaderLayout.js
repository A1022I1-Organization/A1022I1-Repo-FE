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
  const [scrolling, setScrolling] = useState(false);

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
    const username = localStorage.getItem("username");
    if ((tokenAccount && username) !== null && tokenGoogle === null) {
      getUserLoginByAccount(tokenAccount, username);
    } else if (tokenGoogle !== null) {
      getUserLoginByGoogle(tokenGoogle);
    } else {
    }
  }, []);

  const handleLogout = () => {
    dispatch(logOut(account.token));
    toast.success("Đăng xuất thành công !");
    navigate("");
  };
  const getUserLoginByAccount = async (token, username) => {
    dispatch(getUserLoginAccount(token, username));
  };
  const getUserLoginByGoogle = async (token) => {
    dispatch(getUserLoginGoogle(token));
  };
  const role = useMemo(() => {
    if (account === null) {
      // navigate("");
      return "guest";
    } else if (account.accountRole.appRole.name === "ROLE_ADMIN") {
      // navigate("/supply/list");
      return "admin";
    } else if (account.accountRole.appRole.name === "ROLE_EMPLOYEE") {
      // navigate("/supply/list");
      return "employee";
    } else if (account.accountRole.appRole.name === "ROLE_USER") {
      // navigate("");
      return "user";
    }
  }, [account]);

  console.log(role);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      if (isScrolled !== scrolling) {
        setScrolling(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling]);
  const headerClassName = scrolling ? "header-fixed" : "";

  return (
    <div>
      <div id="header">
        <div className="header-main">
          <div className="row" id="hd-row-main">
            <div className="col" />
            <NavLink to="" className="col" style={{ textDecoration: "none" }}>
              <img src={logoHeader} id="hd-main-img-logo" />
            </NavLink>
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
        <div className={headerClassName}>
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
                    to="/admin/meterial"
                    className="hd-content-navbar"
                    style={{ textDecoration: "none" }}
                  >
                    THỐNG KÊ
                  </NavLink>
                  {role === "admin" && (
                    <NavLink
                      to="/admin/create-account"
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
