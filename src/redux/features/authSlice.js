import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../services";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // register:====
    [register.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.statusCode) {
        state.error = action.payload;
      } else {
        state.user = {
          first_name: action?.payload?.user_metadata?.first_name,
          last_name: action?.payload?.user_metadata?.last_name,
          gender: action?.payload?.user_metadata?.gender,
          email: action?.payload?.email,
        };
      }
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
  // login:======
  [login.pending]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [login.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload.user;
    state.token = action.payload.token;
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  },
  [login.rejected]: (state, action) => {
    state.loading = false;
    state.user = null;
    state.token = null;
    state.error = action.payload;
  },
});

export default authSlice.reducer;
