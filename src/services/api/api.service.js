import axios from "axios";
import { API_METHODS } from "../../constants/api";
import { BASE_URL } from "../../constants/baseUrl";
import { StorageService } from "../../services/storage/storage.service";

export class APIService {
  storage = new StorageService();
  // defaultAPIData = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: this.user.token,
  //     userid: this.user.userid,
  //     username: this.user.username,
  //   },
  // };

  async call(method, url, apiData = { headers: {}, body: {} }) {
    const user = this.storage.getUserData();
    console.log(user);
    apiData.headers.authorization = user.token;
    apiData.headers.userid = user.userid;
    apiData.headers.username = user.username;
    console.log("API Data: ", apiData);
    const URL = `${BASE_URL}${url}`;
    console.log(`${method}: ${URL}`);
    if (method === API_METHODS.GET) {
      const response = await axios.get(URL, { headers: apiData.headers });
      return response.data;
    } else if (method === API_METHODS.POST) {
      const response = await axios.post(URL, apiData.body, {
        headers: apiData.headers,
      });
      return response.data;
    } else if (method === API_METHODS.PUT) {
      const response = await Promise.resolve(
        axios.put(URL, apiData.headers, apiData.body)
      );
      return response.data;
    } else if (method === API_METHODS.DELETE) {
      const response = await Promise.resolve(
        axios.delete(URL, apiData.headers)
      );
      return response.data;
    } else {
      return { error: "Invalid method" };
    }
  }
}
