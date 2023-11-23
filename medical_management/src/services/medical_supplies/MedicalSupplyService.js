import axios from "axios";
import dropdown from "bootstrap/js/src/dropdown";

export const getOldSuppliesPage = async (page, token, dropdown, valueSearch) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/supply/oldSupplies?page=${page}&size=5&dropdown=${dropdown}&valueSearch=${valueSearch}`,
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

export const addNewSupply = async (value, token) => {
  try {
    const result = await axios.post(
      "http://localhost:8080/api/supply/add",
      value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateSupply = async (value, token) => {
  try {
    const result = await axios.patch(
      `http://localhost:8080/api/supply/update`,
      value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

export const getAllSupply = async (token) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/supply/getAllSupply",
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

export const getOldSupplies = async (token) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/supply/oldSupplies",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

export const getSupply = async (id, token) => {
  try {
    const result = await axios.get(`http://localhost:8080/api/supply/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const findAllBetweenDays = async (lastDateInput, token) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/supply/statistic-supplies/${lastDateInput}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getLastSupply = async (token) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/api/supply/lastSupply`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSupply = async (id, token) => {
  try {
    const result = await axios.delete(
      `http://localhost:8080/api/supply/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
