import axios from "axios";

export const addNew = async (value) => {
    try {
        const result = await axios.post("http://localhost:8080/api/account", value);
        console.log(result)
        return result.data.content;
    } catch (e) {
        console.log(e);
    }
};