import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5287/",
});

export default api;