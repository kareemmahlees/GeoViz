import { createSlice } from "@reduxjs/toolkit";
import {
  createWell,
  getWellDetails,
  deleteWell,
  updateWell,
  msg,
} from "../services";

const initialState = {
  loading: false,
  error: null,
  details: null,
  deleteing: null,
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
      if (action.payload.error) {
        state.error = true;
      }
      state.details = action.payload;
    },
    [getWellDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Delete Well:=====
    [deleteWell.pending]: (state) => {
      state.deleteing = true;
      state.error = false;
    },
    [deleteWell.fulfilled]: (state, action) => {
      state.deleteing = false;
      if (action.payload.error) {
        state.msg = action.payload;
      }
    },
    [deleteWell.rejected]: (state) => {
      state.deleteing = false;
      state.error = true;
    },
    // Update Well:======
    [updateWell.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateWell.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateWell.rejected]: (state) => {
      state.loading = false;
      state.projects = null;
      state.error = true;
    },
  },
});

export default wellsSlice.reducer;
