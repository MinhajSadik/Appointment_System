const AppointmentInfo = ({ appointment, onDeleteAppointment }) => {
  // console.log(appointment);
  return (
    <li className="px-3 py-3 flex items-start">
      {/* <button
        onClick={() => onDeleteAppointment(appointment?._id)}
        type="button"
        className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <BiTrash />
      </button> */}
      {/* <div className="flex-grow">
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
      </div> */}
      <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">John Doe</p>
                  <p class="text-muted mb-0">john.doe@gmail.com</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">Software engineer</p>
              <p class="text-muted mb-0">IT department</p>
            </td>
            <td>
              <span class="badge badge-success rounded-pill d-inline">
                Active
              </span>
            </td>
            <td>Senior</td>
            <td>
              <button type="button" class="btn btn-link btn-sm btn-rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  );
};

export default AppointmentInfo;
