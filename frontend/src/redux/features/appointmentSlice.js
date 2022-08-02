import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addNewAppointment = createAsyncThunk(
  "appointment/addNew",
  async ({ appointmentInfo, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addNewAppointment(appointmentInfo);
      toast.success("Successfully added appointment");
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
  async ({ appointmentRequestInfo, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addNewAppointmentRequest(
        appointmentRequestInfo
      );
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
      const response = await api.studentAppointmentRequests();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveStudentRequest = createAsyncThunk(
  "appointment/student/approve",
  async ({ id, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.approveStudentAppointmentRequest(id);
      toast.success("Successfully approved appointment");
      navigate("/appointments");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectStudentRequest = createAsyncThunk(
  "appointment/student/reject",
  async ({ id, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.rejectStudentAppointmentRequest(id);
      toast.success("Successfully rejected appointment");
      navigate("/appointments");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async ({ updatedAppointmentInfo, id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateAppointment(updatedAppointmentInfo, id);
      toast.success("Successfully updated appointment");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteAppointment(id);
      toast.success("Successfully deleted appointment");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchAppointmentFields = createAsyncThunk(
  "appointment/search",
  async ({ searchValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.searchAppointmentFields(searchValue);
      toast.success(`Found ${response.data.length} appointments`);
      navigate("/appointments");
      return response.data;
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message);
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
    addAppointment: (state, action) => {
      // state.appointments.push(action.payload);
    },
    // addAppointmentRequest: (state, action) => {
    //   state.appointmentRequests.push(action.payload);
    // },
    // updateAppointment: (state, action) => {
    //   const index = state.appointments.findIndex(
    //     (appointment) => appointment.id === action.payload.id
    //   );
    //   state.appointments[index] = action.payload;
    // },
    // deleteAppointment: (state, action) => {
    //   const index = state.appointments.findIndex(
    //     (appointment) => appointment.id === action.payload.id
    //   );
    //   state.appointments.splice(index, 1);
    // },
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
      localStorage.setItem("appointmentRequest", JSON.stringify(payload));
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
    },
    [studentAppointmentRequests.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateAppointment.pending]: (state) => {
      state.loading = true;
    },
    [updateAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointment = payload;
      localStorage.setItem("appointments", JSON.stringify(payload));
    },
    [updateAppointment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteAppointment.pending]: (state) => {
      state.loading = true;
    },
    [deleteAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointment = payload;
      localStorage.removeItem("appointments");
    },
    [deleteAppointment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [approveStudentRequest.pending]: (state) => {
      state.loading = true;
    },
    [approveStudentRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointment = payload;
      localStorage.setItem("appointments", JSON.stringify(payload));
    },
    [approveStudentRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [rejectStudentRequest.pending]: (state) => {
      state.loading = true;
    },
    [rejectStudentRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointment = payload;
      localStorage.removeItem("appointmentRequest");
    },
    [rejectStudentRequest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [searchAppointmentFields.pending]: (state) => {
      state.loading = true;
    },
    [searchAppointmentFields.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appointments = payload;
    },
    [searchAppointmentFields.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
