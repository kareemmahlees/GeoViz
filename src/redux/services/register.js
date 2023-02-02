import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      const res = await api.post("", data);
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
