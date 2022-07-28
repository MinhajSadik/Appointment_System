import moment from "moment";
import React, { useState } from "react";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteAppointment,
  updateAppointment,
} from "../../redux/features/appointmentSlice";

const initialState = {
  name: "",
  course: "",
  department: "",
  agenda: "",
  date: "",
  time: "",
};
const AppointmentInfo = ({ appointment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [updatedAppointmentInfo, setUpdatedAppointmentInfo] =
    useState(initialState);

  const { user } = useSelector((state) => ({
    ...state.user,
  }));

  const { name, course, department, agenda, date, time } =
    updatedAppointmentInfo;
  const student = user?.result?.role === "student";

  const handleEdit = (id) => {
    setEdit(!edit);
    setUpdatedAppointmentInfo({
      ...appointment,
      name: appointment.name,
      course: appointment.course,
      department: appointment.department,
      agenda: appointment.agenda,
      date: appointment.date,
      time: appointment.time,
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointmentInfo({ ...updatedAppointmentInfo, [name]: value });
  };

  const handleSave = (id) => {
    setEdit(!edit);
    if (
      name === "" ||
      course === "" ||
      department === "" ||
      agenda === "" ||
      date === "" ||
      time === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      dispatch(
        updateAppointment({ updatedAppointmentInfo, id, navigate, toast })
      );
      setUpdatedAppointmentInfo(initialState);
    }
    setEdit(!edit);
  };

  const handleDelete = (id) => {
    dispatch(deleteAppointment({ id, navigate, toast }));
  };

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{appointment?.name}</p>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="course"
            id="course"
            value={course}
            onChange={onInputChange}
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{appointment?.course}</p>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="department"
            id="department"
            value={department}
            onChange={onInputChange}
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">
            {appointment?.department}
          </span>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="agenda"
            id="agenda"
            value={agenda}
            onChange={onInputChange}
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{appointment?.agenda}</p>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={onInputChange}
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{moment(appointment?.date).format("MMM Do YYYY")}</p>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={onInputChange}
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">
            {moment(appointment.time, "HH:mm").format("hh:mm a")}
          </p>
        )}
      </td>
      <td>
        {!student && (
          <div className="flex">
            <button
              onClick={() => handleDelete(appointment?._id)}
              type="button"
              className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BiTrash />
            </button>
            {edit ? (
              <button
                onClick={() => handleSave(appointment?._id)}
                type="button"
                className="p-1.5 mr-1.5 mt-1 rounded text-white bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <BiSave />
              </button>
            ) : (
              <button
                type="button"
                id="edit"
                onClick={() => handleEdit(appointment?._id)}
                className="p-1.5 mr-1.5 mt-1 rounded text-white bg-blue-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <BiEdit />
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};

export default AppointmentInfo;
