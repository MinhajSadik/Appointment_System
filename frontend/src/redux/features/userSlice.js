import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.loginUser(loginInfo);
      toast.success("Successfully logged in");
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegisterRequest = createAsyncThunk(
  "user/register/request",
  async ({ registerInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.userRegisterRequest(registerInfo);
      toast.success(
        `Successfully sent request. Please wait for admin approval`
      );
      navigate("/login");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [userRegisterRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegisterRequest.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
    },
    [userRegisterRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
