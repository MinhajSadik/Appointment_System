import mongoose from "mongoose";

const userRequestSchema = new mongoose.Schema({
  //there will store user requests
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: false,
  },
  password: {
    type: String,
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
  agenda: {
    type: String,
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
  role: {
    type: String,
    enum: ["student", "teacher", "systemAdmin"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  createdAt: {
    type: Date,
    //default value is current date
    default: new Date(),
  },
});

const UserRequest = mongoose.model("Request", userRequestSchema);

export default UserRequest;
