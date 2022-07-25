import { configureStore } from "@reduxjs/toolkit";
import AppointmentReducer from "./features/appointmentSlice";
import TeacherReducer from "./features/teacherSlice";
import UserReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    appointment: AppointmentReducer,
    teacher: TeacherReducer,
  },
});
