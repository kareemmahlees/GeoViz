import { createSlice } from "@reduxjs/toolkit";
import { createLogs, deleteLog, getLogDetails, updateLog } from "../services";

const initialState = {
  loading: null,
  error: null,
  details: null,
  msg: null,
  deleting: null,
  saving: null,
};

const LogsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: {
    // Create Logs:=====
    [createLogs.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [createLogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.payload.error) {
        state.error = true;
        state.msg = action.payload.message;
      } else if (action?.payload?.message === "Internal server error") {
        state.msg = action.payload.message;
      } else {
        state.details = action.payload;
      }
    },
    [createLogs.rejected]: (state, action) => {
      state.loading = null;
      state.details = null;
      state.error = action.error;
    },
    //  get Log Details: =======
    [getLogDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getLogDetails.fulfilled]: (state, action) => {
      state.loading = false;
      if (action?.payload.includes("error")) {
        state.error = true;
      } else {
        state.details = action.payload;
      }
    },
    [getLogDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // Delete Log:=====
    [deleteLog.pending]: (state) => {
      state.error = null;
      state.deleting = true;
    },
    [deleteLog.fulfilled]: (state, action) => {
      state.deleting = false;
      if (action.payload.error) {
        state.msg = action.payload.message;
      } else {
        state.details = action.payload;
      }
    },
    [deleteLog.rejected]: (state, action) => {
      state.deleting = false;
      state.error = action.error;
    },
    //Update Log:====
    [updateLog.pending]: (state) => {
      state.saving = true;
      state.error = null;
    },
    [updateLog.fulfilled]: (state, action) => {
      state.saving = false;
      if (action.payload.error) {
        state.msg = action.payload.message;
      }
    },
    [updateLog.rejected]: (state, action) => {
      state.saving = false;
      state.error = action.error;
    },
  },
});

export default LogsSlice.reducer;
