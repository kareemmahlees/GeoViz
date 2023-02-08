import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (project, thunkAPI) => {
    const { rejecteWithError } = thunkAPI;

    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${window.localStorage.getItem("token")}`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(project.data);
      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch(
        `http://localhost:8000/projects/${project.id}`,
        requestOptions
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejecteWithError(error.message);
    }
  }
);
