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
import { authorizeUserRoles } from "../utils/helpers/authorizeUserRoles.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/teachers", getAllTeachers);
router.get("/students", getAllStudents);

//registration request route
router.post(
  "/register/request",
  authorizeUserRoles(["student", "teacher"]),
  sendRegistrationRequest
);

//get all requests
router.get(
  "/register/requests",
  authorizeUserRoles(["systemAdmin"]),
  getAllUserRegistrationRequests
);

//regitration approve route
router.put(
  "/register/approve/:id",
  authorizeUserRoles("systemAdmin"),
  approveUserRegistrationRequest
);

//reject registration request route
router.put(
  "/register/reject/:id",
  authorizeUserRoles(["systemAdmin"]),
  rejectUserRegistrationRequest
);

router.get("/:id", getUserById);
router.get("/logout/:id", logoutUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", authorizeUserRoles(["systemAdmin"]), deleteUser);

export default router;
