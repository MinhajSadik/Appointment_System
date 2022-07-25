import moment from "moment";
import { BiTrash } from "react-icons/bi";
const AppointmentInfo = ({ appointment, onDeleteAppointment }) => {
  // console.log(appointment.name);
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <button
            onClick={() => onDeleteAppointment(appointment?._id)}
            type="button"
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BiTrash />
          </button>
          <div className="ms-3">
            <p className="fw-bold mb-1">{appointment?.name}</p>
            {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{appointment?.course}</p>
      </td>
      <td>
        <span className="badge badge-warning rounded-pill d-inline">
          {appointment?.department}
        </span>
      </td>
      <td>{appointment?.agenda}</td>
      <td>{moment(appointment?.date).format("DD MMM YYYY")}</td>
      <td>{moment(appointment?.time).format("hh:mm A")}</td>
    </tr>
  );
};

export default AppointmentInfo;
