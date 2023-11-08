import axios from "axios";

export const getOldSupplies = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/supply/oldSupplies");
        console.log(result)
        return result.data.content;
    } catch (e) {
        console.log(e);
    }
};

export const getNewSupplies = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/supply/newSupplies");
        return result.data.content;
    } catch (e) {
        console.log(e);
    }
};

export const getSupply = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8081/api/supply/${id}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }
};