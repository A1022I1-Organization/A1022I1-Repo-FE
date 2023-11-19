import { useEffect, useState } from "react";
import { Row, Col, Container, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownSearch } from "../../components/bootsrap/DropdownSearch";
import * as suppliesService from "../../services/medical_supplies/MedicalSupplyService";
import "../../components/css/style.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import * as React from "react";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import MediaQuery from "react-responsive";

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
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const token = localStorage.getItem("tokenAccount");

  const getOldPage = async (page, token) => {
    const [data, totalPage] = await suppliesService.getOldSuppliesPage(
      page,
      token
    );
    setTotalOSPages(totalPage);
    setOldItems(data);
  };

  const getNewPage = async (page, token) => {
    const [data, totalPage] = await suppliesService.getNewSuppliesPage(
      page,
      token
    );
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
      await suppliesService.deleteSupply(delId);
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

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            {/*Search menu*/}
            <nav className="navbar " style={{ backgroundColor: "white" }}>
              <form className="search-menu">
                <DropdownSearch />
              </form>
              <div className="create-button">
                <NavLink to={"/supply/create"}>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ backgroundColor: "#26B24B", float: "right" }}
                  >
                    <span>Thêm mới</span>
                  </button>
                </NavLink>
              </div>
            </nav>

            <br />

            <Card className="mt-2">
              <Card.Header
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Vật tư cũ
              </Card.Header>
              <Card.Body style={{ height: "300px" }}>
                {oldItems ? (
                  <Table table hover size="sm">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-2"
                        >
                          {" "}
                          Mã vật tư{" "}
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-3"
                        >
                          {" "}
                          Tên vật tư{" "}
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-1"
                        >
                          {" "}
                          Số lượng
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-2"
                        >
                          {" "}
                          Ngày nhập kho{" "}
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-2"
                        >
                          {" "}
                          Hạn sử dụng{" "}
                        </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {oldItems.map((oldItem) => {
                        return (
                          <tr key={oldItem.id}>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {oldItem.code}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <NavLink
                                to={`/supply/list/${oldItem.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {oldItem.name}
                              </NavLink>
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              {oldItem.quantity}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              {oldItem.importDate}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              {oldItem.expiry}
                            </td>
                            <td
                              className="text-center"
                              style={{ verticalAlign: "middle" }}
                            >
                              <button
                                className="btn btn-warning"
                                style={{
                                  backgroundColor: "#F58220",
                                  color: "white",
                                }}
                                onClick={() =>
                                  showDeleteModal("oldItem", oldItem.id)
                                }
                              >
                                Xóa
                              </button>
                              <NavLink to={`/supply/update/${oldItem.id}`}>
                                <button
                                  className="btn btn-success"
                                  style={{
                                    backgroundColor: "#26B24B",
                                    border: "#26B24B",
                                  }}
                                >
                                  Chỉnh sửa
                                </button>
                              </NavLink>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h5 style={{ textAlign: "center" }}>
                    Không có vật tư nào được tìm thấy!
                  </h5>
                )}
              </Card.Body>

              {/*/!*Pagination*!/*/}
              {oldItems && totalOSPages > 1 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        {oldSuplliesPage > 0 && (
                          <button
                            className="page-link"
                            onClick={handlePreviousOSPage}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Previous
                          </button>
                        )}
                      </li>
                      <li className="page-item">
                        <span
                          className="page-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {oldSuplliesPage + 1}
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          className="page-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          /
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          className="page-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {totalOSPages}
                        </span>
                      </li>
                      <li className="page-item">
                        {oldSuplliesPage + 1 !== totalOSPages && (
                          <button
                            className="page-link"
                            onClick={handleNextOSPage}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Next
                          </button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                ""
              )}
            </Card>
            <br />
            <br />

            <Card className="mt-2">
              <Card.Header
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Vật tư mới
              </Card.Header>
              <Card.Body style={{ height: "300px" }}>
                {newItems ? (
                  <Table table hover size="sm">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-2"
                        >
                          {" "}
                          Mã vật tư{" "}
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-3"
                        >
                          {" "}
                          Tên vật tư{" "}
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-1"
                        >
                          {" "}
                          Số lượng
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-2"
                        >
                          {" "}
                          Ngày nhập kho{" "}
                        </th>
                        <th
                          scope="col"
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                          className="col-2"
                        >
                          {" "}
                          Hạn sử dụng{" "}
                        </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newItems.map((newItem) => {
                        return (
                          <tr key={newItem.id}>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {newItem.code}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <NavLink
                                to={`/supply/list/${newItem.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {newItem.name}
                              </NavLink>
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              {newItem.quantity}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              {newItem.importDate}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                              }}
                            >
                              {newItem.expiry}
                            </td>
                            <td
                              className="text-center"
                              style={{ verticalAlign: "middle" }}
                            >
                              <button
                                className="btn btn-warning"
                                style={{
                                  backgroundColor: "#F58220",
                                  color: "white",
                                }}
                                onClick={() =>
                                  showDeleteModal("newItem", newItem.id)
                                }
                              >
                                Xóa
                              </button>
                              <NavLink to={`/supply/update/${newItem.id}`}>
                                <button
                                  className="btn btn-success"
                                  style={{
                                    backgroundColor: "#26B24B",
                                    border: "#26B24B",
                                  }}
                                >
                                  Chỉnh sửa
                                </button>
                              </NavLink>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h5 style={{ textAlign: "center" }}>
                    Không có vật tư nào được nhập mới!
                  </h5>
                )}
              </Card.Body>

              {/*Pagination*/}
              {newItems && totalNSPages > 1 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        {newSuplliesPage > 0 && (
                          <button
                            className="page-link"
                            onClick={handlePreviousNSPage}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Previous
                          </button>
                        )}
                      </li>
                      <li className="page-item">
                        <span
                          className="page-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {newSuplliesPage + 1}
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          className="page-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          /
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          className="page-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {totalNSPages}
                        </span>
                      </li>
                      <li className="page-item">
                        {newSuplliesPage + 1 !== totalNSPages && (
                          <button
                            className="page-link"
                            onClick={handleNextNSPage}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Next
                          </button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                " "
              )}
            </Card>
          </Col>
        </Row>
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          type={type}
          id={delId}
          message={deleteMessage}
        />
        {/*    </MediaQuery>*/}
        {/*</MediaQuery>*/}
      </Container>
    </>
  );
}
