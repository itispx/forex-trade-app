import axios from "axios";

export const baseURL = "http://localhost:3001/v1";

const http = async () => {
  return axios.create({ baseURL });
};

export default http;
