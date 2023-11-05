import {Dropdown, InputGroup} from "react-bootstrap";
import "../css/style.css";

export function DropdownSearch() {
    return (
        <>
            <Dropdown as={InputGroup}>
                <input className="form-control" placeholder="Tìm kiếm" />

                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" style={{backgroundColor: 'gray'}} active>Tên vật tư</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Loại vật tư</Dropdown.Item>
                    <Dropdown.Item eventKey="1">Nhà cung cấp</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Hạn sử dụng</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}