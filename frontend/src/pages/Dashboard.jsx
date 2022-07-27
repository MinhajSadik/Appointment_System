import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestInfo from "../Components/Student/RequestInfo";
import RegisterRequests from "../Components/Users/RegisterRequests";
import { studentAppointmentRequests } from "../redux/features/appointmentSlice";
import { userRegistrationRequests } from "../redux/features/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { appointmentRequests, registrationRequests } = useSelector(
    (state) => ({
      ...state.user,
      ...state.appointment,
    })
  );

  useEffect(() => {
    dispatch(studentAppointmentRequests());
    dispatch(userRegistrationRequests());
  }, [dispatch]);
  return (
    <div className="container mx-auto font-thin">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl mb-3">
            {/* <span className="text-red-400">
              <i className="fas fa-user-plus"></i>
            </span> */}
            Register Requests
          </h1>
          <table className="min-w-full">
            <thead className="border-b bg-gray-800">
              <tr>
                <th className="text-sm font-medium text-white px-3 py-2">
                  Name
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Role
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Status
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Requested Date
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Action
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="table-auto">
              {registrationRequests?.map((registrationRequest) => (
                <RegisterRequests
                  key={registrationRequest._id}
                  registrationRequest={registrationRequest}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl mb-3">
            {/* <span className="text-red-400">
              <i className="fas fa-calendar-alt"></i>
            </span> */}
            Appointment Requests
          </h1>
          <table className="min-w-full">
            <thead className="border-b bg-gray-800">
              <tr>
                <th className="text-sm font-medium text-white px-3 py-2">
                  Name
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Role
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Status
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Requested Date
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Action
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="table-auto">
              {appointmentRequests?.map((appointmentRequests) => (
                <RequestInfo
                  key={appointmentRequests._id}
                  appointmentRequests={appointmentRequests}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
