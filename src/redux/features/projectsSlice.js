import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProjects,
  addProject,
  getProjectDetails,
  DeleteProject,
  updateProject,
} from "../services";

const initialState = {
  prjects: null,
  loading: false,
  error: null,
  singleProject: null,
  deleteError: null,
  deleteLoading: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: {
    // getAllProjects:====
    [getAllProjects.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getAllProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.projects = action.payload;
    },
    [getAllProjects.rejected]: (state, action) => {
      state.loading = false;
      state.projects = null;
      state.error = true;
    },
    // Add Project:===
    [addProject.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [addProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addProject.rejected]: (state) => {
      state.loading = false;
      state.projects = null;
      state.error = true;
    },
    // Get Project Details:===
    [getProjectDetails.pending]: (state) => {
      state.error = false;
      state.loading = true;
    },
    [getProjectDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.singleProject = action.payload;
    },
    [getProjectDetails.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      state.projects = null;
    },
    // Delete Project:====
    [DeleteProject.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = false;
    },
    [DeleteProject.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = null;
    },
    [DeleteProject.rejected]: (state) => {
      state.deleteLoading = false;
      state.deleteError = true;
    },
    // Update Project:====
    [updateProject.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateProject.rejected]: (state) => {
      state.loading = false;
      state.projects = null;
      state.error = true;
    },
  },
});

export default projectsSlice.reducer;
