import axios from "axios";
import { API_METHODS } from "../../constants/api";
import { BASE_URL } from "../../constants/baseUrl";

export class APIService {
  async call(method, url, apiData = { headers: {}, body: {} }) {
    console.log("API Data: ", apiData);
    const URL = `${BASE_URL}${url}`;
    console.log(`${method}: ${URL}`);
    if (method === API_METHODS.GET) {
      const response = await axios.get(URL, apiData.headers);
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
