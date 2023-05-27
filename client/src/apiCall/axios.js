import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// http.interceptors.request.use(
//   (config) => {
//     if (getToken()) {
//       config.headers["Authorization"] = `Bearer ${getToken()}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default http;
