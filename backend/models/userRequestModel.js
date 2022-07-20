import mongoose from "mongoose";

const userRequestSchema = new mongoose.Schema({
  //there will be store user requests
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  studentId: {
    type: String,
  },
  course: {
    type: String,
  },
  department: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher", "systemAdmin"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  createdAt: {
    type: Date,
    default: new Date(), //default value is current date
  },
});

const UserRequest = mongoose.model("Request", userRequestSchema);

export default UserRequest;
