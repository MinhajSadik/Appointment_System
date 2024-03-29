import axios from "axios";

const devEnv = process.env.NODE_ENV === "development";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

// const API = axios.create({
//   baseURL: process.env.REACT_APP_PROD_API,
// });

console.log(REACT_APP_DEV_API, REACT_APP_PROD_API, devEnv);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).token
    }`;
  }
  // console.log("API token", localStorage.getItem("token"));
  return req;
});

/* USRER [student and teacher related work] */
//#1
//$POST: login user [any type of user can login]
export const loginUser = (loginInfo) => API.post("/api/user/login", loginInfo);

//$POST: add user [only admin can add user]
export const addUser = (userInfo) => API.post("/api/user/addUser", userInfo);

//$GET: get all users [only admin can get all users]
export const getAllUsers = () => API.get("/api/user/allUsers");

//@PUT: update user profile [student and teacher can update their profile]
export const updateProfile = (profileInfo, id) =>
  API.put(`/api/user/update/profile/${id}`, profileInfo);

//@PUT: update user [student and teacher can update their profile]
export const updateUser = (userInfo, id) =>
  API.put(`/api/user/update/user/${id}`, userInfo);

//$PUT: delete user [only admin can delete user]
export const deleteUser = (id) => API.delete(`/api/user/delete/${id}`);

//$POST: register request [student and teacher can request to register]
export const userRegisterRequest = (registerInfo) =>
  API.post("/api/user/register/request", registerInfo);

//#GET: get all registration requests [system admin can get all requests]
export const getAllUserRegistrationRequests = () =>
  API.get("/api/user/register/requests");

//@PUT: approve registration request [system admin can approve registration request]
export const approveRegistrationRequest = (id) =>
  API.put(`/api/user/register/approve/${id}`);

//@PUT: reject registration request [system admin can reject registration request]
export const rejectRegistrationRequest = (id) =>
  API.put(`/api/user/register/reject/${id}`);

/* Appointment [appointment related work] */
//#2
//#2
//$POST: appointment for [teacher and admin]
export const addNewAppointment = (appointmentInfo) =>
  API.post("/api/appointment/addNew", appointmentInfo);

//$POST request: appointment for [student]
export const addNewAppointmentRequest = (appointmentInfo) =>
  API.post("/api/appointment/student/request", appointmentInfo);

//#GET: get all appointments for everyone
export const getAllAppointments = () => API.get("/api/appointment/all");

//$PUT: update appointment [teacher and admin]
export const updateAppointment = (updatedAppointmentInfo, id) =>
  API.put(`/api/appointment/update/${id}`, updatedAppointmentInfo);

//$DELETE: delete appointment [teacher and admin]
export const deleteAppointment = (id) =>
  API.delete(`/api/appointment/delete/${id}`);

//$GET: search all appointment fields
export const searchAppointmentFields = (searchValue) =>
  API.get(`/api/appointment/search/${searchValue}`);

/* student [student related work] */
//#3
//#3
//#3
//#GET: get all appointments requests [system admin can get all requests]
export const studentAppointmentRequests = () =>
  API.get("/api/appointment/student/requests");

//@PUT: approve appointment request [system can approve appointment request]
export const approveStudentAppointmentRequest = (id) =>
  API.put(`/api/appointment/student/approve/${id}`);

//@PUT: reject appointment request [system can reject appointment request]
export const rejectStudentAppointmentRequest = (id) =>
  API.put(`/api/appointment/student/reject/${id}`);

/* teacher [teacher related work] */
//#4
//#4
//#4
//#4
//@GET: get all teacher [system admin can get all teachers]
export const getAllTeachers = () => API.get("/api/user/teachers");
