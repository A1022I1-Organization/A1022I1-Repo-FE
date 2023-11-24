import '../../components/css/style.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import {ErrorMessage, Field, Form, Formik} from "formik";
import { useEffect, useState } from 'react';
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as service from "../../services/medical_supplies/MedicalSupplyService";
import {toast} from "react-toastify";
import * as Yup from 'yup';
import ReactLoading from "react-loading";
import {useNavigate} from "react-router-dom";
import {getUserLoginAccount} from "../../services/security_service/securityService"
import {NavLink} from "react-router-dom";

export function SupplierCreate () {
    // Initialization default useState
    const [imageSrc, setImageSrc] = useState("");
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [lastSupply, setLastSupply] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [units, setUnits] = useState([]);
    const [account, setAccount] = useState({});
    const [isLoading, setIsLoading] = useState();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const tokenAccount = localStorage.getItem('tokenAccount');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect( () => {
        const fetchData = async () => {
            try {
                // Gọi các hàm lấy danh sách categories, suppliers, units
                await getCategories();
                await getSuppliers();
                await getUnits();
                await getLastSupply();

                // Lấy token và username từ localStorage
                const username = localStorage.getItem('username');

                // Gọi hàm lấy appAccount
                const appAccount = await getUserLoginAccount(tokenAccount, username);
                setAccount(appAccount.accountRole.appAccount);
            } catch (error) {
                console.error('Error in fetchData:', error);
            }
        };

        // Gọi fetchData trong useEffect
        fetchData();
    }, [])

    const getLastSupply = async () => {
        const tokenAccount = localStorage.getItem('tokenAccount');
        const result = await service.getLastSupply(tokenAccount);
        setLastSupply(result);
    };

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
        await service.addNewSupply(value, tokenAccount);
        navigate("/supply/list")
        toast.success("Thêm mới thành công")
    };

    const handleInputChange = (e) => {

        const numericValue = e.target.value.replace(/[^0-9]/g, '');

        // Format the numeric value as VND
        const formattedValue = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(numericValue);

        const trimmedValue = formattedValue.replace(/\s/g, '');
        const endValue = trimmedValue.slice(0, -1);

        // Update the input field with the formatted value
        setInputValue(endValue);
    };

    // }
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

    const handleUpload = async () => {
        // if (!file) {
        //     alert("Please upload an image first!");
        //     navigate("/supply/create");
        //     setIsLoading(false);
        //     return undefined;
        // }
        return new Promise((resolve) => {
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
                    setIsLoading(true);
                },

                (err) => console.log(err),
                async () => {
                    // download url
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url);
                    if(url){
                        setIsLoading(false);
                    }
                }
            );
        });
    };
    return (
        <div>
            <div className="all">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2" />
                        <div className="col-md-8 col-sm-12">
                            <div className="border-content">
                                <div className="form-content">
                                    <div className="header-form">
                                        <h2>Thêm mới vật tư</h2>
                                    </div>
                                    <Formik
                                        // enableReinitialize={true}

                                        initialValues={
                                            {
                                                picture: "aaa",
                                                code: "",
                                                name: "",
                                                price: "",
                                                importDate: "",
                                                expiry: "",
                                                quantity: "",
                                                category: undefined,
                                                supplier: undefined,
                                                unit: undefined,
                                                account: ""
                                            }
                                        }
                                        onSubmit={async(values, {setSubmitting}) => {
                                            const urlImg = await handleUpload();

                                            const parsePrice = parseFloat(inputValue.replace(/\./g, ''));
                                            console.log("Price: " +parsePrice);
                                            const obj = {
                                                ...values,
                                                code: `MVT-${String(lastSupply.id + 1).padStart(4, '0')}`,
                                                price: parsePrice ,
                                                picture: "" + urlImg,
                                                category: JSON.parse(values.category),
                                                supplier: JSON.parse(values.supplier),
                                                unit: JSON.parse(values.unit),
                                                account: account,
                                            };
                                            addNewSupply(obj);
                                            console.log("Giá trị" + JSON.stringify(obj));
                                            setSubmitting(false);
                                        }}
                                        validationSchema={
                                            Yup.object({
                                                supplier: Yup.string()
                                                    .required('Nhà cung cấp không được để trống'),
                                                unit: Yup.string()
                                                    .required('Đơn vị tính không được để trống'),
                                                category: Yup.string()
                                                    .required('Loại vật tư không được để trống'),
                                                picture: Yup.string()
                                                    .required('Ảnh vật tư không được để trống')
                                                    .test('picture', "Ảnh không được để trống", function(value) {
                                                        return file;
                                                    }),
                                                name: Yup.string()
                                                    .required('Tên vật tư không được để trống')
                                                    .min(2, 'Tên vật tư không được ít hơn 2 ký tự')
                                                    .max(100, 'Tên vật tư không được nhiều hơn 100 ký tự'),
                                                // price: Yup.string()
                                                //     .required('Giá thành không được để trống')
                                                //     .matches(/^0$/, 'Giá thành không thể là 0'),
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
                                            <div className="row" style={{paddingTop : "20px"}}>
                                                <div className="col-md-6">
                                                    <label className="custom-file-upload" style={{height : "360px", margin: 0}}>
                                                        <Field
                                                            type="file"
                                                            name="imageFile"
                                                            accept="image/jpg, image/png"
                                                            onChange={handleFileChange}
                                                        />
                                                        <img
                                                            className="background-image"
                                                            src={imageSrc}
                                                            id="image"
                                                            width="370px"
                                                            height="320px"
                                                        />
                                                        <ErrorMessage name="picture" className="form-err" component='span'></ErrorMessage>
                                                    </label>
                                                    <div className="input-form">
                                                        <label htmlFor="price" className="form-label">Đơn giá (VNĐ)</label>
                                                        {/* <Field type="text" name="price" className="form-control" id="vndInput" onInput={formatVND}/>
                                                    <ErrorMessage name="price" className="form-err" component='span'></ErrorMessage> */}
                                                        <Field type="text" name="price" className="form-control" value={inputValue} onChange={handleInputChange} />
                                                        <ErrorMessage name="price" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label htmlFor="quantity" className="form-label">Số lượng</label>
                                                        <Field type="text" name="quantity" className="form-control"/>
                                                        <ErrorMessage name="quantity" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label htmlFor="importDate" className="form-label">Ngày nhập hàng</label>
                                                        <Field type="date" name="importDate" className="form-control"/>
                                                        <ErrorMessage name="importDate" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-form">
                                                        <label className="form-label">Mã vật tư</label>
                                                        {/* <Field type="text" name="code" className="form-control" value={`MVT-${String(lastSupply.id + 1).padStart(4, '0')}`} disabled/> */}
                                                        <h5>{`MVT-${String(lastSupply.id + 1).padStart(4, '0')}`}</h5>
                                                        <ErrorMessage name="code" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label htmlFor="name" className="form-label">Tên vật tư</label>
                                                        <Field type="text" name="name" className="form-control"/>
                                                        <ErrorMessage name="name" className="form-err" component='span'></ErrorMessage></div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label className="form-label">Nhà cung cấp</label>
                                                        <Field as="select" name="supplier" className="form-select">
                                                            <option value="">-- Chọn --</option>
                                                            {suppliers.map((value) => (
                                                                <option value={JSON.stringify(value)}>{value.name}</option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="supplier" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label className="form-label">Đơn vị tính</label>
                                                        <Field as="select" name="unit" className="form-select">
                                                            <option value="">-- Chọn --</option>
                                                            {units.map((value) => (
                                                                <option value={JSON.stringify(value)}>{value.name}</option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="unit" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label className="form-label">Loại vật tư</label>
                                                        <Field as="select" name="category" className="form-select">
                                                            <option value="">-- Chọn --</option>
                                                            {categories.map((value) => (
                                                                <option value={JSON.stringify(value)}>{value.name}</option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="category" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                    {/*  */}
                                                    <div className="input-form">
                                                        <label htmlFor="expiry" className="form-label">Hạn sử dụng</label>
                                                        <Field type="date" name="expiry" className="form-control"/>
                                                        <ErrorMessage name="expiry" className="form-err" component='span'></ErrorMessage>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn-green" style={{marginRight: 10}}>Tạo mới</button>
                                            <NavLink to={`/supply/list`}>
                                                <button className="btn-orange">Huỷ</button>
                                            </NavLink>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2" /></div>
                </div>
            </div>
            {isLoading && (
                <div className="loading-overlay" style={{ display: isLoading ? 'flex' : 'none' }}>
                    <div className="loading-spinner">
                        <ReactLoading type="spin" color="#F58220" height={50} width={50} />
                    </div>
                </div>
            )}
        </div>
    )
}