import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProjectDetails = createAsyncThunk(
  "projects/getProjectDetails",
  async (id, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${window.localStorage.getItem("token")}`
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(
        `http://localhost:8000/projects/${id}`,
        requestOptions
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
