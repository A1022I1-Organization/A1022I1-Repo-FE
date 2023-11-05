import '../../components/css/style.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import { useState } from 'react';

export function MedicalUpdate () {

    const [imageSrc, setImageSrc] = useState("");
    const handleFileChange = (e) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
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
                            <h2>Thêm mới vật tư</h2>
                        </div>
                        <form style={{paddingTop: 20}}>
                            <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                <label className="custom-file-upload">
                                    {/* <input type="file" name id="imageFile" accept="image/png, image/jpg, image/jpeg" onchange="chooseFile(this)" />
                                    <img className="background-image" src alt id="image" width="250px" height="250px" /> */}
                                    <input
                                        type="file"
                                        name="imageFile"
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                    <img
                                        className="background-image"
                                        src={imageSrc}
                                        id="image"
                                        width="250px"
                                        height="250px"
                                    />
                                </label>
                                <span className="error-message">Ảnh không được để trống!</span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3" style={{height: 91}}>
                                <label htmlFor="code" className="form-label">Mã vật tư</label>
                                <input type="text" className="form-control" id="code" placeholder="Mã vật tư" />
                                <span className="error-message">Mã vật tư không được để trống!</span>
                                </div>
                                <div className="mb-3" style={{height: 91}}>
                                <label htmlFor="name" className="form-label">Tên vật tư</label>
                                <input type="text" className="form-control" id="name" placeholder="Tên vật tư" />
                                <span className="error-message">Tên vật tư không được để trống!</span>
                                </div>
                                <div className="mb-3">
                                <label className="form-label">Nhà cung cấp</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option value={1}>Công ty Lan Anh</option>
                                    <option value={2}>Công ty Viết Hưng</option>
                                    <option value={3}>Công ty Hải Dương</option>
                                </select>
                                </div>
                            </div>
                            </div>
                            <div className="row mb-4" style={{height: 112}}>
                            <div className="col">
                                <div className="mb-3">
                                <label htmlFor="price" className="form-label">Đơn giá (VNĐ)</label>
                                <input type="text" className="form-control" id="price" placeholder="Đơn giá" />
                                <span className="error-message">Đơn giá không được để trống!</span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                <label htmlFor="price" className="form-label">Số lượng</label>
                                <input type="text" className="form-control" id="quantity" placeholder="Số lượng" />
                                <span className="error-message">Số lượng không được để trống!</span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                <label className="form-label">Loại vật tư</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option value={1}>Bông</option>
                                    <option value={2}>Thuốc</option>
                                    <option value={3}>Dung dịch</option>
                                    <option value={4}>Dụng cụ</option>
                                </select>
                                </div>
                            </div>
                            </div>
                            <div className="row mb-4" style={{height: 112}}>
                            <div className="col">
                                <div className="mb-3">
                                <label htmlFor="nsx" className="form-label">Ngày nhập hàng</label>
                                <input type="date" className="form-control" id="nsx" />
                                <span className="error-message">Ngày nhập hàng không được để trống!</span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                <label htmlFor="hsd" className="form-label">Hạn sử dụng</label>
                                <input type="date" className="form-control" id="hsd" />
                                <span className="error-message">Hạn sử dụng không được để trống!</span>
                                </div>
                            </div>
                            </div>
                            <button type="submit" className="btn-green" style={{marginRight: 10}}>Tạo mới</button>
                            <button type="submit" className="btn-orange">Huỷ</button>
                        </form>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3" />
                </div>
                </div>
            </div>
        </div>
    )
}