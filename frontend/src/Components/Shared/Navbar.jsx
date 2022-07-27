import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { searchAppointmentFields } from "../../redux/features/appointmentSlice";
import { logoutUser } from "../../redux/features/userSlice";

//navbar
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const systemAdmin = user?.result?.role === "systemAdmin";
  const navLink =
    "text-center md:px-4 w-full py-3 inline-block text-gray-700 text-lg uppercase";
  const handleSearchFields = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    dispatch(searchAppointmentFields({ search, navigate, toast }));
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <nav style={{ backgroundColor: "#f9f7f9" }} className="sticky top-0 z-50">
      <div className="conainer mx-auto px-4 flex flex-col md:flex-row  justify-start md:justify-between md:items-center">
        <div className="flex justify-between w-full">
          <Link
            to="/"
            className="py-1 inline-block text-dark text-lg uppercase"
          >
            Appointment System
          </Link>
        </div>

        <label className="relative block w-full">
          <form onSubmit={handleSearchFields}>
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </label>

        <ul className="md:flex flex-col md:flex-row items-center justify-center transition">
          {!systemAdmin && isLoggedIn && (
            <>
              <li className="w-full">
                <Link className={navLink} to="/appointments">
                  Appointments
                </Link>
              </li>
              <li className="w-full">
                <Link className={navLink} to={`/profile/${user?.result?._id}`}>
                  Profile
                </Link>
              </li>
            </>
          )}
          {systemAdmin && (
            <>
              <li className="w-full">
                <Link className={navLink} to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="w-full">
                <Link className={navLink} to="/appointments">
                  Appointments
                </Link>
              </li>
            </>
          )}

          {user?.result._id ? (
            <li className="w-full">
              <button className={navLink} onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
          ) : (
            <li className="w-full">
              <button className={navLink}>
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}

          {/* <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control bg-gray-700 transition-all rounded px-2 py-1 w-48 focus:outline-none text-gray-100"
              placeholder="Search "

              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
            />
          </form> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
