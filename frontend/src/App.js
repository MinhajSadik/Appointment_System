import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminRoute from "./Components/Routes/AdminRoute";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/Users/Login";
import Profile from "./Components/Users/Profile";
import Register from "./Components/Users/Register";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/request" element={<Register />} />
        {/* <Route
          path="/users/:id/*"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        /> */}
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
