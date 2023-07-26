import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-api-q29z.onrender.com/api",
  withCredentials: true,
});

export default instance;
