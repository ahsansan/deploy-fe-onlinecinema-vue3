import axios from "axios";

export const API = axios.create({
  baseURL: "https://onlinecinema-be-ahsan.herokuapp.com/api/cinema/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};