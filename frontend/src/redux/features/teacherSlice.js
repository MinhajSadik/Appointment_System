import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllTeachers = createAsyncThunk(
  "teacher/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllTeachers();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teachers: [],
    teacher: {},
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
  },
  extraReducers: {
    [getAllTeachers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllTeachers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.teachers = payload;
    },
    [getAllTeachers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;
