import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import RequestModel from "../models/requestedModel.js";
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
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
      ),
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

//logout user
export const logoutUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }
    res.clearCookie("token");
    res.status(200).json({
      message: `User ${user.name} has been logged out successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//send registration request to admin[systemAdmin]
export const sendRegistrationRequest = async (req, res) => {
  const { name, email, password, status, studentId, course, department, role } =
    req.body;
  try {
    //check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: `User with email ${email} already exists in the user list`,
      });
    }

    //password encryption
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user and send registration request to admin
    const requestUser = new RequestModel({
      name,
      email,
      password: hashedPassword,
      studentId,
      course,
      department,
      role,
      status,
    });

    //create token
    const token = jwt.sign(
      { id: requestUser._id, email: requestUser.email, role: requestUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //check if user already requested for registration
    const request = await RequestModel.findOne({ email });
    if (request) {
      return res.status(400).json({
        message: `User with email ${email} already requested`,
      });
    }
    const savedUser = await requestUser.save();

    return res.status(200).json({
      message: `User ${name} has been requested for registration`,
      result: savedUser,
      token,
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
    const requests = await RequestModel.find({}).sort({ createdAt: -1 });
    if (requests.length === 0) {
      return res.status(404).json({
        message: `No requests found`,
      });
    }
    res.status(200).json({
      message: `All user registration requests has been fetched successfully`,
      result: requests,
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
  const { id } = req.params;
  try {
    const request = await RequestModel.findById(id);
    if (!request) {
      return res.status(404).json({
        message: `User registration request with id ${id} does not exist`,
      });
    }

    //get all information from request
    const {
      name: requestName,
      email: requestEmail,
      password: requestPassword,
      studentId: requestStudentId,
      course: requestCourse,
      department: requestDepartment,
      role: requestRole,
    } = request;

    //create new user
    const user = new UserModel({
      name: requestName,
      email: requestEmail,
      password: requestPassword,
      studentId: requestStudentId,
      course: requestCourse,
      department: requestDepartment,
      role: requestRole,
    });

    //create token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const newUser = await user.save();

    //delete request
    await RequestModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: `User ${requestName} has been approved successfully`,
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

//reject user registration request
export const rejectUserRegistrationRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await RequestModel.findById(id);
    if (!request) {
      return res.status(404).json({
        message: `User registration request with id ${id} does not exist`,
      });
    }
    const user = await UserModel.findById(request.user);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }

    await RequestModel.findByIdAndDelete(id);
    res.status(200).json({
      message: `User ${user.name} has been rejected successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};
