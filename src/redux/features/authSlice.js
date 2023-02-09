import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../services";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  avatar: localStorage.getItem("avatar"),
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
        state.avatar = action.payload.avatar_url;
        localStorage.setItem("avatar", action.payload.avatar_url);
        // state.user = {
        //   first_name: action?.payload?.user_metadata?.first_name,
        //   last_name: action?.payload?.user_metadata?.last_name,
        //   gender: action?.payload?.user_metadata?.gender,
        //   email: action?.payload?.email,
        //   avatar: action?.payload.avatar_url,
        // };
      }
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    // login:======
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload;
      } else {
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      }
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
