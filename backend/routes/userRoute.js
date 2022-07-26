import express from "express";
import {
  approveUserRegistrationRequest,
  deleteUser,
  getAllStudents,
  getAllTeachers,
  getAllUserRegistrationRequests,
  getUserById,
  loginUser,
  logoutUser,
  rejectUserRegistrationRequest,
  sendRegistrationRequest,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser";
import { authorizeUserRoles } from "../utils/helpers/authorizeUserRoles.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/teachers", isAuthenticatedUser, getAllTeachers);
router.get("/students", isAuthenticatedUser, getAllStudents);

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

router.get("/:id", getUserById);
router.get("/logout/:id", logoutUser);
router.put("/update/:id", isAuthenticatedUser, updateUser);
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  deleteUser
);

export default router;
