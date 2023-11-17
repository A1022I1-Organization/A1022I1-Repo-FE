import axios from "axios";

export const getOldSuppliesPage = async (page, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/supply/oldSupplies?page=${page}&size=5`,
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

export const getNewSuppliesPage = async (page, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/supply/newSupplies?page=${page}&size=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return [response.data.content, response.data.totalPages];
  } catch (error) {
    console.error("Error fetching page:", error);
  }
};

export const addNewSupply = async (value) => {
  try {
    const result = await axios.post(
      "http://localhost:8080/api/supply/add",
      value
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateSupply = async (id, value) => {
  try {
    const result = await axios.patch(
      `http://localhost:8080/api/supply/update/${id}`,
      value
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCategories = async () => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/supply/getCategory`
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getSuppliers = async () => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/supply/getSupplier`
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUnits = async () => {
  try {
    const result = await axios.get(`http://localhost:8080/api/supply/getUnit`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

// export const getAccounts = async() => {
//     try {
//         const result = await axios.patch(`http://localhost:8080/api/medical/getAccount`);
//         return result.data;
//     } catch (e) {
//         console.log(e)
//     }
// }

export const getOldSupplies = async (token) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/supply/oldSupplies",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data.content;
  } catch (e) {
    console.log(e);
  }
};

export const getNewSupplies = async (token) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/supply/newSupplies",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data.content;
  } catch (e) {
    console.log(e);
  }
};

export const getSupply = async (id) => {
  try {
    const result = await axios.get(`http://localhost:8080/api/supply/${id}`);
    console.log(id);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSupply = async (id) => {
<<<<<<< HEAD
  try {
    const result = await axios.delete(`http://localhost:8080/api/supply/${id}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
=======

    try {
        const result = await axios.delete(`http://localhost:8080/api/supply/${id}`);
        return result.data;
    } catch (e) {
        console.log(e);
    }
};

>>>>>>> 5e62e93a668ef467de0fa29870d2a712f432e508
