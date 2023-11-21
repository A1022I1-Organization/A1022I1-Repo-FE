import {Button, Dropdown, DropdownButton, Form, InputGroup} from "react-bootstrap";
import "../css/style.css";
import React, {useEffect, useState} from "react";
import * as service from "../../services/medical_supplies/MedicalSupplyService";

const InputSupplyName = () => {
    return(
        <>
            <InputGroup className="mb-3">
                <Form.Control type="text"
                              placeholder="Tên vật tư"
                    // onChange={(value) => {
                    //         handleSearchByName(value.target.value);
                    //     }}
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
        </>

    )
};

const InputSupplyTypes = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        const list = await service.getCategories();
        setCategory(list);
    }

    // const handleSearchByCategory = async (category) => {
    //     const data = await service.searchByCategory(category);
    //     setList(data);
    // };

    return(
        <>
            <Form>
                <Form.Select id="types"
                             name="types"
                             // onChange={(e) => handleSearchByCategory(e.target.value)}
                >
                    {category.map((value) => (
                        <option value={value.name} key={value.id}>
                            {value.name}
                        </option>
                    ))}
                </Form.Select>
            </Form>
        </>
    )
};

const InputSupplier = () => {
    return(
        <>
            <Form>
                <Form.Select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Form.Select>
            </Form>
        </>
    )
};

const InputExpiry = () => {
    return(
        <>
            <span>From day: </span>
            <span>
                <input type="date"/>
            </span>
            <span>To day: </span>
            <span>
                <input type="date"/>
            </span>

        </>
    )
}

export function DropdownSearch() {
    const [selectedForm, setSelectedForm] = useState(null);

    const handleSelect = (formName) => {
        setSelectedForm(formName);
    };

    return (
        <>
            <DropdownButton id="dropdown-button-dark-example2"
                            variant="secondary"
                            title={selectedForm ? `Tìm kiếm: ${selectedForm}` : 'Tìm kiếm'}
                            onSelect={handleSelect}>
                <Dropdown.Item eventKey="Supplies">Tên vật tư</Dropdown.Item>
                <Dropdown.Item eventKey="Types">Loại vật tư</Dropdown.Item>
                <Dropdown.Item eventKey="Supplier">Nhà cung cấp</Dropdown.Item>
                <Dropdown.Item eventKey="Expiry">Hạn sử dụng</Dropdown.Item>
            </DropdownButton>

            {/* Render the selected input form */}
            {selectedForm === 'Supplies' && <InputSupplyName />}
            {selectedForm === 'Types' && <InputSupplyTypes />}
            {selectedForm === 'Supplier' && <InputSupplier />}
            {selectedForm === 'Expiry' && <InputExpiry />}
        </>
    )
}