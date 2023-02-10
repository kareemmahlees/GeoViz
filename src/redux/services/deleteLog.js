import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

export const deleteLog = createAsyncThunk(
  "logs/deleteLog",
  async (id, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;
    try {
      const res = await fetch(`${config.SERVER_API_URL}/logs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return await res.json();
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
