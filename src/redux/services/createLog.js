import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

export const createLogs = createAsyncThunk(
  "logs/createLogs",
  async ({ file, id }, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;
    try {
      const formdata = new FormData();
      formdata.append("file", file, "[PROXY]");

      const res = await fetch(`${config.SERVER_API_URL}/logs/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      return res.json();
    } catch (error) {
      return rejecteWithError(error);
    }
  }
);
