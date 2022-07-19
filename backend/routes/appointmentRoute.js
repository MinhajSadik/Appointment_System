import express from "express";
import {
  addAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
  getAppointmentsByAgenda,
  getAppointmentsByCourse,
  getAppointmentsByDate,
  getAppointmentsByDateAndTime,
  getAppointmentsByDepartment,
  getAppointmentsByTeacher,
  getAppointmentsByTime,
  searchByNameOrDepartment,
  updateAppointment,
} from "../controllers/appointmentController.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticatedUser.js";
import { authorizeUserRoles } from "../utils/helpers/authorizeUserRoles.js";

const router = express.Router();

router.post(
  "/add",
  isAuthenticatedUser,
  authorizeUserRoles(["teacher", "systemAdmin"]),
  addAppointment
);

router.get("/all", getAppointments);
router.get("/:id", getAppointment);
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["teacher", "systemAdmin"]),
  updateAppointment
);

router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeUserRoles(["teacher", "systemAdmin"]),
  deleteAppointment
);

router.get("/teacher/:id", getAppointmentsByTeacher);
router.get("/course", getAppointmentsByCourse);
router.get("/department", getAppointmentsByDepartment);
router.get("/date", getAppointmentsByDate);
router.get("/time", getAppointmentsByTime);
router.get("/agenda", getAppointmentsByAgenda);
router.get("/:date/:time", getAppointmentsByDateAndTime);

router.get("/search/:searchValue", searchByNameOrDepartment);
export default router;
