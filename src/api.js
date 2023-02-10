import axios from "axios";
import config from "./config";
export default axios.create({
  baseURL: config.SERVER_API_URL || "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "content-type": "application/json",
  },
});
