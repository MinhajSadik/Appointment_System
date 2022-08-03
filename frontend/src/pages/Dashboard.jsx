import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestInfo from "../Components/RequestsInfo/RequestInfo";
import RegisterRequests from "../Components/Users/RegisterRequests";
import { studentAppointmentRequests } from "../redux/features/appointmentSlice";
import { userRegistrationRequests } from "../redux/features/userSlice";
import Users from "./Users";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { appointmentRequests, registrationRequests } = useSelector(
    (state) => ({
      ...state.user,
      ...state.appointment,
    })
  );

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(studentAppointmentRequests());
    dispatch(userRegistrationRequests());
  }, [dispatch]);

  return (
    <>
      {/* <div className="container mx-auto font-thin">
        <h1 className="text-5xl mx-5 my-5">
          {registrationRequests.length > 0
            ? "Registration Requests"
            : "There are no Registration Requests"}
        </h1>
        <table className="min-w-full text-center">
          <thead className="border-b bg-gray-800">
            <tr>
              <th className="text-sm font-medium text-white px-6 py-4">Name</th>
              <th className="text-sm font-medium text-white px-6 py-4">Role</th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Status
              </th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Request Date
              </th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Action
              </th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {registrationRequests?.map((registrationRequest) => (
              <RegisterRequests
                key={registrationRequest._id}
                registrationRequest={registrationRequest}
              />
            ))}
          </tbody>
        </table>
        <h1 className="text-5xl mx-5 my-5 mt-10">
          {appointmentRequests.length > 0
            ? "Student Appointment Requests"
            : "There are no Student Appointment Requests"}
        </h1>
        <table className="min-w-full text-center">
          <thead className="border-b bg-gray-800">
            <tr>
              <th className="text-sm font-medium text-white px-6 py-4">Name</th>
              <th className="text-sm font-medium text-white px-6 py-4">Role</th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Status
              </th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Request Date
              </th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Action
              </th>
              <th className="text-sm font-medium text-white px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {appointmentRequests?.map((appointmentRequests) => (
              <RequestInfo
                key={appointmentRequests._id}
                appointmentRequests={appointmentRequests}
              />
            ))}
          </tbody>
        </table>
      </div> */}

      <div
        className="w-full flex absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
        id="notification"
      >
        <Users />
        {!isOpen && (
          <div className="m-6 inline-flex 2xl:w-2/12 bg-gray-50  overflow-y-auto p-6 absolute right-0">
            <button onClick={handleOpen}>
              <div className="absolute inline-block top-2/4 right-auto bottom-2/4 left-2/4 -translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 p-2.5 text-xs bg-pink-700 rounded-full z-10"></div>
              <div className=" px-8 py-6 bg-indigo-400 flex items-center justify-center text-center rounded-lg shadow-lg">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bell"
                  className="mx-auto text-white w-10"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        )}
        {isOpen && (
          <div className="2xl:w-2/12 bg-gray-50 h-screen overflow-y-auto p-6 absolute right-0">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold leading-6 text-gray-800">
                All Requests
              </p>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl text-gray-800 leading-normal pt-8 border-b pb-2 border-gray-300 ">
              Registration Request
            </h2>
            <div className=" w-96 p-3 mt-2 bg-white rounded">
              <div className="pl-3">
                {registrationRequests?.map((registrationRequest) => (
                  <RegisterRequests
                    key={registrationRequest._id}
                    registrationRequest={registrationRequest}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-2xl text-gray-800 leading-normal pt-8 border-b pb-2 border-gray-300 ">
              Appointment Request
            </h2>
            <div className="w-96 p-3 mt-2 bg-white rounded">
              <div className="pl-3">
                {appointmentRequests?.map((appointmentRequest) => (
                  <RequestInfo
                    key={appointmentRequest._id}
                    appointmentRequest={appointmentRequest}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
