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
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
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
  },
  time: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const UserRequest = mongoose.model("UserRequest", userRequestSchema);

export default UserRequest;
