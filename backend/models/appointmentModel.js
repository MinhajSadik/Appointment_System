import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
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
      type: String,
      default: new Date(),
    },
    time: {
      type: String,
      default: new Date(),
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
