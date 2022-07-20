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

//registration request route
router.post(
  "/register",
  authorizeUserRoles(["student", "teacher"]),
  sendRegistrationRequest
);

//get all requests
router.get(
  "/requests",
  authorizeUserRoles(["systemAdmin"]),
  getAllUserRegistrationRequests
);

//regitration approve route
router.put(
  "/approve/:id",
  authorizeUserRoles(["systemAdmin"]),
  approveUserRegistrationRequest
);

//reject registration request route
router.put(
  "/reject/:id",
  authorizeUserRoles(["systemAdmin"]),
  rejectUserRegistrationRequest
);

router.post("/login", loginUser);
router.get("/:id", getUserById);
router.get("/logout/:id", logoutUser);
router.get("/teachers", getAllTeachers);
router.get("/students", getAllStudents);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", authorizeUserRoles(["systemAdmin"]), deleteUser);

export default router;
