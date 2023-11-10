import * as supplierService from "../../services/medical_supplies/MedicalSupplyService";


export const addNewSupply = (value) => async(dispatch) => {
    const res = await supplierService.addNewSupply(value);
    dispatch({
        type: "add_supply",
        payload: res,
    });
}

export const updateSupply = (id, value) => async(dispatch) => {
    const res = await supplierService.updateSupply(id, value);
    dispatch({
        type: "update_supply",
        payload: res,
    });
}