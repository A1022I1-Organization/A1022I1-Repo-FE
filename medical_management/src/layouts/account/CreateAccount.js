import '../../components/css/style.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import {ErrorMessage, Field, Form, Formik} from "formik";
import { useEffect, useState } from 'react';
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as service from "../../services/account/AccountService";
import {toast} from "react-toastify";
import * as Yup from 'yup';

export function CreateAccount () {
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    const addNewAccount = async (value) => {
        await service.addNew(value);
        toast.success("Thêm mới thành công")
    };

    // Upload img
    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    //     console.log(e.target.files[0])
    //     const fileInput = e.target;
    //     if (fileInput.files && fileInput.files[0]) {
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //         setImageSrc(event.target.result);
    //         };
    //         reader.readAsDataURL(fileInput.files[0]);
    //     }
    // };
 
    // const handleUpload = () => {
    //     if (!file) {
    //         alert("Please upload an image first!");
    //     }
 
    //     const storageRef = ref(storage, `/files/${file.name}`);
 
    //     // progress can be paused and resumed. It also exposes progress updates.
    //     // Receives the storage reference and the file to upload.
    //     const uploadTask = uploadBytesResumable(storageRef, file);
 
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const percent = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
 
    //             // update progress
    //             setPercent(percent);
    //         },
    //         (err) => console.log(err),
    //         () => {
    //             // download url
    //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                 console.log(url);
    //                 setImgURL(url);
    //             });
    //         }
    //     );
    // };
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
                                <h2>Thêm mới tài khoản</h2>
                            </div>
                            <label className="custom-file-upload">
                                <input
                                        type="file"
                                        name="imageFile"
                                        accept="/image/*"
                                        // onChange={handleFileChange}
                                    />
                                    <img
                                        className="background-image"
                                        src={imageSrc}
                                        id="image"
                                        width="250px"
                                        height="250px"
                                    />
                            </label>
                            <button
                                // onClick={handleUpload}
                                >Upload to Firebase</button>
                            <p>
                                {percent}
                                "% done"</p>
                            <Formik
                                initialValues={
                                    {
                                        username: "",
                                        gmail: "",
                                        employeeCode: "",
                                        employeeName: "",
                                        gender: "",
                                        birthday: "",
                                        idCard: undefined,
                                        phone: undefined,
                                        address: undefined,
                                        appRole: "",
                                        imgLink: imgURL
                                    }
                                }
                                onSubmit={(values, {setSubmitting}) => {
                                    console.log(values);
                                    // const obj = {
                                    //     ...values,
                                    //     picture: "" + imgURL,
                                    // };
                                    addNewAccount(values);
                                    console.log(values);
                                    setSubmitting(false);
                                }}
                                validationSchema={
                                    Yup.object({
                                        image: Yup.string().required('Ảnh nhân viên không được để trống'),
                                        username: Yup.string()
                                            .required('Username không được để trống'),
                                        gmail: Yup.string()
                                            .required('Gmail không được để trống')
                                            .matches(/^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@gmail\.com$/, "Gmail không đúng định dạng"),
                                        employeeCode: Yup.string()
                                            .required('Mã nhân viên không được để trống'),
                                        employeeName: Yup.string()
                                            .required('Tên nhân viên không được để trống'),
                                        idCard: Yup.string()
                                            .required('CCCD/CMND không được để trống')
                                            .matches(/^\d{9,12}$/, "CCCD/CMND không đúng định dạng"),
                                        phone: Yup.string()
                                            .required('Số điện thoại sử dụng không được để trống')
                                            .matches(/^(0[1-9])+([0-9]{8,9})$/, "Số điện thoại không đúng định dạng")
                                    })
                                }
                            >
                                <Form>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="mb-3" style={{height: 91}}>
                                            <label className="form-label">Tên tài khoản</label>
                                            <Field type="text" name="username" className="form-control"/>
                                            <ErrorMessage name="username" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                            <div className="mb-3" style={{height: 91}}>
                                            <label htmlFor="gmail" className="form-label">Gmail</label>
                                            <Field type="text" name="gmail" className="form-control"/>
                                            <ErrorMessage name="gmail" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                            <div className="mb-3">
                                            <label className="form-label">Mã nhân viên</label>
                                            <Field type="text" name="employeeCode" className="form-control"/>
                                            <ErrorMessage name="employeeCode" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label className="form-label">Tên nhân viên</label>
                                            <Field type="text" name="employeeName" className="form-control"/>
                                            <ErrorMessage name="employeeName" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label className="form-label">Vai trò</label>
                                            <Field as="select" name="appRole" className="form-select">
                                                <option value="1">Admin</option>
                                                <option value="2">User</option>
                                            </Field>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label className="form-label">Giới tính</label>
                                            <Field as="select" name="gender" className="form-select">
                                                <option value="1">Nam</option>
                                                <option value="0">Nữ</option>
                                            </Field>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label className="form-label">Ngày sinh</label>
                                            <Field type="date" name="birthday" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">CCCD/CMND</label>
                                                <Field type="text" name="idCard" className="form-control"/>
                                                <ErrorMessage name="idCard" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label htmlFor="expiry" className="form-label">Số điện thoại</label>
                                            <Field type="text" name="phone" className="form-control"/>
                                            <ErrorMessage name="phone" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label">Địa chỉ</label>
                                                <Field type="text" name="address" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-green" style={{marginRight: 10}}>Tạo mới</button>
                                    <button className="btn-orange">Huỷ</button>
                                </Form>
                            </Formik>
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