import '../../components/css/style.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import {Field, Form, Formik} from 'formik';
import { useState } from 'react';
export function Information () {
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
    return (
        <div>
            <div className="all">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"/>
                        <div className="col-md-6 col-sm-12">
                            <div className="border-content">
                                <div className="form-content">
                                    <div className="header-form">
                                        <h2>Thêm mới vật tư</h2>
                                    </div>
                                    <Formik>
                                        <Form style={{paddingTop: 20}}>
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
                                                            />
                                                            <img
                                                                className="background-image"
                                                                id="image"
                                                                width="250px"
                                                                height="250px"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3">
                                                        <label htmlFor="code" className="form-label">Mã vật tư</label>
                                                        <Field className="form-control" name="code" type="text" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label">Tên vật tư</label>
                                                        <Field type="text" className="form-control" name="name" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3">
                                                        <label className="form-label">Nhà cung cấp</label>
                                                        <Field type="text" className="form-control" name="supplier" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label htmlFor="price" className="form-label">Đơn giá (VNĐ)</label>
                                                        <Field type="text" className="form-control" name="price" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label htmlFor="price" className="form-label">Số lượng</label>
                                                        <Field type="text" className="form-control" name="quantity" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label">Loại vật tư</label>
                                                        <Field type="text" className="form-control" name="supplyType" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label htmlFor="nsx" className="form-label">Ngày nhập hàng</label>
                                                        <Field type="text" className="form-control" name="import" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label htmlFor="hsd" className="form-label">Hạn sử dụng</label>
                                                        <input type="text" className="form-control" name="expiry" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn-orange">Trở về</button>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"/>
                    </div>
                </div>
            </div>
        </div>
    )
}