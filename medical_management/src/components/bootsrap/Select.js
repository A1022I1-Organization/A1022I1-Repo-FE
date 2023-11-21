// import React, {useEffect, useState} from 'react';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as suppliesService from "../../services/medical_supplies/MedicalSupplyService";
// import {Field, Form, Formik} from "formik";
//
//
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [oldSuplliesPage, setOldSuppliesPage] = useState(0);
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [oldItems, setOldItems] = useState([]);
// const InputSupplyName = () => {
//
//     const handleSearchByName = async (page, token, name) => {
//         const data = await suppliesService.getSuppliesByName(oldSuplliesPage, token, name);
//         setOldSuppliesPage(data);
//     };
//
//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     search: "",
//                 }}
//             >
//                 <Form>
//                     <Field
//                         className="form-control me-2"
//                         type="text"
//                         placeholder="Tên vật tư"
//                         name="search"
//                         onChange={(value) => {
//                             handleSearchByName(value.target.value);
//                         }}
//                     />
//                 </Form>
//             </Formik>
//         </>
//     )
// };
//
// const InputSupplyTypes = () => {
//     const [category, setCategory] = useState([]);
//
//     useEffect(() => {
//         getCategory();
//     }, []);
//
//     const getCategory = async () => {
//         const list = await suppliesService.getCategories();
//         setCategory(list);
//     }
//
//     const handleSearchByCategory = async (page, token) => {
//         const data = await suppliesService.getSuppliesByCategory(oldSuplliesPage, token, type);
//         setOldSuppliesPage(data);
//     };
//
//     return (
//         <>
//             <Formik
//                 initialValues={
//                     {
//                         category: JSON.stringify(oldItems.category)
//                     }
//                 }
//             >
//                 <Form>
//                     <Field as="select" name="category" className="form-select"
//                         onChange={() => handleSearchByCategory()}
//                     >
//                         {category.map((value) => (
//                             <option value={JSON.stringify(value)}>{value.name}</option>
//                         ))}
//                     </Field>
//                 </Form>
//             </Formik>
//
//         </>
//     )
// };
//
// const InputSupplier = () => {
//     const [supplier, setSupplier] = useState([]);
//
//     useEffect(() => {
//         getSupplier();
//     }, []);
//
//     const getSupplier = async () => {
//         const list = await suppliesService.getSuppliers();
//         setSupplier(list);
//     }
//
//     const handleSearchBySupplier = async (page, token) => {
//         const data = await suppliesService.getOldSuppliesPage(oldSuplliesPage, token);
//         setOldSuppliesPage(data);
//     };
//
//     return (
//         <>
//             <Formik
//                 initialValues={
//                     {
//                         supplier: JSON.stringify(supplier)
//                     }
//                 }
//             >
//                 <Form>
//                     <Field as="select" name="category" className="form-select"
//                            onChange={() => handleSearchBySupplier()}>
//                         {supplier.map((value) => (
//                             <option value={JSON.stringify(value)}>{value.name}</option>
//                         ))}
//                     </Field>
//                 </Form>
//             </Formik>
//
//         </>
//
//     )
// };
//
// const InputExpiry = () => {
//     // const [expiry, setExpiry] = useState();
//     //
//     // const [fromDate, setFromDate] = useState();
//     // const [toDate, setToDate] = useState();
//     //
//     // const handleSearchByDate = async (page, token) => {
//     //     if (fromDate <= expiry <= toDate) {
//     //         const data = await service.getOldSuppliesPage(oldSuplliesPage, token);
//     //         setOldSuppliesPage(data);
//     //     }
//     // };
//
//     return (
//         <>
//             <Formik
//                 initialValues={
//                     {
//                         expiry: oldItems.expiry,
//                         fromDate: "",
//                         toDate: ""
//                     }
//                 }
//             >
//                 <Form>
//                     <label> Chọn ngày: </label>
//                     <span>
//                             <Field type="date" name="fromDate"></Field>
//                         </span>
//                     <span> </span>
//                     <span>
//                         <Field type="date" name="toDate"></Field>
//                         </span>
//                     <br/>
//                     {/*<button onChange={() => handleSearchByDate()}>Tìm kiếm</button>*/}
//                 </Form>
//             </Formik>
//         </>
//     )
// };
//
//     const MyDropdownForm = () => {
//         const [selectedForm, setSelectedForm] = useState(null);
//
//         const handleSelect = (formName) => {
//             setSelectedForm(formName);
//         };
//
//         return (
//             <div>
//                 {/* Dropdown to select input form */}
//                 <DropdownButton id="dropdown-button-dark-example2"
//                                 variant="secondary"
//                                 title={selectedForm ? `${selectedForm}` : 'Tìm kiếm'}
//                                 style={{borderRadius: "0", width: "100px"}}
//                                 onSelect={handleSelect}>
//                     <Dropdown.Item eventKey="Tên vật tư" >Tên vật tư</Dropdown.Item>
//                     <Dropdown.Item eventKey="Loại vật tư">Loại vật tư</Dropdown.Item>
//                     <Dropdown.Item eventKey="Nhà cung cấp">Nhà cung cấp</Dropdown.Item>
//                     <Dropdown.Item eventKey="Hạn sử dụng">Hạn sử dụng</Dropdown.Item>
//                 </DropdownButton>
//
//                 {/* Render the selected input form */}
//                 {selectedForm === 'Tên vật tư' && <InputSupplyName/>}
//                 {selectedForm === 'Loại vật tư' && <InputSupplyTypes/>}
//                 {selectedForm === 'Nhà cung cấp' && <InputSupplier/>}
//                 {selectedForm === 'Hạn sử dụng' && <InputExpiry/>}
//             </div>
//         );
//     }
//
// export default MyDropdownForm;
