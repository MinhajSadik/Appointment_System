import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
    dispatch(studentAppointmentRequests({ toast }));
    dispatch(userRegistrationRequests({ toast }));
  }, [dispatch]);
  return (
    <div className="container mx-auto font-thin">
      {registrationRequests.length > 0 && (
        <>
          <h1 className="text-5xl mx-5 my-5">Registration Requests</h1>
          <table className="min-w-full text-center">
            <thead className="border-b bg-gray-800">
              <tr>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Name
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Role
                </th>
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
        </>
      )}

      {appointmentRequests.length > 0 && (
        <>
          <h1 className="text-5xl mx-5 my-5 mt-10">
            Student Appointment Requests
          </h1>
          <table className="min-w-full text-center">
            <thead className="border-b bg-gray-800">
              <tr>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Name
                </th>
                <th className="text-sm font-medium text-white px-6 py-4">
                  Role
                </th>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
