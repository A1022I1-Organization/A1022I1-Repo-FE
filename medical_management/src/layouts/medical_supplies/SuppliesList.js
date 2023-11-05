import { useState } from "react";
import {Row, Col, Container, Card, Table, Alert, NavLink} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import {DropdownSearch} from "../../components/bootsrap/DropdownSearch";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {Content} from "../../components/pagination/SupplyPagination";

export function SuppliesList() {
    // Set up a list of oldItem and newItem
    const [oldItems, setOldItems] = useState([
        { id: 1,
            code: "VT - 123",
            oldName: "Bông y tế",
            quantity: 15,
            importDate: "17/01/2023",
            expiry: "17/11/2023"
        },
        { id: 2,
            code: "VT - 124",
            oldName: "Bông y tế",
            quantity: 15,
            importDate: "17/01/2023",
            expiry: "17/11/2023"
        },
        { id: 3,
            code: "VT - 125",
            oldName: "Bông y tế",
            quantity: 15,
            importDate: "17/01/2023",
            expiry: "17/11/2023"
        },
        { id: 4,
            code: "VT - 126",
            oldName: "Bông y tế",
            quantity: 15,
            importDate: "17/01/2023",
            expiry: "17/11/2023"
        },
        { id: 5,
            code: "VT - 127",
            oldName: "Bông y tế",
            quantity: 15,
            importDate: "17/01/2023",
            expiry: "17/11/2023"
        },
    ]);

    const [newItems, setNewItems] = useState([
        { id: 6,
            code: "VT - 345",
            newName: "Kim tiêm",
            quantity: 25,
            importDate: "01/10/2023",
            expiry: "01/10/2024"
        },
        { id: 7,
            code: "VT - 346",
            newName: "Kim tiêm",
            quantity: 25,
            importDate: "01/10/2023",
            expiry: "01/10/2024"
        },
        { id: 8,
            code: "VT - 347",
            newName: "Kim tiêm",
            quantity: 25,
            importDate: "01/10/2023",
            expiry: "01/10/2024"
        },
        { id: 9,
            code: "VT - 348",
            newName: "Kim tiêm",
            quantity: 25,
            importDate: "01/10/2023",
            expiry: "01/10/2024"
        },
        { id: 10,
            code: "VT - 349",
            newName: "Kim tiêm",
            quantity: 25,
            importDate: "01/10/2023",
            expiry: "01/10/2024"
        },
    ]);

    const [type, setType] = useState(null);
    const [delId, setDelId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [newItemMessage, setNewItemMessage] = useState(null);
    const [oldItemMessage, setOldItemMessage] = useState(null);

    // Handle the displaying of the modal based on type and id
    const showDeleteModal = (type, delId) => {
        setType(type);
        setDelId(delId);
        setOldItemMessage(null);
        setNewItemMessage(null);
        if (type === "oldItem") {

            setDeleteMessage(`Bạn chắc chắn muốn xóa '${oldItems.find((x) => x.id === delId).oldName}' không?`);
        } else if (type === "newItem") {

            setDeleteMessage(`Bạn chắc chắn muốn xóa '${newItems.find((x) => x.id === delId).newName}' không?`);
        }
        console.log("asd")

        setDisplayConfirmationModal(true);
    };

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    // Handle the actual deletion of the item
    const submitDelete = (type, delId) => {
        if (type === "oldItem") {
            setOldItemMessage(`Xóa '${oldItems.find((x) => x.id === delId).oldName}' thành công.`);
            setOldItems(oldItems.filter((oldItem) => oldItem.id !== delId));
        } else if (type === "newItem") {
            setNewItemMessage(`Xóa '${newItems.find((x) => x.id === delId).newName}' thành công.`);
            setNewItems(newItems.filter((newItem) => newItem.id !== delId));
        }
        setDisplayConfirmationModal(false);
    };

    return (
        <>
            <Container>
                 {/*Search menu*/}
                <nav className="navbar sticky-top" style={{backgroundColor: "white"}}>
                    <div className="container-fluid">
                        <form className="search-menu">
                            <DropdownSearch />
                        </form>
                        <div className="create-button">
                            <button type="button" className="btn btn-success" style={{backgroundColor: "#26B24B", float: "right"}}>
                                <span>Thêm mới</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <br/>

                {/*<Container>*/}
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <h1 style={{textAlign: "center"}}>Thông tin vật tư</h1>
                            <Card className="mt-2">
                                <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư cũ</Card.Header>
                                <Card.Body>
                                    {oldItemMessage && <Alert variant="success">{oldItemMessage}</Alert>}
                                    <Table table hover size="sm">
                                        <thead>
                                        <tr>
                                            <th scope="col"> Mã vật tư </th>
                                            <th scope="col"> Tên vật tư </th>
                                            <th scope="col"> Số lượng</th>
                                            <th scope="col"> Ngày nhập kho </th>
                                            <th scope="col"> Hạn sử dụng </th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {oldItems.map((oldItem) => {
                                            return (
                                                <tr key={oldItem.id}>
                                                    <td>{oldItem.code}</td>
                                                    <td>
                                                        <NavLink to={'#'}
                                                                 style={{textDecoration: "none", color: "black"}}>
                                                            {oldItem.oldName}
                                                        </NavLink>
                                                    </td>
                                                    <td>{oldItem.quantity}</td>
                                                    <td>{oldItem.importDate}</td>
                                                    <td>{oldItem.expiry}</td>
                                                    <td className='text-center'>
                                                        <button className="btn btn-warning" style={{backgroundColor: "#F58220", color: "white"}}
                                                                onClick={() => showDeleteModal("oldItem", oldItem.id)} >
                                                            Xóa
                                                        </button>
                                                        <button className="btn btn-success" style={{backgroundColor: "#26B24B", border: "#26B24B"}}>
                                                            Chỉnh sửa
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <br/>

                            {/*Pagination*/}
                            <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
                                <Routes>
                                    <Route path="*" element={<Content />} />
                                </Routes>
                            </MemoryRouter>
                            <br/>

                            <Card className="mt-2">
                                <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư mới</Card.Header>
                                <Card.Body>
                                    {newItemMessage && <Alert variant="success">{newItemMessage}</Alert>}
                                    <Table table hover size="sm">
                                        <thead>
                                        <tr>
                                            <th scope="col"> Mã vật tư </th>
                                            <th scope="col"> Tên vật tư </th>
                                            <th scope="col"> Số lượng</th>
                                            <th scope="col"> Ngày nhập kho </th>
                                            <th scope="col"> Hạn sử dụng </th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newItems.map((newItem) => {
                                            return (
                                                <tr key={newItem.id}>
                                                    <td>{newItem.code}</td>
                                                    <td>
                                                        <NavLink to={`#`}
                                                                 style={{textDecoration: "none", color: "black"}}>
                                                            {newItem.newName}
                                                        </NavLink>
                                                    </td>
                                                    <td>{newItem.quantity}</td>
                                                    <td>{newItem.importDate}</td>
                                                    <td>{newItem.expiry}</td>
                                                    <td className='text-center'>
                                                        <button className="btn btn-warning" style={{backgroundColor: "#F58220", color: "white"}}
                                                                onClick={() => showDeleteModal("newItem", newItem.id)} >
                                                        Xóa
                                                        </button>
                                                        <button className="btn btn-success" style={{backgroundColor: "#26B24B", border: "#26B24B"}}>
                                                        Chỉnh sửa
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <br/>

                            {/*Pagination*/}
                            <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
                                <Routes>
                                    <Route path="*" element={<Content />} />
                                </Routes>
                            </MemoryRouter>
                            <br/>

                        </Col>
                    </Row>
                    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} id={delId} message={deleteMessage}  />
                {/*</Container>*/}
            </Container>

        </>
    )
}