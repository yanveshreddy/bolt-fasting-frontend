import axios from "axios";
import authHeader from "authHeader.js";

const API_URL = "http://localhost:3001/api/user/:userId/";

class userFastingService {
  async getweeklyfastingData() {
    let response = await axios(API_URL + "getweeklyfastingdata", {
      headers: authHeader(),
    });
    return response.data;
  }

  async getFastingDetails() {
    let response = await axios(API_URL + "getfastingdetails", {
      headers: authHeader(),
    });
    return response.data;
  }

  async postUserFastingDetails(values) {
    let options = {
      url: API_URL + "fastingdetails",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: values,
    };
    let response = await axios(options);
    return response.data;
  }

  async postUserFastingHistory(values) {
    let options = {
      url: API_URL + "fastinghistory",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: values,
    };
    let response = await axios(options);
    return response.data;
  }
}

export default new userFastingService();
