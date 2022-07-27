import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  approveStudentRequest,
  rejectStudentRequest,
} from "../../redux/features/appointmentSlice";

const RequestInfo = ({ appointmentRequests }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleApprove = (id) => {
    dispatch(approveStudentRequest({ id, navigate, toast }));
  };

  const handleReject = (id) => {
    dispatch(rejectStudentRequest({ id, navigate, toast }));
  };
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="">
        {/* <div className="flex items-center"> */}
        <p className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {appointmentRequests?.name}
        </p>
        {/* </div> */}
      </td>
      <td className="">
        <p className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {appointmentRequests?.role ? appointmentRequests?.role : "student"}
        </p>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">
          {appointmentRequests?.status}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <p className="">
          {moment(appointmentRequests?.createdAt).format("MMM Do YYYY")}
        </p>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button
          type="button"
          onClick={() => handleApprove(appointmentRequests._id)}
          className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full hover:bg-red-700"
        >
          Approve
        </button>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button
          type="button"
          onClick={() => handleReject(appointmentRequests._id)}
          className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full hover:bg-pink-700"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default RequestInfo;
