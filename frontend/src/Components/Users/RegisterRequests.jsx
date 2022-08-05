import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  approveRegistrationRequest,
  approveUserRequest,
  rejectRegistrationRequest,
  rejectUserRequest,
} from "../../redux/features/userSlice";

const RegisterRequests = ({ registrationRequest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to approve this request?"
    );
    if (confirm) {
      //approveUserRequest is an reducer for remove instently
      dispatch(approveUserRequest({ id }));
      dispatch(approveRegistrationRequest({ id, navigate, toast }));
    }
  };

  const handleReject = (id) => {
    //prompt the user to confirm the action
    const confirm = window.confirm(
      "Are you sure you want to reject this request?"
    );
    if (confirm) {
      dispatch(rejectUserRequest({ id }));
      dispatch(rejectRegistrationRequest({ id, navigate, toast }));
    }
  };

  return (
    <div className="pl-2 flex">
      <div className="flex-1 mb-5">
        <div className="flex items-center justify-between">
          <p className="text-sm leading-none py-1 w-72">
            <span className="text-indigo-700 uppercase italic">
              {registrationRequest?.name}
            </span>{" "}
            <small>sent a registration request</small>
          </p>
          <p className="text-sm leading-none py-1">
            <span className="text-black">{registrationRequest?.email}</span>
          </p>
        </div>
        <p className="text-sm leading-none py-1 w-72">
          <small className="text-yellow-500">Role as a: </small>
          <span className="text-indigo-700 italic">
            {registrationRequest?.role}
          </span>{" "}
        </p>
        <p className="text-xs inline-block py-1 mr-3 leading-none text-center whitespace-nowrap font-bold text-white rounded-full">
          <span className="text-xs inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">
            {registrationRequest?.status}
          </span>
        </p>
        <button
          type="button"
          onClick={() => handleApprove(registrationRequest._id)}
          className="text-xs w-20 inline-block py-1 px-2.5 mr-3 leading-none text-center whitespace-nowrap font-bold bg-blue-600 text-white rounded-full hover:bg-red-700"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => handleReject(registrationRequest._id)}
          className="text-xs w-20 inline-block py-1 px-2.5 mr-3 leading-none text-center whitespace-nowrap font-bold bg-red-600 text-white rounded-full hover:bg-pink-700"
        >
          Reject
        </button>
        <p className="text-xs w-48 leading-3 py-1 text-blue-600">
          {moment(registrationRequest.createdAt).startOf().fromNow()}
        </p>
      </div>
    </div>
  );
};

export default RegisterRequests;
