import axios from "axios";

export const loginByAccount = async (account) => {
  try {
    const result = await axios.post("http://localhost:8080/api/login", account);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getUserLoginAccount = async (token, username) => {
  try {
    console.log(token);
    const result = await axios.get(
      `http://localhost:8080/api/getAccount/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const account = {
      token: token,
      accountRole: result.data,
    };
    console.log(account);
    return account;
  } catch (error) {
    console.log(error);
  }
};
export const getUserLoginGoogle = async (token) => {
  try {
    const userInfo = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

    const account = {
      token: token,
      accountRole: {
        appAccount: {
          username: userInfo.name,
          imgLink: userInfo.picture,
        },
        appRole: {
          name: "ROLE_USER",
        },
      },
    };

    return account;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async (data) => {
  try {
    const token = {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    };

    const result = await axios.get("http://localhost:8080/api/logout", token);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthen = async (token) => {
  try {
    const result = await axios.get("http://localhost:8080/api/checkAuthen", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
