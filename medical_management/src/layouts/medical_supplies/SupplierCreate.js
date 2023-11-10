import '../../components/css/style.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import {ErrorMessage, Field, Form, Formik} from "formik";
import { useEffect, useState } from 'react';
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as service from "../../services/medical_supplies/MedicalSupplyService";
import {toast} from "react-toastify";
import * as Yup from 'yup';

export function SupplierCreate () {
    // Initialization default useState
    const [imageSrc, setImageSrc] = useState("");
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [units, setUnits] = useState([]);
    const [imgURL, setImgURL] = useState("");

    useEffect(() => {
        getCategories();
        getSuppliers();
        getUnits();
    }, [])
    const getCategories = async () => {
        const result = await service.getCategories();
        setCategories(result);
    };
    const getSuppliers = async () => {
        const result = await service.getSuppliers();
        setSuppliers(result);
    };
    const getUnits = async () => {
        const result = await service.getUnits();
        setUnits(result);
    };

    const addNewSupply = async (value) => {
        await service.addNewSupply(value);
        toast.success("Thêm mới thành công")
    };
    const formatVND = () => {
        // Get the input value
        var inputElement = document.getElementById("vndInput");
        var inputValue = inputElement.value;

        // Remove any non-numeric characters (if any)
        var numericValue = inputValue.replace(/[^0-9]/g, '');

        // Format the numeric value as VND
        var formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericValue);
        var result = formattedValue.substring(0, formattedValue.length - 1);
        // Update the input field with the formatted value
        inputElement.value = result;
    }
    // Upload img
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
            setImageSrc(event.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    };
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setImgURL(url);
                });
            }
        );
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
                            <label className="custom-file-upload">
                                <input
                                        type="file"
                                        name="imageFile"
                                        accept="/image/*"
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
                            <button onClick={handleUpload}>Upload to Firebase</button>
                            <p>{percent} "% done"</p>
                            <Formik
                                initialValues={
                                    {
                                        picture: "",
                                        code: "",
                                        name: "",
                                        price: "",
                                        importDate: "",
                                        expiry: "",
                                        quantity: "",
                                        category: undefined,
                                        supplier: undefined,
                                        unit: undefined,
                                        account: {
                                            "id": 1,
                                            "employeeCode": "EMP001",
                                            "username": "john_doe",
                                            "password": "secure_password",
                                            "idCard": "123456789",
                                            "employeeName": "John Doe",
                                            "gender": true,
                                            "birthday": "1990-01-15",
                                            "gmail": "john.doe@example.com",
                                            "phone": "123-456-7890",
                                            "address": "123 Main Street, City",
                                            "imgLink": "https://example.com/john_doe.jpg"
                                        }
                                    }
                                }
                                onSubmit={(values, {setSubmitting}) => {
                                    const obj = {
                                        ...values,
                                        picture: "" + imgURL,
                                        category: JSON.parse(values.category),
                                        supplier: JSON.parse(values.supplier),
                                        unit: JSON.parse(values.unit),
                                    };
                                    addNewSupply(obj);
                                    console.log(obj);
                                    setSubmitting(false);
                                }}
                                validationSchema={
                                    Yup.object({
                                        picture: Yup.string().required('Ảnh vật tư không được để trống'),
                                        code: Yup.string()
                                            .required('Mã vật tư không được để trống')
                                            .matches(/^MVT-[0-9]{4}$/, 'Mã vật tư phải theo định dạng MVT-XXXX'),
                                        name: Yup.string()
                                            .required('Tên vật tư không được để trống')
                                            .min(2, 'Tên vật tư không được ít hơn 2 ký tự')
                                            .max(100, 'Tên vật tư không được nhiều hơn 100 ký tự'),
                                        price: Yup.string()
                                            .required('Giá thành không được để trống')
                                            .matches(/^[1-9]\d*$/, 'Giá thành phải là số nguyên dương'),
                                        quantity: Yup.string()
                                            .required('Số lượng không được để trống')
                                            .matches(/^[1-9]\d*$/, 'Số lượng phải là số nguyên dương'),
                                        importDate: Yup.date()
                                            .required('Ngày nhập hàng không được để trống')
                                            .max(new Date(), 'Ngày nhập hàng không lớn hơn ngày hiện tại'),
                                        expiry: Yup.date()
                                            .required('Hạn sử dụng không được để trống')
                                            .min(new Date(new Date().setMonth(new Date().getMonth() + 6)), 'Hạn sử dụng phải hơn 6 tháng so với ngày hiện tại'),
                                    })
                                }
                            >
                                <Form>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="mb-3" style={{height: 91}}>
                                            <label className="form-label">Mã vật tư</label>
                                            <Field type="text" name="code" className="form-control"/>
                                            <ErrorMessage name="code" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                            <div className="mb-3" style={{height: 91}}>
                                            <label htmlFor="name" className="form-label">Tên vật tư</label>
                                            <Field type="text" name="name" className="form-control"/>
                                            <ErrorMessage name="name" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                            <div className="mb-3">
                                            <label className="form-label">Nhà cung cấp</label>
                                            <Field as="select" name="category" className="form-select">
                                                <option value=""></option>
                                                {categories.map((value) => (
                                                    <option value={JSON.stringify(value)}>{value.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="category" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Đơn giá (VNĐ)</label>
                                            <Field type="text" name="price" className="form-control"/>
                                            <ErrorMessage name="price" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label className="form-label">Đơn vị tính</label>
                                            <Field as="select" name="unit" className="form-select">
                                                <option value=""></option>
                                                {units.map((value) => (
                                                    <option value={JSON.stringify(value)}>{value.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="unit" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">Số lượng</label>
                                            <Field type="text" name="quantity" className="form-control"/>
                                            <ErrorMessage name="quantity" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label className="form-label">Loại vật tư</label>
                                            <Field as="select" name="supplier" className="form-select">
                                                <option value=""></option>
                                                {suppliers.map((value) => (
                                                    <option value={JSON.stringify(value)}>{value.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="supplier" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4" style={{height: 112}}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="importDate" className="form-label">Ngày nhập hàng</label>
                                                <Field type="date" name="importDate" className="form-control"/>
                                                <ErrorMessage name="importDate" className="form-err" component='span'></ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label htmlFor="expiry" className="form-label">Hạn sử dụng</label>
                                            <Field type="date" name="expiry" className="form-control"/>
                                            <ErrorMessage name="expiry" className="form-err" component='span'></ErrorMessage>
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