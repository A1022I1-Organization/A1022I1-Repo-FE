import * as supplierService from "../../services/medical_supplies/MedicalSupplyService";
import {DELETE_SUPPLY, GET_SUPPLIES} from "../Type";


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

export const getOldSupplies = () => async (dispatch) => {
    const res = await supplierService.getOldSupplies();
    dispatch({
        type: GET_SUPPLIES,
        payload: res
    })
};

export const getNewSupplies = () => async (dispatch) => {
    const res = await supplierService.getNewSupplies();
    dispatch({
        type: GET_SUPPLIES,
        payload: res
    })
};

export const deleteSupply = (id) => async (dispatch) => {
    const res = await supplierService.deleteSupply(id);
    dispatch({
        type: DELETE_SUPPLY,
        payload: res
    })
};