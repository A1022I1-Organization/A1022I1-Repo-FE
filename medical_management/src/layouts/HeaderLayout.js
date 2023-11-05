import React, { useState } from "react";
import "../components/css/HeaderCss.css";
import logoHeader from "../logo/logoHeader.png";
import { LoginModal } from "../components/modal/LoginModal";
export const Header = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const closeModalLogin = () => {
    setOpenModalLogin(false);
  };
  const handleOpenModalLogin = () => {
    console.log("cos cos");
    setOpenModalLogin(true);
  };
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
            <div className="col">
              <img src={logoHeader} id="hd-main-img-logo" />
            </div>
            <div
              className="col-8 d-flex justify-content-center align-items-center"
              id="hd-main-title"
            >
              CÙNG TẠO CƠ HỘI THÀNH CÔNG - HƯỚNG TỚI SỨC KHỎE CỘNG ĐỒNG
            </div>
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
            <div className="col" />
          </div>
        </div>
        <div className="header-navbar">
          <div className="row" id="hd-row-navbar">
            <div className="col" />
            <div className="col-8 d-flex justify-content-center align-items-center">
              <button className="hd-content-navbar">TRANG CHỦ</button>
              <button className="hd-content-navbar">GIỚI THIỆU</button>
              <button className="hd-content-navbar">SẢN PHẨM</button>
              <button className="hd-content-navbar">ĐỐI TÁC</button>
              <button className="hd-content-navbar">LIÊN HỆ</button>
            </div>
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
    </div>
  );
};
