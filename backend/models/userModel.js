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
    // status: {
    //   type: String,
    //   default: "pending",
    //   enum: ["pending", "approved", "rejected"],
    // },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true, versionKey: false }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;
