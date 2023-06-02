import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ENVIROMENT === "dev"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_PRODUCTION_BASE_URL;

const http = axios.create({
  baseURL: baseUrl,
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
