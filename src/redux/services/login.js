import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { rejecteWithError } = thunkAPI;
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      "http://localhost:8000/auth/sign-in",
      requestOptions
    );
    return await res.json();
  } catch (error) {
    return rejecteWithError(error.message);
  }
});
