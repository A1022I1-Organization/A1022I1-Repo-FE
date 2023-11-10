import axios from "axios";

export const getPage = async (page, token) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/supply/getPage?page=${page}&size=8`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return [response.data.content, response.data.totalPages];
    } catch (error) {
        console.error("Error fetching page:", error);
    }
};

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
        const result = await axios.get(`http://localhost:8080/api/supply/${id}`);
        console.log(id)

        return result.data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteSupply = async (id) => {
    try {
        const result = await axios.delete(`http://localhost:8080/supply/${id}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }
};