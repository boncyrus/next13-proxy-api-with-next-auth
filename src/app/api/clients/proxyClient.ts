import axios from "axios";

export const proxyClient = axios.create({
  baseURL: "/api/proxy", // Notice the host is not specified, our goal is to call the next proxy api
});
