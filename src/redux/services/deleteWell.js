import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteWell = createAsyncThunk(
  "wells/deleteWell",
  async (id, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${window.localStorage.getItem("token")}`
      );

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(
        `http://localhost:8000/wells/${id}`,
        requestOptions
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
