import mongoose from "mongoose";

const appointmentRequest = new mongoose.Schema({
  //appointment request for student
  name: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  agenda: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  time: {
    type: String,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    //default value is current date
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },

  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
});

const AppointmentRequest = mongoose.model(
  "AppointmentRequest",
  appointmentRequest
);

export default AppointmentRequest;
