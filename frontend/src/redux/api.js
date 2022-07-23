import axios from "axios";

const devEnv = process.env.NODE_ENV === "development";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//   baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });

const API = axios.create({
  baseURL: process.env.REACT_APP_PROD_API,
});

console.log(REACT_APP_DEV_API, REACT_APP_PROD_API, devEnv);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).token
    }`;
  }

  return req;
});

//login user [any type of user can login]
export const loginUser = (loginInfo) => API.post("/api/user/login", loginInfo);

//register request [student and teacher can request to register]
export const userRegisterRequest = (registerInfo) =>
  API.post("/api/user/register/request", registerInfo);
