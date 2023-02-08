import { createAsyncThunk } from "@reduxjs/toolkit";

export const createWell = createAsyncThunk(
  "wells/createWell",
  async (details, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${window.localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(details.data);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch(
        `http://localhost:8000/wells/${details.id}`,
        requestOptions
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
