import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { studentAppointmentRequests } from "../redux/features/appointmentSlice";
import RegisterRequests from "../Components/Users/RegisterRequests";
import { userRegistrationRequests } from "../redux/features/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { appointmentRequests, user, registrationRequests, isLoggedIn } =
    useSelector((state) => ({
      ...state.user,
      ...state.appointment,
    }));

  console.log("appointmentRequests", appointmentRequests);

  useEffect(() => {
    // dispatch(studentAppointmentRequests());
    dispatch(userRegistrationRequests());
  }, [dispatch]);
  return (
    <div className="container mx-auto font-thin">
      <table className="min-w-full">
        <thead className="border-b bg-gray-800">
          <tr>
            <th className="text-sm font-medium text-white px-3 py-2">Name</th>
            <th className="text-sm font-medium text-white px-6 py-4">Role</th>
            <th className="text-sm font-medium text-white px-6 py-4">Status</th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Request Date
            </th>
            <th className="text-sm font-medium text-white px-6 py-4">Action</th>
            <th className="text-sm font-medium text-white px-6 py-4">Action</th>
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
  );
};

export default Dashboard;
