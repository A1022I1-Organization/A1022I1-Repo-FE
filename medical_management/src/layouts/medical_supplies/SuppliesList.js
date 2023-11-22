
import {useEffect, useState} from "react";
import {Row, Col, Container, Card, Table, DropdownButton, Dropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownSearch } from "../../components/bootsrap/DropdownSearch";
import * as suppliesService from "../../services/medical_supplies/MedicalSupplyService";
import "../../components/css/style.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import * as React from "react";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import {Field, Form, Formik} from "formik";
import {getSuppliesByName} from "../../services/medical_supplies/MedicalSupplyService";

export function SuppliesList() {
  // Set up a list of oldItem and newItem
  const [oldItems, setOldItems] = useState([]);
  const [newItems, setNewItems] = useState([]);

  const [totalOSPages, setTotalOSPages] = useState();
  const [totalNSPages, setTotalNSPages] = useState();
  const [oldSuplliesPage, setOldSuppliesPage] = useState(0);
  const [newSuplliesPage, setNewSuppliesPage] = useState(0);

  const [type, setType] = useState(null);
  const [delId, setDelId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);


  const [selectedForm, setSelectedForm] = useState(null);
  const token = localStorage.getItem("tokenAccount");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getOldPage = async (page, token) => {
    const [data, totalPage] = await suppliesService.getOldSuppliesPage(page, token);
    setTotalOSPages(totalPage);
    setOldItems(data);
  };

  const getNewPage = async (page, token) => {
    const [data, totalPage] = await suppliesService.getNewSuppliesPage(page,token);
    setTotalNSPages(totalPage);
    setNewItems(data);
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (type, delId) => {
    setType(type);
    setDelId(delId);
    if (type === "oldItem") {
      setDeleteMessage(
        `Bạn chắc chắn muốn xóa '${
          oldItems.find((x) => x.id === delId).name
        }' không?`
      );
    } else if (type === "newItem") {
      setDeleteMessage(
        `Bạn chắc chắn muốn xóa '${
          newItems.find((x) => x.id === delId).name
        }' không?`
      );
    }
    console.log("asd");

    setDisplayConfirmationModal(true);
  };
  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = async (type, delId) => {
    const tokenAccount = localStorage.getItem("tokenAccount");

    if (type === "oldItem") {
      await suppliesService.deleteSupply(delId, tokenAccount);
      toast.success(
        `Xóa '${oldItems.find((x) => x.id === delId).name}' thành công.`
      );
      setOldItems(oldItems.filter((oldItem) => oldItem.id !== delId));
      getOldPage(oldSuplliesPage, token);
    } else if (type === "newItem") {
      await suppliesService.deleteSupply(delId, tokenAccount);
      toast.success(
        `Xóa '${newItems.find((x) => x.id === delId).name}' thành công.`
      );
      setNewItems(newItems.filter((newItem) => newItem.id !== delId));
      getNewPage(newSuplliesPage, token);
    }
    setDisplayConfirmationModal(false);
  };

  useEffect(() => {
    if (token) {
      getOldPage(oldSuplliesPage, token);
    }
  }, [oldSuplliesPage, token]);

  const handleNextOSPage = () => {
    setOldSuppliesPage((prev) => prev + 1);
  };
  const handlePreviousOSPage = () => {
    setOldSuppliesPage((prev) => prev - 1);
  };

  useEffect(() => {
        if (token) {
            getNewPage(newSuplliesPage, token);
        }
    }, [newSuplliesPage, token]);

    const handleNextNSPage = () => {
        setNewSuppliesPage((prev) => prev + 1);
    };
    const handlePreviousNSPage = () => {
        setNewSuppliesPage((prev) => prev - 1);
    };

    const InputSupplyName = () => {
        const handleSearchByName = async (name) => {
            const tokenSearchName = localStorage.getItem("tokenAccount");
            const data = await suppliesService.getOldSuppliesPage(oldSuplliesPage, tokenSearchName, "Tên vật tư", name);
            setOldSuppliesPage(data);
            setOldItems(data);
            console.log(tokenSearchName)
            console.log(data);
        };

        return (
            <>
                <Formik
                    initialValues={{
                        search: "",
                    }}
                >
                    <Form>
                        <Field
                            className="form-control me-2"
                            type="text"
                            placeholder="Tên vật tư"
                            name="search"
                            onChange={(value) => {
                                handleSearchByName(value.target.value);
                            }}
                        />
                    </Form>
                </Formik>
            </>
        )
    };

    const InputSupplyTypes = () => {
        const [category, setCategory] = useState([]);

        useEffect(() => {
            getCategory();
        }, []);

        const getCategory = async () => {
            const list = await suppliesService.getCategories();
            setCategory(list);
        }

        const handleSearchByCategory = async (type) => {
            const data = await suppliesService.getOldSuppliesPage(oldSuplliesPage, token, "Loại vật tư", type);
            setOldSuppliesPage(data);
        };

        return (
            <>
                <Formik
                    initialValues={
                        {
                            category: JSON.stringify(oldItems.category)
                        }
                    }
                >
                    <Form>
                        <Field as="select" name="category" className="form-select"
                               onChange={() => handleSearchByCategory()}
                            >
                            {category.map((value) => (
                                <option value={JSON.stringify(value)}>{value.name}</option>
                            ))}
                        </Field>
                    </Form>
                </Formik>

            </>
        )
    };

    const InputSupplier = () => {
        const [supplier, setSupplier] = useState([]);

        useEffect(() => {
            getSupplier();
        }, []);

        const getSupplier = async () => {
            const list = await suppliesService.getSuppliers();
            setSupplier(list);
        }

        const handleSearchBySupplier = async (supplier) => {
            const data = await suppliesService.getOldSuppliesPage(oldSuplliesPage, token, "Nhà cung cấp", supplier);
            setOldSuppliesPage(data);
        };

        return (
            <>
                <Formik
                    initialValues={
                        {
                            supplier: JSON.stringify(supplier)
                        }
                    }
                >
                    <Form>
                        <Field as="select" name="category" className="form-select"
                               onChange={() => handleSearchBySupplier()}>
                            {supplier.map((value) => (
                                <option value={JSON.stringify(value)}>{value.name}</option>
                            ))}
                        </Field>
                    </Form>
                </Formik>

            </>

        )
    };

    // const InputExpiry = () => {
    //     const handleSearchByDate = async (page, token, fromDate, toDate) => {
    //         if (fromDate <= oldItems.expiry <= toDate) {
    //             const data = await suppliesService.getSuppliesByDate(oldSuplliesPage, token, fromDate, toDate);
    //             setOldSuppliesPage(data);
    //         }
    //     };
    //
    //     return (
    //         <>
    //             <Formik
    //                 initialValues={
    //                     {
    //                         fromDate: "",
    //                         toDate: ""
    //                     }
    //                 }
    //             >
    //                 <Form>
    //                     <label> Chọn ngày: </label>
    //                     <span>
    //                         <Field type="date" name="fromDate"></Field>
    //                     </span>
    //                     <span> </span>
    //                     <span>
    //                     <Field type="date" name="toDate"></Field>
    //                     </span>
    //                     <br/>
    //                     <button onChange={() => handleSearchByDate()}>Tìm kiếm</button>
    //                 </Form>
    //             </Formik>
    //         </>
    //     )
    // };

    const handleSelect = (formName) => {
        setSelectedForm(formName);
    };

    return (
        <>
          <Container>
                <Row>
                    <Col md={{span: 10, offset: 1}}>
                        {/*Search menu*/}
                        <nav className="navbar " style={{backgroundColor: "white"}}>
                            <form className="search-menu">
                                <DropdownButton id="dropdown-button-dark-example2"
                                                variant="secondary"
                                                title={selectedForm ? `${selectedForm}` : 'Tìm kiếm'}
                                                style={{borderRadius: "0", width: "100px"}}
                                                onSelect={handleSelect}>
                                    <Dropdown.Item eventKey="Tên vật tư" >Tên vật tư</Dropdown.Item>
                                    <Dropdown.Item eventKey="Loại vật tư">Loại vật tư</Dropdown.Item>
                                    <Dropdown.Item eventKey="Nhà cung cấp">Nhà cung cấp</Dropdown.Item>
                                    <Dropdown.Item eventKey="Hạn sử dụng">Hạn sử dụng</Dropdown.Item>
                                </DropdownButton>

                                {/* Render the selected input form */}
                                {selectedForm === 'Tên vật tư' && <InputSupplyName/>}
                                {/*{selectedForm === 'Loại vật tư' && <InputSupplyTypes/>}*/}
                                {/*{selectedForm === 'Nhà cung cấp' && <InputSupplier/>}*/}
                                {/*{selectedForm === 'Hạn sử dụng' && <InputExpiry/>}*/}
                            </form>
                            <div className="create-button">
                                <NavLink to={"/supply/create"}>
                                    <button type="button" className="btn btn-success"
                                            style={{backgroundColor: "#26B24B", float: "right"}}>
                                        <span>Thêm mới</span>
                                    </button>
                                </NavLink>
                            </div>
                        </nav>

                        <br/>

                        <Card className="mt-2">
                            <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư
                                cũ</Card.Header>
                            <Card.Body style={{height: "300px"}}>
                                {oldItems ?
                                    <Table table hover size="sm">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-2"> Mã vật tư
                                            </th>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-3"> Tên vật tư
                                            </th>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-2"> Ngày nhập kho
                                            </th>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-2"> Hạn sử dụng
                                            </th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {oldItems.map((oldItem) => {
                                            return (
                                                <tr key={oldItem.id}>
                                                    <td style={{ verticalAlign: "middle", textAlign: "center", fontWeight: "bold"}}>{oldItem.code}</td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        <NavLink to={`/supply/list/${oldItem.id}`}
                                                                 style={{textDecoration: "none", color: "black"}}>
                                                            {oldItem.name}
                                                        </NavLink>
                                                    </td>
                                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>{oldItem.importDate}</td>
                                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>{oldItem.expiry}</td>
                                                    <td className='text-center' style={{verticalAlign: "middle"}}>
                                                        <button className="btn btn-warning"
                                                                style={{backgroundColor: "#F58220", color: "white"}}
                                                                onClick={() => showDeleteModal("oldItem", oldItem.id)}>
                                                            Xóa
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <NavLink to={`/supply/update/${oldItem.id}`}>
                                                            <button className="btn btn-success" style={{backgroundColor: "#26B24B", border: "#26B24B"}}>
                                                                Chỉnh sửa
                                                            </button>
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                    : <h5 style={{textAlign: "center"}}>Không có vật tư nào được tìm thấy!</h5>}
                            </Card.Body>

                            {/*/!*Pagination*!/*/}
                            {oldItems && totalOSPages > 1 ?
                                <div
                                    style={{display: "flex", justifyContent: "center",marginTop: "50px",}}
                                >
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                {oldSuplliesPage > 0 && (
                                                    <button className="page-link" onClick={handlePreviousOSPage}
                                                            style={{textDecoration: "none", color: "black"}}
                                                    >
                                                        Trang trước
                                                    </button>
                                                )}
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link"style={{textDecoration: "none", color: "black"}}>{oldSuplliesPage + 1}</span>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link" style={{textDecoration: "none", color: "black"}}>/</span>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link" style={{textDecoration: "none", color: "black"}}>{totalOSPages}</span>
                                            </li>
                                            <li className="page-item">
                                                {oldSuplliesPage + 1 !== totalOSPages && (
                                                    <button className="page-link" onClick={handleNextOSPage}
                                                            style={{textDecoration: "none", color: "black"}}
                                                    >
                                                        Trang sau
                                                    </button>
                                                )}
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                : ""}
                        </Card>
                        <br/>
                        <br/>

                        <Card className="mt-2">
                            <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư
                                mới</Card.Header>
                            <Card.Body style={{height: "300px"}}>
                                {newItems ?
                                    <Table table hover size="sm">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-2"> Mã vật tư
                                            </th>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-3"> Tên vật tư
                                            </th>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-2"> Ngày nhập kho
                                            </th>
                                            <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}
                                                className="col-2"> Hạn sử dụng
                                            </th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newItems.map((newItem) => {
                                            return (
                                                <tr key={newItem.id}>
                                                    <td style={{ verticalAlign: "middle", textAlign: "center", fontWeight: "bold"}}>{newItem.code}</td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        <NavLink to={`/supply/list/${newItem.id}`}
                                                                 style={{textDecoration: "none", color: "black"}}>
                                                            {newItem.name}
                                                        </NavLink>
                                                    </td>
                                                    <td style={{ verticalAlign: "middle", textAlign: "center"}}>{newItem.importDate}</td>
                                                    <td style={{ verticalAlign: "middle", textAlign: "center"}}>{newItem.expiry}</td>
                                                    <td className='text-center' style={{verticalAlign: "middle"}}>
                                                        <button className="btn btn-warning"
                                                                style={{backgroundColor: "#F58220", color: "white"}}
                                                                onClick={() => showDeleteModal("newItem", newItem.id)}>
                                                            Xóa
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <NavLink to={`/supply/update/${newItem.id}`}>
                                                            <button className="btn btn-success" style={{ backgroundColor: "#26B24B", border: "#26B24B"}}>
                                                                Chỉnh sửa
                                                            </button>
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                    : <h5 style={{textAlign: "center"}}>Không có vật tư nào được nhập mới!</h5>}
                            </Card.Body>

                            {/*Pagination*/}
                            {newItems && totalNSPages > 1 ?
                                <div
                                    style={{ display: "flex", justifyContent: "center", marginTop: "50px"}}
                                >
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                {newSuplliesPage > 0 && (
                                                    <button className="page-link" onClick={handlePreviousNSPage}
                                                            style={{textDecoration: "none", color: "black"}}
                                                    >
                                                        Trang trước
                                                    </button>
                                                )}
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link" style={{textDecoration: "none", color: "black"}}>{newSuplliesPage + 1}</span>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link" style={{textDecoration: "none", color: "black"}}>/</span>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link" style={{textDecoration: "none", color: "black"}}>{totalNSPages}</span>
                                            </li>
                                            <li className="page-item">
                                                {newSuplliesPage + 1 !== totalNSPages && (
                                                    <button className="page-link" onClick={handleNextNSPage}
                                                            style={{textDecoration: "none", color: "black"}}
                                                    >
                                                        Trang sau
                                                    </button>
                                                )}
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                : " "}
                        </Card>
                    </Col>
                </Row>
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete}
                                    hideModal={hideConfirmationModal} type={type} id={delId} message={deleteMessage}/>

            </Container>
        </>
    )
}
