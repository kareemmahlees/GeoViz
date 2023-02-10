import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

export const updateLog = createAsyncThunk(
  "/logs/updateLog",
  async ({ file, id }, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${window.localStorage.getItem("token")}`
      );

      const formdata = new FormData();
      formdata.append("file", file, "[PROXY]");

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(
        `${config.SERVER_API_URL}/logs/${id}`,
        requestOptions
      );
      return res.json();
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
