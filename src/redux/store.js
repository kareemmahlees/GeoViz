import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/authSlice";
import projects from "./features/projectsSlice";
import wells from "./features/wellsSlice";

export const store = configureStore({
  reducer: {
    auth,
    projects,
    wells,
  },
});
