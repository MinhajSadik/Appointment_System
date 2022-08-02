import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.loginUser(loginInfo);
      toast.success("Successfully logged in");

      if (response?.data?.result?.role === "systemAdmin") {
        navigate("/admin/dashboard");
      } else {
        navigate(`/profile/${response.data.result._id}`);
      }
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ userInfo, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addUser(userInfo);
      toast.success("Successfully added user");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUsers();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userInfo, id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(userInfo, id);
      toast.success("Successfully updated profile");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      toast.success("Successfully deleted user");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//send user registration request
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
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//get all user requests
export const userRegistrationRequests = createAsyncThunk(
  "user/register/requests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUserRegistrationRequests();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveRegistrationRequest = createAsyncThunk(
  "user/register/approve",
  async ({ id, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.approveRegistrationRequest(id);
      toast.success("Approved registration request");
      navigate(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectRegistrationRequest = createAsyncThunk(
  "user/register/reject",
  async ({ id, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.rejectRegistrationRequest(id);
      toast.success("Rejected registration request");
      navigate(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    registrationRequests: [],
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
    [addUser.pending]: (state) => {
      state.isLoading = true;
    },
    [addUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = [...state.users, payload];
    },
    [addUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users.splice(
        state.users.findIndex((user) => user.id === payload.id),
        1
      );
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [userRegisterRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegisterRequest.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      // state.user = payload;
    },
    [userRegisterRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [userRegistrationRequests.pending]: (state) => {
      state.isLoading = true;
    },
    [userRegistrationRequests.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.registrationRequests = payload;
    },
    [userRegistrationRequests.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [approveRegistrationRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [approveRegistrationRequest.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [approveRegistrationRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [rejectRegistrationRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [rejectRegistrationRequest.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [rejectRegistrationRequest.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
