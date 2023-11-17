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
export const sendEmail = async (data) => {
  try {
    let dataSendEmail = {
      service_id: "service_r9ngdc4",
      template_id: "template_5f17548",
      user_id: "POrb-ZsRtcXW7rhlC",
      template_params: {
        username: data.username,
        user_email: data.email,
        message: data.message,
      },
    };
    const result = await axios
      .post("https://api.emailjs.com/api/v1.0/email/send", dataSendEmail)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  } catch (error) {
    console.log(error);
  }
};

export const randomCodeChangPassword = () => {
  const min = 100000;
  const max = 999999;

  const randomSixDigitCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomSixDigitCode.toString();
};

export const checkPermission = (account, allowedRoles) => {
  if (!account || !account.accountRole || !account.accountRole.appRole) {
    // Trường hợp không có tài khoản hoặc thông tin quyền
    return false;
  }
  const userRole = account.accountRole.appRole.name;
  return allowedRoles.includes(userRole);
};
