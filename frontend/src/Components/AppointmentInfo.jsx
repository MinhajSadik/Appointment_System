import moment from "moment";
import React, { useState } from "react";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";

const AppointmentInfo = ({ appointment }) => {
  const { name, course, department, agenda, date, time } = appointment;
  const [edit, setEdit] = useState(false);
  const [editingInfo, setEditingInfo] = useState({
    name,
    course,
    department,
    agenda,
    date,
    time,
  });
  //edit appointment when edit icon is clicked
  const handleEdit = (id) => {
    setEdit(!edit);
    console.log(id);
  };

  //update appointment when save icon is clicked
  // const handleSave = (id) => {
  //   setEdit(!edit);
  // };

  //delete appointment when trash icon is clicked
  // const handleDelete = (id) => {
  //   setEdit(!edit);
  // };

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="name"
            id="name"
            value={editingInfo.name}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, name: e.target.value })
            }
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
            value={editingInfo.course}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, course: e.target.value })
            }
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
            value={editingInfo.department}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, department: e.target.value })
            }
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
            value={editingInfo.agenda}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, agenda: e.target.value })
            }
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{appointment?.agenda}</p>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="date"
            id="date"
            value={editingInfo.date}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, date: e.target.value })
            }
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{moment(appointment?.date).format("MMM Do YYYY")}</p>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {edit ? (
          <input
            type="text"
            name="time"
            id="time"
            value={editingInfo.time}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, time: e.target.value })
            }
            className=" text-black max-w-lg block w-full h-5 pl-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md bg-cyan-300"
          />
        ) : (
          <p className="">{appointment?.time}</p>
        )}
        {/* {moment(appointment?.time).format("hh:mm A")} */}
      </td>
      <td>
        <div className="flex">
          <button
            // onClick={() => onDeleteAppointment(appointment?._id)}
            type="button"
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BiTrash />
          </button>
          {edit ? (
            <button
              onClick={() => handleEdit(appointment?._id)}
              type="button"
              className="p-1.5 mr-1.5 mt-1 rounded text-white bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BiSave />
            </button>
          ) : (
            <button
              // onClick={() => onDeleteAppointment(appointment?._id)}
              type="button"
              onClick={() => handleEdit(appointment?._id)}
              className="p-1.5 mr-1.5 mt-1 rounded text-white bg-blue-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BiEdit />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AppointmentInfo;
