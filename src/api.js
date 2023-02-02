import axios from "axios";
import config from "./config";
export default axios.create({
  baseURL: config.SERVER_API_URL || "nnnnnnnnnnn",
  headers: {
    "content-type": "application/json",
  },
});
