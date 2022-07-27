import express from "express";
import {
  addAppointment,
  approveStudentAppointmentRequest,
  deleteAppointment,
  getAppointment,
  getAppointments,
  getAppointmentsByTeacher,
  getStudentAppointmentsRequests,
  rejectStudentAppointmentRequest,
  searchAppointmentFields,
  studentAppointmentRequest,
  updateAppointment,
} from "../controllers/appointmentController.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser.js";
import { authorizeUserRoles } from "../utils/helpers/authorizeUserRoles.js";

const router = express.Router();

//add new appointment route
router.post(
  "/addNew",
  isAuthenticatedUser,
  authorizeUserRoles(["teacher", "systemAdmin"]),
  addAppointment
);

//get all appointments route
router.get("/all", isAuthenticatedUser, getAppointments);

//search by name or department route
router.get("/search/:searchValue", searchAppointmentFields);

//get single appointment by id route
router.get("/:id", isAuthenticatedUser, getAppointment);

//update appointment by id route
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["teacher", "systemAdmin"]),
  updateAppointment
);

//delete appointment by id route
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["teacher", "systemAdmin"]),
  deleteAppointment
);

//get teacher appointment by teacher id route
router.get("/teacher/:id", isAuthenticatedUser, getAppointmentsByTeacher);

//student appointment request route
router.post(
  "/student/request",
  isAuthenticatedUser,
  authorizeUserRoles(["student"]),
  studentAppointmentRequest
);

//get student appointment request route
router.get(
  "/student/requests",
  isAuthenticatedUser,
  authorizeUserRoles(["student", "systemAdmin"]),
  getStudentAppointmentsRequests
);

//aprove student appointment request route
router.put(
  "/student/approve/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  approveStudentAppointmentRequest
);

//reject student appointment request route
router.put(
  "/student/reject/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["systemAdmin"]),
  rejectStudentAppointmentRequest
);

// router.get("/course", getAppointmentsByCourse);
// router.get("/department", getAppointmentsByDepartment);
// router.get("/date", getAppointmentsByDate);
// router.get("/time", getAppointmentsByTime);
// router.get("/agenda", getAppointmentsByAgenda);
// router.get("/:date/:time", getAppointmentsByDateAndTime);

export default router;
