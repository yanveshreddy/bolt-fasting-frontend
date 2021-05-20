import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3001/api/auth/";

class AuthService {
  async login({ email, password }) {
    const options = {
      url: API_URL + "signin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        email: email,
        password: password,
      },
    };

    try {
      let response = await axios(options);

      if (response.data.data.accessToken) {
        Cookies.set("jwt_token", response.data.data.accessToken, {
          expires: 30,
        });
        console.log(response.data.data);
        Cookies.set("userId", response.data.data.userId);
        // localStorage.setItem("user", response.data.data);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  logout() {
    // localStorage.removeItem("user");
    Cookies.remove("jwt_token");
  }

  async register({ firstname, lastName, email, password }) {
    const options = {
      url: API_URL + "register",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        firstname: firstname,
        lastName: lastName,
        email: email,
        password: password,
      },
    };
    try {
      let response = await axios(options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
