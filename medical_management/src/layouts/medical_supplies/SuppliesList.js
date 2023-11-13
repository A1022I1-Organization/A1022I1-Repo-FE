import {useEffect, useState} from "react";
import {Row, Col, Container, Card, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import {DropdownSearch} from "../../components/bootsrap/DropdownSearch";
import PaginationRanges, {Content} from "../../components/pagination/SupplyPagination";
import * as suppliesService from "../../services/medical_supplies/MedicalSupplyService";
import "../../components/css/style.css";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

export function SuppliesList() {
    // Set up a list of oldItem and newItem
    const [oldItems, setOldItems] = useState([]);
    const [newItems, setNewItems] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const [token, setToken] = useState();

    const [type, setType] = useState(null);
    const [delId, setDelId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

    useEffect(() => {
        getOldSupplies();
        getNewSupplies();
        getTokenFromLocalStorage();
        if (token) {
            getOldPage(page, token);
            getNewPage(page, token);
        }
    }, [page, token]);

    const getTokenFromLocalStorage = async () => {
        const token = await localStorage.getItem("token");
        setToken(token);
    };

    const getOldSupplies = async () => {
        const list = await suppliesService.getOldSupplies();
        setOldItems(list);
    }

    const getNewSupplies = async () => {
        const list = await suppliesService.getNewSupplies();
        setNewItems(list);
    }

    const getOldPage = async (page, token) => {
        const [data, totalPage] = await suppliesService.getPage(page, token);
        setTotalPages(totalPage);
        setOldItems(data);
    };

    const getNewPage = async (page, token) => {
        const [data, totalPage] = await suppliesService.getPage(page, token);
        setTotalPages(totalPage);
        setNewItems(data);
    };

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
    };
    const handlePreviousPage = () => {
        setPage((prev) => prev - 1);
    };

    // Handle the displaying of the modal based on type and id
    const showDeleteModal = (type, delId) => {
        setType(type);
        setDelId(delId);
        if (type === "oldItem") {

            setDeleteMessage(`Bạn chắc chắn muốn xóa '${oldItems.find((x) => x.id === delId).name}' không?`);
        } else if (type === "newItem") {

            setDeleteMessage(`Bạn chắc chắn muốn xóa '${newItems.find((x) => x.id === delId).name}' không?`);
        }
        console.log("asd")

        setDisplayConfirmationModal(true);
    };
    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    // Handle the actual deletion of the item
    const submitDelete = async (type, delId) => {
        if (type === "oldItem") {
            await suppliesService.deleteSupply(delId);
            toast.success(`Xóa '${oldItems.find((x) => x.id === delId).name}' thành công.`);
            setOldItems(oldItems.filter((oldItem) => oldItem.id !== delId));
        } else if (type === "newItem") {
            await suppliesService.deleteSupply(delId);
            toast.success(`Xóa '${newItems.find((x) => x.id === delId).name}' thành công.`);
            setNewItems(newItems.filter((newItem) => newItem.id !== delId));
        }
        setDisplayConfirmationModal(false);
    };
    console.log(oldItems)
    return (

        <>
            <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            {/*Search menu*/}
                            <nav className="navbar sticky-top" style={{backgroundColor: "white"}}>
                                <form className="search-menu">
                                    <DropdownSearch />
                                </form>
                                <div className="create-button">
                                    <button type="button" className="btn btn-success" style={{backgroundColor: "#26B24B", float: "right"}}>
                                        <span>Thêm mới</span>
                                    </button>
                                </div>
                            </nav>

                            <br/>

                            <Card className="mt-2">
                                <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư cũ</Card.Header>
                                <Card.Body>
                                    <Table table hover size="sm">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Mã vật tư </th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Tên vật tư </th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Số lượng</th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Ngày nhập kho </th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Hạn sử dụng </th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        {oldItems ?
                                        <tbody>
                                        {oldItems.map((oldItem) => {
                                            return (
                                                <tr key={oldItem.id}>
                                                    <td style={{verticalAlign: "middle"}}>{oldItem.code}</td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        <NavLink to={`/supply/list/${oldItem.id}`}
                                                                 style={{textDecoration: "none", color: "black"}}>
                                                            {oldItem.name}
                                                        </NavLink>
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>{oldItem.quantity}</td>
                                                    <td style={{verticalAlign: "middle"}}>{oldItem.importDate}</td>
                                                    <td style={{verticalAlign: "middle"}}>{oldItem.expiry}</td>
                                                    <td className='text-center' style={{verticalAlign: "middle"}}>
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
                                        </tbody> : "Không vật tư nào được tìm thấy!"}
                                    </Table>
                                </Card.Body>
                            </Card>
                            <br/>

                            {/*/!*Pagination*!/*/}
                            <PaginationRanges />
                            <br/>

                            <Card className="mt-2">
                                <Card.Header style={{textAlign: "center", fontSize: "30px", fontWeight: "bold"}}>Vật tư mới</Card.Header>
                                <Card.Body>
                                    <Table table hover size="sm">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Mã vật tư </th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Tên vật tư </th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Số lượng</th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Ngày nhập kho </th>
                                            <th scope="col" style={{verticalAlign: "middle"}}> Hạn sử dụng </th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        {newItems ?
                                        <tbody>
                                        {newItems.map((newItem) => {
                                            return (
                                                <tr key={newItem.id}>
                                                    <td style={{verticalAlign: "middle"}}>{newItem.code}</td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        <NavLink to={`/supply/list/${newItem.id}`}
                                                                 style={{textDecoration: "none", color: "black"}}>
                                                            {newItem.name}
                                                        </NavLink>
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>{newItem.quantity}</td>
                                                    <td style={{verticalAlign: "middle"}}>{newItem.importDate}</td>
                                                    <td style={{verticalAlign: "middle"}}>{newItem.expiry}</td>
                                                    <td className='text-center' style={{verticalAlign: "middle"}}>
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
                                        </tbody>: "Hôm nay không có vật tư nào được nhập mới!"}
                                    </Table>
                                </Card.Body>
                            </Card>
                            <br/>

                            {/*Pagination*/}
                            <PaginationRanges />
                            <br/>

                        </Col>
                    </Row>
                    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} id={delId} message={deleteMessage}  />
                {/*</Container>*/}
            </Container>

        </>
    )
}