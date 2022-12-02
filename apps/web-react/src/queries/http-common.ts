import axios from "axios";

import getUserToken from "../utilities/getUserToken";

export const baseURL = "http://localhost:3001/v1";

const http = async () => {
  const accessToken = await getUserToken();

  return axios.create({ baseURL, headers: { Authorization: "Bearer " + accessToken } });
};

export default http;
