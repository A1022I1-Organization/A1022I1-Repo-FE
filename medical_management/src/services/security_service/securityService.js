import axios from "axios";

export const loginByAccount = async (account) => {
  try {
    const result = await axios.post("http://localhost:8080/api/login", account);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
