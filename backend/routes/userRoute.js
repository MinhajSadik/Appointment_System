import express from "express";
import {
  deleteUser,
  getAllStudents,
  getAllTeachers,
  getUserById,
  loginUser,
  sendUserRegistrationRequest,
  updateUser,
} from "../controllers/userController.js";
import UserModel from "../models/userModel.js";
import { authorizeUserRoles } from "../utils/helpers/authorizeUserRoles.js";
const router = express.Router();

//request to register a new user
router.post("/register/:id", sendUserRegistrationRequest);

router.post("/login", loginUser);
router.get("/:id", getUserById);
router.get("/teachers", getAllTeachers);
router.get("/students", getAllStudents);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", authorizeUserRoles(["systemAdmin"]), deleteUser);

export default router;

//write a function that will send new student and teacher registration request to systemAdmin for approval or review
//get all registration requests
export const getAllRegistrationRequests = async (req, res) => {
  try {
    const userRegistrationRequests = await UserRegistrationRequestModel.find();
    res.status(200).json({
      message: `All user registration requests have been fetched successfully`,
      result: userRegistrationRequests,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//get registration request by id
export const getRegistrationRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const userRegistrationRequest = await UserRegistrationRequestModel.findById(
      id
    );
    if (!userRegistrationRequest) {
      return res.status(404).json({
        message: `User registration request with id ${id} does not exist`,
      });
    }
    res.status(200).json({
      message: `User registration request with id ${id} has been fetched successfully`,
      result: userRegistrationRequest,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//approve registration request
export const approveRegistrationRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const userRegistrationRequest = await UserRegistrationRequestModel.findById(
      id
    );
    if (!userRegistrationRequest) {
      return res.status(404).json({
        message: `User registration request with id ${id} does not exist`,
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
      message: `User registration request with id ${id} has been approved successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

//reject registration request
export const rejectRegistrationRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const userRegistrationRequest = await UserRegistrationRequestModel.findById(
      id
    );
    if (!userRegistrationRequest) {
      return res.status(404).json({
        message: `User registration request with id ${id} does not exist`,
      });
    }
    userRegistrationRequest.status = "rejected";
    await userRegistrationRequest.save();
    res.status(200).json({
      message: `User registration request with id ${id} has been rejected successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};
