import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addNewAppointment = createAsyncThunk(
  "appointment/addNew",
  async ({ appointmentInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addNewAppointment(appointmentInfo);
      toast.success("Successfully added appointment");
      navigate("/appointments");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewAppointmentRequest = createAsyncThunk(
  "appointment/student/request",
  async ({ appointmentInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addNewAppointmentRequest(appointmentInfo);
      toast.success("Successfully requested appointment");
      navigate("/appointments");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAppointments = createAsyncThunk(
  "appointment/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllAppointments();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentAppointmentRequests = createAsyncThunk(
  "appointment/student/requests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllAppointmentsForStudent();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
    appointment: {},
    appointmentRequests: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
  extraReducers: {
    [addNewAppointment.pending]: (state) => {
      state.loading = true;
    },
    [addNewAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointment = payload;
      localStorage.setItem("appointments", JSON.stringify(payload));
    },
    [addNewAppointment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addNewAppointmentRequest.pending]: (state) => {
      state.loading = true;
    },
    [addNewAppointmentRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointment = payload;
      localStorage.setItem("appointments", JSON.stringify(payload));
    },
    [addNewAppointmentRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getAllAppointments.pending]: (state) => {
      state.loading = true;
    },
    [getAllAppointments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointments = payload;
      localStorage.setItem("appointments", JSON.stringify(payload));
    },
    [getAllAppointments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [studentAppointmentRequests.pending]: (state) => {
      state.loading = true;
    },
    [studentAppointmentRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointmentRequests = payload;
      localStorage.setItem("requests", JSON.stringify(payload));
    },
    [studentAppointmentRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
