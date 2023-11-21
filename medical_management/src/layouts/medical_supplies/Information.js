import "../../components/css/style.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import * as supplyServices from "../../services/medical_supplies/MedicalSupplyService";
import "../../components/css/style.css";

export function Information() {
  // const [imageSrc, setImageSrc] = useState("");
  // const handleFileChange = (e) => {
  //     const fileInput = e.target;
  //     if (fileInput.files && fileInput.files[0]) {
  //         const reader = new FileReader();
  //         reader.onload = (event) => {
  //         setImageSrc(event.target.result);
  //         };
  //         reader.readAsDataURL(fileInput.files[0]);
  //     }
  // };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [supply, setSupply] = useState();
  const param = useParams();
  const [formatPrice, setFormatPrice] = useState("");

  useEffect(() => {
    getSupply();
  }, []);

  const getSupply = async () => {
    const tokenAccount = localStorage.getItem("tokenAccount");

    const supplyDetail = await supplyServices.getSupply(param.id, tokenAccount);
    const stringValue = supplyDetail.price.toLocaleString("vi-VN");
    console.log(supplyDetail);
    setSupply(supplyDetail);
    setFormatPrice(stringValue);
  };

  return (
    <div>
      <div className="all">
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6 col-sm-12">
              <div className="border-content">
                <div className="form-content">
                  <div className="header-form">
                    <h2>Thông tin vật tư</h2>
                  </div>
                  {supply === undefined ? (
                    "Vật tư này không tồn tại!"
                  ) : (
                    <div className="row">
                      {/*<div className="col-1" />*/}
                      <div
                        className="col-5"
                        style={{ paddingRight: "10px", paddingLeft: "0" }}
                      >
                        <div className="form-outline">
                          <label className="custom-file-upload">
                            <img
                              src={supply.picture}
                              className="background-image"
                              id="image"
                              width="240px"
                              height="240px"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="mb-3">
                          <p>
                            <span className="label">Mã vật tư: </span>
                          </p>
                          <p>
                            <span className="label">Tên vật tư: </span>
                          </p>
                          <p>
                            <span className="label">Loại vật tư: </span>
                          </p>
                          <p>
                            <span className="label">Đơn giá (VND): </span>
                          </p>
                          <p>
                            <span className="label">Đơn vị tính: </span>
                          </p>
                          <p>
                            <span className="label">Số lượng: </span>
                          </p>
                          <p>
                            <span className="label">Nhà cung cấp: </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-4" style={{ padding: "0" }}>
                        <div className="mb-3">
                          <p>
                            <span>{supply.code}</span>
                          </p>
                          <p>
                            <span>{supply.name}</span>
                          </p>
                          <p>
                            <span>{supply.category.name}</span>
                          </p>
                          <p>
                            <span>{formatPrice}</span>
                          </p>
                          <p>
                            <span>{supply.unit.name}</span>
                          </p>
                          <p>
                            <span>{supply.quantity}</span>
                          </p>
                          <p>
                            <span>{supply.supplier.name}</span>
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="col-6">
                        <div className="mb-3">
                          <p>
                            <span className="label">Ngày nhập kho: </span>
                            <span>{supply.importDate}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="mb-3">
                          <p>
                            <span className="label">Hạn sử dụng: </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-3" style={{ padding: "0" }}>
                        <p>
                          <span>{supply.expiry}</span>
                        </p>
                      </div>
                    </div>
                  )}
                  <button type="submit" className="btn-orange">
                    <NavLink
                      to={"/supply/list"}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Trở về
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
