import axios from "axios";
import authHeader from "./authHeader";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");
console.log(userId);
const API_URL = `http://localhost:3001/api/user/${userId}/`;

class userFastingService {
  async getWeeklyFastingData() {
    let response = await axios(API_URL + "getweeklyfastingData", {
      headers: authHeader(),
    });
    console.log(response.data);
    return response.data;
  }

  async getFastingDetails() {
    let response = await axios(API_URL + "getfastingdetails", {
      headers: authHeader(),
    });
    return response.data;
  }

  async postUserFastingDetails(values) {
    console.log(values);
    let options = {
      url: API_URL + "fastingdetails",
      method: "POST",
      headers: authHeader(),
      data: values,
    };
    let response = await axios(options);
    return response.data;
  }

  async postUserFastingHistory(values) {
    console.log(values);
    let options = {
      url: API_URL + "fastinghistory",
      method: "POST",
      headers: authHeader(),
      data: values,
    };
    let response = await axios(options);
    return response.data;
  }
}

export default new userFastingService();
