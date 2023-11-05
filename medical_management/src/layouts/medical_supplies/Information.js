
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Information(){

    return (
        <div className="all">
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="border-content">
                            <div className="form-content">
                                <div className="header-form">
                                    <h2>Thông tin vật tư</h2>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="custom-file-upload">
                                                    <input type="file" name="" id="imageFile"
                                                           accept="image/png, image/jpg, image/jpeg"
                                                           onChange="chooseFile(this)"/>
                                                    <img className="background-image"
                                                         src="https://dungcuykhoatiendung.com/files/sanpham/835/1/jpg/bong-gon-y-te-bao-thach-5g.jpg"
                                                         alt="" id="image" width="250px" height="250px" />
                                                        <span className="error-message"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Mã vật tư: </label>
                                                <span>VT - 123</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Tên vật tư: </label>
                                                <span>Bông y tế</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Đơn giá (VNĐ): </label>
                                                <span>15.000</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Số lượng: </label>
                                                <span>15</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Loại vật tư</label>
                                                <span>Dụng cụ</span>
                                            </div>
                                            <div className="mb-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Nhà cung cấp</label>
                                                    <span>Công ty An Nhiên</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Ngày nhập hàng: </label>
                                                    <span>17/01/2023</span>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Hạn sử dụng: </label>
                                                    <span>17/11/2023</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-warning" style={{color: "white",
                                                                                backgroundColor: "#F58220",
                                                                                borderWidth: "0",
                                                                                borderStyle: "none"}}>
                                        Trở về
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}