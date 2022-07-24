import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  //there will be save appointment and student appointment request
  name: {
    type: String,
    required: true,
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
    ref: "Users",
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
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
