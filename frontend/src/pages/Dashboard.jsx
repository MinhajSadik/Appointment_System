import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => ({ ...state.user }));
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-84 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        <Link
          to="/dashboard"
          className="mt-10 px-8 text-3xl font-semibold text-gray-800 dark:text-white"
        >
          Systems
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
              to="/students"
            >
              <span className="mx-4 font-medium">Students</span>
            </Link>

            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/teachers"
            >
              <span className="mx-4 font-medium">Teachers</span>
            </Link>

            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/requests"
            >
              <small className="mx-4">Appointments requests</small>
            </Link>

            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/requests"
            >
              <small className="mx-4 ">Register Requests</small>
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
          </nav>

          <div className="flex items-center px-4 -mx-2">
            <img
              className="object-cover mx-2 rounded-full h-9 w-9"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="avatar"
            />
            <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200">
              Hi, {isLoggedIn ? user?.result?.name : "Guest"}
            </h4>
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex flex-col w-full h-screen px-4 py-8 bg-white white:bg-gray-800 dark:border-gray-600">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <div className="flex flex-col justify-between flex-1 mt-6">
            <div className="flex flex-col justify-between flex-1 mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
