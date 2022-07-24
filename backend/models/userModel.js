import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    course: {
      type: String,
    },
    agenda: {
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
    date: {
      type: Date,
      default: new Date(),
    },
    time: {
      type: String,
      default: new Date(),
    },
  },
  { timestamps: true, versionKey: false }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;
