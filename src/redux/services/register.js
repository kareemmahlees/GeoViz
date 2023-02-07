import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      const formdata = new FormData();
      formdata.append("avatar", data.avatar);
      formdata.append("first_name", data.first_name);
      formdata.append("last_name", data.last_name);
      formdata.append("email", data.email);
      formdata.append("phone", data.phone);
      formdata.append("password", data.password);
      formdata.append("gender", data.gender);
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      const res = await fetch(
        "http://localhost:8000/auth/sign-up",
        requestOptions
      );
      return res.json();
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
