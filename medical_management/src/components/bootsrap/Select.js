// import React, {useState} from 'react';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
//
//     const Input1 = ( ) => {
//         return(
//             <>
//                 <Formik
//                     initialValues={{
//                         search: "",
//                     }}
//                     onSubmit={async (values, { resetForm }) => {
//                         console.log(values.search);
//                         const dataSearch = await handleSearchByName(values.search);
//                         if (dataSearch.length === 0) {
//                             setFlag(false);
//                             navigate("/");
//                         } else {
//                             setFlag(true);
//                         }
//                         resetForm(true);
//                         // setFlag(false);
//                     }}
//                 >
//                     <Form>
//                         <nav className="navbar bg-body-tertiary">
//                             <div className="container-fluid">
//                                 {/* <a className="navbar-brand">Navbar</a> */}
//                                 <Field
//                                     className="form-control me-2"
//                                     type="text"
//                                     placeholder="search"
//                                     aria-label="search"
//                                     name="search"
//                                 />
//                                 <button className="btn btn-outline-success" type="submit">
//                                     Search
//                                 </button>
//                             </div>
//                         </nav>
//                     </Form>
//                 </Formik>
//
//                 <div className="mb-3">
//                     <label htmlFor="customerType" className="form-label">
//                         Category
//                     </label>
//                     <select
//                         as="select"
//                         className="form-select"
//                         id="customerType"
//                         name="customerType"
//                         onChange={(e) => handleSearchByCategory(e.target.value)}
//                     >
//                         <option value="" selected>
//                             Select Category
//                         </option>
//
//                         {category.map((value) => (
//                             <option value={value.name} key={value.id}>
//                                 {value.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </>
//
//         );
//     };
//
//     const Input2 = () => {
//         return(
//             <input type="date"/>
//         )
//     }
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
//                 <DropdownButton
//                     id="form-dropdown"
//                     title={selectedForm ? `Selected Form: ${selectedForm}` : 'Select Form'}
//                     onSelect={handleSelect}
//                 >
//                     <Dropdown.Item eventKey="Form1">Form 1</Dropdown.Item>
//                     <Dropdown.Item eventKey="Form2">Form 2</Dropdown.Item>
//                 </DropdownButton>
//
//                 {/* Render the selected input form */}
//                 {selectedForm === 'Form1' && <Input1 />}
//                 {selectedForm === 'Form2' && <Input2 />}
//             </div>
//         );
//     }
//
// export default MyDropdownForm;
