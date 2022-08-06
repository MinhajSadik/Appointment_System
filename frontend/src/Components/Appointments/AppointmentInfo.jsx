import moment from "moment";
import React, { useState } from "react";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteAppointment,
  removeAppointment,
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
  const [edit, setEdit] = useState(false);
  const [updatedAppointmentInfo, setUpdatedAppointmentInfo] =
    useState(initialState);

  const { user } = useSelector((state) => ({
    ...state.user,
  }));

  const { name, course, department, agenda, date, time } =
    updatedAppointmentInfo;
  const student = user?.result?.role === "student";

  const handleEdit = () => {
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
    // fill at least one filed
    if (
      name === "" ||
      course === "" ||
      department === "" ||
      agenda === "" ||
      date === "" ||
      time === ""
    ) {
      toast.error("Please fill at least one field");
    } else {
      dispatch(updateAppointment({ updatedAppointmentInfo, id, toast }));
      setUpdatedAppointmentInfo(initialState);
    }
    setEdit(!edit);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (confirm) {
      dispatch(removeAppointment({ id }));
      dispatch(deleteAppointment({ id, toast }));
    }
  };

  return (
    <tr>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div class="flex items-center">
          {edit ? (
            <input
              type="text"
              name="name"
              value={name}
              onChange={onInputChange}
              className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
            />
          ) : (
            <p class="text-gray-900 whitespace-no-wrap">{appointment?.name}</p>
          )}
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
          <p class="text-gray-900 whitespace-no-wrap">{appointment?.course}</p>
        )}
      </td>

      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
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
            <>
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span class="relative">{appointment?.department}</span>
            </>
          )}
        </span>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
          <p class="text-gray-900 whitespace-no-wrap">{appointment?.agenda}</p>
        )}
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
          <p class="text-gray-900 whitespace-no-wrap">
            {moment(appointment?.date).format("MMM Do YYYY")}
          </p>
        )}
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
          <p class="text-gray-900 whitespace-no-wrap">
            {moment(appointment.time, "HH:mm").format("hh:mm a")}
          </p>
        )}
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* {!student && ( */}
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
        {/* )} */}
      </td>
    </tr>
  );
};

export default AppointmentInfo;
