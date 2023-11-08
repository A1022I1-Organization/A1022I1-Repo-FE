import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, type, message }) => {
    console.log(showModal)
    return (

        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa vật tư</Modal.Title>
            </Modal.Header>
            <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Hủy
                </Button>
                <Button style={{backgroundColor: "#F58220", border: "#F58220"}} onClick={() => confirmModal(type, id) }>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation;