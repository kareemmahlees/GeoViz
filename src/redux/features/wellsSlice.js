import { createSlice } from "@reduxjs/toolkit";
import { createWell, getWellDetails } from "../services";

const initialState = {
  loading: false,
  error: null,
  details: null,
};

const wellsSlice = createSlice({
  name: "wells",
  initialState,
  reducers: {},
  extraReducers: {
    // Add Project:===
    [createWell.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [createWell.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [createWell.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // get Well Details:====
    [getWellDetails.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getWellDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.details = action.payload;
    },
    [getWellDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default wellsSlice.reducer;
