import { BiTrash } from "react-icons/bi";

const AppointmentInfo = ({ appointment, onDeleteAppointment }) => {
  // console.log(appointment);
  return (
    <li className="px-3 py-3 flex items-start">
      <button
        onClick={() => onDeleteAppointment(appointment?._id)}
        type="button"
        className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <BiTrash />
      </button>
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="flex-none font-medium text-2xl text-blue-500">
            Name: {appointment?.name}
          </span>
          <span className="flex-grow text-right">
            Course: {appointment?.time}
          </span>
        </div>
        <div>
          <b className="font-bold text-blue-500">Department: </b>
          {appointment?.department}
        </div>
        <div className="leading-tight">Agenda: {appointment?.agenda}</div>
      </div>
    </li>
  );
};

export default AppointmentInfo;
