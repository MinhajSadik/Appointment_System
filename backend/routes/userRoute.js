import express from "express";
import {
  addNewUser,
  approveUserRegistrationRequest,
  deleteUser,
  getAllStudents,
  getAllTeachers,
  getAllUserRegistrationRequests,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  rejectUserRegistrationRequest,
  sendRegistrationRequest,
  updateProfile,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser.js";
import { authorizeUserRoles } from "../utils/helpers/authorizeUserRoles.js";
const router = express.Router();

//login route
router.post("/login", loginUser);

//all teachers route
router.get("/teachers", isAuthenticatedUser, getAllTeachers);

//all students route
router.get("/students", isAuthenticatedUser, getAllStudents);

//add user route
router.post(
  "/addUser",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  addNewUser
);

//all users
router.get(
  "/allUsers",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  getAllUsers
);

//registration request route
router.post(
  "/register/request",
  authorizeUserRoles(["student", "teacher"]),
  sendRegistrationRequest
);

//get all requests
router.get(
  "/register/requests",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  getAllUserRegistrationRequests
);

//regitration approve route
router.put(
  "/register/approve/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  approveUserRegistrationRequest
);

//reject registration request route
router.put(
  "/register/reject/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  rejectUserRegistrationRequest
);

router.put(
  "/update/profile/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["student", "teacher"]),
  updateProfile
);
router.put(
  "/update/user/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  updateUser
);

router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  deleteUser
);

router.get("/:id", getUserById);
router.get("/logout/:id", logoutUser);

export default router;
