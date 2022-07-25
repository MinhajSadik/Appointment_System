import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import {
  approveRegistrationRequest,
  rejectRegistrationRequest,
} from "../../redux/features/userSlice";

const Requests = ({ registrationRequest }) => {
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
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="">
            <p className="fw-bold mb-1">{registrationRequest?.name}</p>
            <p className="text-muted mb-0">{registrationRequest?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{registrationRequest?.role}</p>
        {/* <p className="text-muted mb-0">UI/UX</p> */}
      </td>
      <td>
        <span className="badge badge-warning rounded-pill d-inline">
          {registrationRequest?.status}
        </span>
      </td>
      <td>{moment(registrationRequest?.createdAt).format("MMM Do YYYY")}</td>
      <td>
        <button
          type="button"
          onClick={() => handleApprove(registrationRequest._id)}
          className="btn btn-rounded bg-purple-400 text-white btn-sm fw-bold"
          data-mdb-ripple-color="dark"
        >
          Accept
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleReject(registrationRequest._id)}
          className="btn bg-red-500 text-white btn-rounded btn-sm fw-bold"
          data-mdb-ripple-color="dark"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default Requests;
