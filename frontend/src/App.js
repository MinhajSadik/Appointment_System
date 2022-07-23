import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/Users/Login";
import Home from "./pages/Home";

function App() {
  console.log(process.env.REACT_APP_DEV_API);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
