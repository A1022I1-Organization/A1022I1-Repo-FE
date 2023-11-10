import axios from "axios";

export const addNewSupply = async(value) => {
    try {
        const result = await axios.post("http://localhost:8080/api/supply/add", value);
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateSupply = async(id, value) => {
    try {
        const result = await axios.patch(`http://localhost:8080/api/supply/update/${id}`, value);
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

export const getCategories = async() => {
    try {
        const result = await axios.get(`http://localhost:8080/api/supply/getCategory`);
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

export const getSuppliers = async() => {
    try {
        const result = await axios.get(`http://localhost:8080/api/supply/getSupplier`);
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

export const getUnits = async() => {
    try {
        const result = await axios.get(`http://localhost:8080/api/supply/getUnit`);
        return result.data;
    } catch (e) {
        console.log(e)
    }
}

// export const getAccounts = async() => {
//     try {
//         const result = await axios.patch(`http://localhost:8080/api/medical/getAccount`);
//         return result.data;
//     } catch (e) {
//         console.log(e)
//     }
// }