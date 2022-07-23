import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navLink =
    "text-center md:px-4 w-full py-3 inline-block text-gray-700 text-lg uppercase";
  const handleSearch = (e) => {};
  const handleLogout = (e) => {};
  const user = JSON.parse(localStorage.getItem("user"));
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
          <li className="w-full">
            <Link to="/" className={navLink}>
              Students
            </Link>
          </li>
          <li className="w-full">
            <Link to="/" className={navLink}>
              Teacher
            </Link>
          </li>
          {user?.result._id && (
            <>
              <li className="w-full">
                <Link to="/dashboard" className={navLink}>
                  dashboard
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
              <button className={navLink} onClick={() => {}}>
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}

          <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control bg-gray-700 transition-all rounded px-2 py-1 w-40 focus:outline-none text-gray-600"
              placeholder="Enter Search Features"

              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
