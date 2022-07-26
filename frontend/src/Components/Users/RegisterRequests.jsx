import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import {
  approveRegistrationRequest,
  rejectRegistrationRequest,
} from "../../redux/features/userSlice";

const RegisterRequests = ({ registrationRequest }) => {
  const dispatch = useDispatch();
  // const id = useParams().id;
  // console.log(id);

  const handleApprove = (id) => {
    dispatch(approveRegistrationRequest({ id }));
  };

  const handleReject = (id) => {
    dispatch(rejectRegistrationRequest({ id }));
  };

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="">
        {/* <div className="flex items-center"> */}
        <p className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {registrationRequest?.name}
        </p>
        {/* </div> */}
      </td>
      <td className="">
        <p className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {registrationRequest?.role}
        </p>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">
          {registrationRequest?.status}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <p className="">
          {moment(registrationRequest?.createdAt).format("MMM Do YYYY")}
        </p>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button
          type="button"
          onClick={() => handleApprove(registrationRequest._id)}
          className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full hover:bg-red-700"
        >
          Approve
        </button>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button
          type="button"
          onClick={() => handleReject(registrationRequest._id)}
          className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full hover:bg-pink-700"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default RegisterRequests;
