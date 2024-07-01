import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";

const getLocalToken = () => {
  return localStorage.getItem("localtoken");
};

const CookieToken = getLocalToken();

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${CookieToken}`,
  },
});

export default instance;
