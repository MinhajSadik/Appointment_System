import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

//dotenv config
dotenv.config({ path: "./backend/configs/config.env" });

export const registerUser = async (req, res) => {
  const { name, email, password, studentId, course, department, role } =
    req.body;
  try {
    const isExisted = await UserModel.findOne({ email });
    if (isExisted) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      studentId,
      course,
      department,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: `User ${newUser.name} has been registered successfully`,
      result: newUser,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with email ${email} does not exist` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid password` });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const options = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        message: `User ${user.name} has been logged in successfully`,
        result: user,
        token,
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//update user by id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, studentId, course, department, role } = req.body;
  try {
    const user = await UserModel.findById(id).select("-password -__v");
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        studentId,
        course,
        department,
        role,
      },
      { new: true }
    );

    res.status(200).json({
      message: `User ${updatedUser.name} has been updated successfully`,
      result: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await UserModel.find({ role: "teacher" });
    res.status(200).json({
      message: `All teachers has been fetched successfully`,
      result: teachers,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await UserModel.find({ role: "student" });
    res.status(200).json({
      message: `All students has been fetched successfully`,
      result: students,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get user by id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).select("-password -__v");
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }
    res.status(200).json({
      message: `User ${user.name} has been fetched successfully`,
      result: user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//delete user by id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      message: `User ${user.name} has been deleted successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//write a function send a new user registration request after the user has been registered
export const sendUserRegistrationRequest = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${req.params.id} does not exist` });
    }
    const userRegistrationRequest = await UserModel.create({
      user: user._id,
      status: "pending",
    });
    res.status(200).json({
      message: `User registration request has been sent successfully`,
      result: userRegistrationRequest,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get all user registration requests
export const getAllUserRegistrationRequests = async (req, res) => {
  try {
    const userRegistrationRequests = await UserModel.find({});
    res.status(200).json({
      message: `All user registration requests has been fetched successfully`,
      result: userRegistrationRequests,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//approve user registration request
export const approveUserRegistrationRequest = async (req, res) => {
  try {
    const userRegistrationRequest = await UserModel.findById(req.params.id);
    if (!userRegistrationRequest) {
      return res.status(404).json({
        message: `User registration request with id ${req.params.id} does not exist`,
      });
    }
    const user = await UserModel.findById(userRegistrationRequest.user);
    if (!user) {
      return res.status(404).json({
        message: `User with id ${userRegistrationRequest.user} does not exist`,
      });
    }
    user.role = req.body.role;
    await user.save();
    userRegistrationRequest.status = "approved";
    await userRegistrationRequest.save();
    res.status(200).json({
      message: `User registration request has been approved successfully`,
      result: userRegistrationRequest,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//reject user registration request
export const rejectUserRegistrationRequest = async (req, res) => {
  try {
    const userRegistrationRequest = await UserModel.findById(req.params.id);
    if (!userRegistrationRequest) {
      return res.status(404).json({
        message: `User registration request with id ${req.params.id} does not exist`,
      });
    }
    userRegistrationRequest.status = "rejected";
    await userRegistrationRequest.save();
    res.status(200).json({
      message: `User registration request has been rejected successfully`,
      result: userRegistrationRequest,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//sent user registration request to system admin
export const sendUserRegistrationRequestToSystemAdmin = async (req, res) => {};
