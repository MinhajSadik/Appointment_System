import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/features/userSlice";

//navbar
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const systemAdmin = user?.result?.role === "systemAdmin";
  const navLink =
    "text-center md:px-4 w-full py-3 inline-block text-gray-700 text-lg uppercase";
  // const handleSearch = (e) => {};
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

        <ul className="md:flex flex-col md:flex-row items-center justify-center transition">
          {!systemAdmin && (
            <>
              <li className="w-full">
                <Link className={navLink} to={`/profile/${user?.result?._id}`}>
                  Profile
                </Link>
              </li>
              <li className="w-full">
                <Link to="/appointments" className={navLink}>
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
