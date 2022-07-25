import moment from "moment";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const AppointmentInfo = ({ appointment }) => {
  const { name, course, department, agenda, date, time } = appointment;
  const [edit, setEdit] = useState(false);
  const [editingInfo, setEditingInfo] = useState("");
  //edit appointment when edit icon is clicked
  const handleEdit = (id) => {
    setEdit(true);
    setEditingInfo({
      name: name,
      course: course,
      department: department,
      agenda: agenda,
      date: date,
      time: time,
    });
  };
  return (
    <tr>
      {
        //if edit is true, show the form
        edit ? (
          <td>
            <form>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editingInfo.name}
                  onChange={(e) =>
                    setEditingInfo({ ...editingInfo, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={editingInfo.course}
                  onChange={(e) =>
                    setEditingInfo({ ...editingInfo, course: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={editingInfo.department}
                  onChange={(e) =>
                    setEditingInfo({
                      ...editingInfo,
                      department: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  name="agenda"
                  id="agenda"
                  value={editingInfo.agenda}
                  onChange={(e) =>
                    setEditingInfo({ ...editingInfo, agenda: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="date"
                  id="date"
                  value={editingInfo.date}
                  onChange={(e) =>
                    setEditingInfo({ ...editingInfo, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="time"
                  id="time"
                  value={editingInfo.time}
                  onChange={(e) =>
                    setEditingInfo({ ...editingInfo, time: e.target.value })
                  }
                />
              </div>
            </form>
          </td>
        ) : (
          //if edit is false, show the appointment info
          <>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-0">
                  {edit && (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={editingInfo.name}
                      onChange={(e) =>
                        setEditingInfo({ ...editingInfo, name: e.target.value })
                      }
                      // className="form-control"
                    />
                  )}
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
          </>
        )
      }

      <td>
        <div className="d-flex align-items-center">
          <button
            // onClick={() => onDeleteAppointment(appointment?._id)}
            type="button"
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BiTrash />
          </button>
          <button
            // onClick={() => onDeleteAppointment(appointment?._id)}
            type="button"
            onClick={() => handleEdit(appointment?._id)}
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-blue-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BiEdit />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AppointmentInfo;
