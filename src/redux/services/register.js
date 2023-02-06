import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      // const res = await api.post("/auth/sign-up", data);

      const formdata = new FormData();

      formdata.append("first_name", data.first_name);
      formdata.append("last_name", data.last_name);
      formdata.append("email", data.email);
      formdata.append("phone", data.phone);
      formdata.append("password", data.password);
      formdata.append("gender", data.gender);
      formdata.append("avatar", data.avatar);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("http://localhost:3000/auth/sign-up", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
