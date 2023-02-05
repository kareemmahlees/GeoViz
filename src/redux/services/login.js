import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { rejecteWithError } = thunkAPI;

  try {
    const res = await api.post("/auth/sign-in", data);
  } catch (error) {
    return rejecteWithError(error.message);
  }
});
