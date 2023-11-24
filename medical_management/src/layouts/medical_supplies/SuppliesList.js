import {useEffect, useState} from "react";
import {Row, Col, Container, Card, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as suppliesService from "../../services/medical_supplies/MedicalSupplyService";
import "../../components/css/style.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import * as React from "react";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import {Field, Form, Formik} from "formik";
import * as utilities from "../../services/medical_supplies/Utilities";

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
  const [category, setCategory] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');


  const token = localStorage.getItem("tokenAccount");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      setOldSuppliesPage(0);
    } else if (type === "newItem") {
      await suppliesService.deleteSupply(delId, tokenAccount);
      toast.success(
        `Xóa '${newItems.find((x) => x.id === delId).name}' thành công.`
      );
      setNewItems(newItems.filter((newItem) => newItem.id !== delId));
      setNewSuppliesPage(0);
    }
    setDisplayConfirmationModal(false);
  };

  useEffect(() => {
      const getOldPage = async (page, token) => {
          try {
              // Gọi API để lấy dữ liệu trang hiện tại
              const [data, totalPage] = await suppliesService.getOldSuppliesPage(page, token);
              setTotalOSPages(totalPage);
              setOldItems(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

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

    const handleSearchByName = async (searchName) => {
        const tokenSearchName = localStorage.getItem("tokenAccount");
        const [data, totalPage] = await suppliesService.getOldSuppliesPage(oldSuplliesPage, tokenSearchName, "name", searchName);
        setTotalOSPages(totalPage);
        setOldItems(data);
    };

    useEffect(() => {
        getCategory();
        getSupplier();
    }, []);

    const getCategory = async () => {
        const data = await suppliesService.getCategories();
        setCategory(data);
    };

    const handleSearchByCategory = async (type) => {
        const tokenSearchType = localStorage.getItem("tokenAccount");

        const [data, totalPage] = await suppliesService.getOldSuppliesPage(oldSuplliesPage, tokenSearchType, "category", type);
        setTotalOSPages(totalPage);
        setOldItems(data);
    };


    const getSupplier = async () => {
        const list = await suppliesService.getSuppliers();
        setSupplier(list);
    }

    const handleSearchBySupplier = async (supplier) => {
        const tokenSearchSupplier = localStorage.getItem("tokenAccount");

        const [data, totalPage] = await suppliesService.getOldSuppliesPage(oldSuplliesPage, tokenSearchSupplier, "supplier", supplier);
        setTotalOSPages(totalPage);
        setOldItems(data);
    };

    const handleFromDate = (event) => {
        setFromDate(event.target.value);
    }

    const handleToDate = (event) => {
        setToDate(event.target.value);
    }

    const handleSearchByDate = async (fromDate, toDate) => {
        const tokenSearchDate = localStorage.getItem("tokenAccount");

        if (fromDate <= oldItems.expiry <= toDate) {
            const [data, totalPage] = await suppliesService.getOldSuppliesPage(oldSuplliesPage, tokenSearchDate, "expiry", fromDate, toDate);
            setTotalOSPages(totalPage);
            setOldItems(data);
        }
    };

    const handleSelect = (formName) => {
        setSelectedForm(formName);
    };

    return (
        <>
          <Container>
                <Row>
                    <Col md={{span: 10, offset: 1}}>
                        {/*Search menu*/}
                        <nav className="navbar " style={{ height: "100px"}}>
                            <form className="search-menu">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-secondary" id="dropdownMenuButton1">Tìm kiếm</button>
                                    <button type="button" id="dropdownMenuButton2"
                                            className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1" >
                                        <li><span className="dropdown-item" onClick={() => {handleSelect("name")}}>Tên vật tư</span></li>
                                        <li><span className="dropdown-item" onClick={() => {handleSelect("category")}}>Loại vật tư</span></li>
                                        <li><span className="dropdown-item" onClick={() => {handleSelect("supplier")}}>Nhà cung cấp</span></li>
                                        <li><span className="dropdown-item" onClick={() => {handleSelect("expiry")}}>Hạn sử dụng</span></li>
                                    </ul>
                                </div>

                                {/* Render the selected input form */}
                                {selectedForm === 'name' &&
                                    <>
                                        <Formik>
                                            <Form>
                                                <input
                                                    className="form-control me-2"
                                                    type="text"
                                                    placeholder="Tên vật tư"
                                                    onChange={(e) => handleSearchByName(e.target.value)}
                                                />
                                            </Form>
                                        </Formik>
                                    </>}
                                {selectedForm === 'category' &&
                                    <>
                                        <Formik>
                                            <Form>
                                                <Field as="select" name="category" className="form-select"
                                                       onChange={(e) => handleSearchByCategory(e.target.value)}
                                                >
                                                    <option>--Chọn loại vật tư--</option>
                                                    {category.map((value) => (
                                                        <option value={value.name}>{value.name}</option>
                                                    ))}
                                                </Field>
                                            </Form>
                                        </Formik>
                                    </>
                                }
                                {selectedForm === 'supplier' &&
                                    <>
                                        <Formik>
                                            <Form>
                                                <Field as="select" name="category" className="form-select"
                                                       onChange={(e) => handleSearchBySupplier(e.target.value)}>
                                                    <option>--Chọn nhà cung cấp--</option>
                                                    {supplier.map((value) => (
                                                        <option value={value.name}>{value.name}</option>
                                                    ))}
                                                </Field>
                                            </Form>
                                        </Formik>

                                    </>
                                }
                                {selectedForm === 'expiry' &&
                                    <>
                                        <Formik>
                                            <Form>
                                                <label> Chọn hạn sử dụng: </label>
                                                <span style={{paddingLeft: "10px", paddingRight: "5px"}}>
                                                    <input type="date" name={fromDate} onChange={handleFromDate}></input>
                                                </span>
                                                <span> </span>
                                                <span style={{paddingLeft: "5px", paddingRight: "5px"}}>
                                                    <input type="date" name={toDate} onChange={handleToDate}></input>
                                                </span>
                                                <span>
                                                    <button type="submit" className="btn btn-secondary"
                                                            onSubmit={handleSearchByDate}
                                                            style={{height: "30px", paddingTop: "0", paddingBottom: "0", marginBottom: "5px"}}
                                                    >Tìm</button>
                                                </span>
                                            </Form>
                                        </Formik>
                                    </>
                                }
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
                            <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư cũ</Card.Header>

                            <Card.Body style={{height: "375px"}}>
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
                                                                 style={{textDecoration: "none",
                                                                     color: "black",
                                                                     display: "inline-block",
                                                                     whiteSpace: "nowrap",
                                                                     overflow: "hidden",
                                                                     textOverflow: "ellipsis",
                                                                     maxWidth: "25ch"}}>
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
                                    {/*Pagination*/}
                                    {totalOSPages > 1 ?
                                        <div style={{display: "flex", justifyContent: "center",marginTop: "40px",}}>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        {oldSuplliesPage > 0 && (
                                                            <button className="page-link" onClick={handlePreviousOSPage}
                                                                    style={{textDecoration: "none", color: "black"}}>
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
                                                                    style={{textDecoration: "none", color: "black"}}>
                                                                Trang sau
                                                            </button>
                                                        )}
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    : ""}
                            </Card.Body>
                        </Card>
                        <br/>
                        <br/>

                        <Card className="mt-2">
                            <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư
                                mới</Card.Header>
                            <Card.Body style={{height: "375px"}}>
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
                                {/*Pagination*/}
                                {totalNSPages > 1 ?
                                    <div
                                        style={{ display: "flex", justifyContent: "center", marginTop: "40px"}}
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
                            </Card.Body>


                        </Card>
                    </Col>
                </Row>
             <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete}
                                    hideModal={hideConfirmationModal} type={type} id={delId} message={deleteMessage}/>

            </Container>
        </>
    )
}