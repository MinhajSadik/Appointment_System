import moment from "moment";
import React from "react";

const Requests = ({ appointmentRequest }) => {
  console.log(appointmentRequest);
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="">
            <p className="fw-bold mb-1">{appointmentRequest?.name}</p>
            <p className="text-muted mb-0">{appointmentRequest?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{appointmentRequest?.role}</p>
        {/* <p className="text-muted mb-0">UI/UX</p> */}
      </td>
      <td>
        <span className="badge badge-warning rounded-pill d-inline">
          {appointmentRequest?.status}
        </span>
      </td>
      <td>{moment(appointmentRequest?.createdAt).format("MMM Do YYYY")}</td>
      <td>
        <button
          type="button"
          className="btn btn-link btn-rounded btn-sm fw-bold"
          data-mdb-ripple-color="dark"
        >
          Accept
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-link badge-danger btn-rounded btn-sm fw-bold"
          data-mdb-ripple-color="dark"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default Requests;
