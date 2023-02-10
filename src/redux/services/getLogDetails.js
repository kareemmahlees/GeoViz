import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

export const getLogDetails = createAsyncThunk(
  "logs/getLogs",
  async (id, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;
    try {
      const res = await fetch(`${config.SERVER_API_URL}/logs/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return await res.text();
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
