import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import Home from "./pages/Home";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
