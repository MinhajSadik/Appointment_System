import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Appointments from "./Components/Appointments/Appointments";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/Users/Login";
import Profile from "./Components/Users/Profile";
import Register from "./Components/Users/Register";
import RegisterRequests from "./Components/Users/RegisterRequests";
import Dashboard from "./pages/Dashboard";
import { setUser } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/request" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<RegisterRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
