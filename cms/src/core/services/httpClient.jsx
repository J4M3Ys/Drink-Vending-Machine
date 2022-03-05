import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return error;
  }
);

export const httpClient = instance;
