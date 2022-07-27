import React, { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  //all the fields with teacher name and userId
  name: "",
  course: "",
  department: "",
  agenda: "",
  date: "",
  time: "",
  teacherId: "",
};

const RequestAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers } = useSelector((state) => ({ ...state.teacher }));
  const { user, appointments } = useSelector((state) => ({
    ...state.user,
    ...state.appointment,
  }));

  const [appointmentRequestInfo, setAppointmentRequestInfo] =
    useState(initialState);
  const [toggleForm, setToggleForm] = useState(false);
  const { name, course, department, agenda, date, time, teacherId } =
    appointmentRequestInfo;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentRequestInfo({ ...appointmentRequestInfo, [name]: value });
    console.log(teacherId);
  };

  const handleAppointmentRequest = () => {};
  return (
    <div>
      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
        className={`bg-blue-400 text-dark px-2 py-2 w-full text-left rounded-t-md
                    ${toggleForm ? "rounded-t-md" : "rounded-md"}`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top mr-2" />
          Request an Appointment
        </div>
      </button>
      {toggleForm && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Write Appointment Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={onInputChange}
                placeholder="Write an appointment name"
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="Course"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Write Course Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="course"
                id="course"
                required
                value={course}
                onChange={onInputChange}
                placeholder="Which course would you like to attend?"
                title="Which course you wanna take? e.g. English, Math, etc."
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="Teacher"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Request for Teacher
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="teacherId"
                name="teacherId"
                required
                value={teacherId}
                onChange={onInputChange}
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              >
                <option>Request for Teacher</option>
                {teachers &&
                  teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="Department"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Request for Department
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                name="department"
                id="department"
                required
                value={department}
                onChange={onInputChange}
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Request for Department</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.department}>
                    {teacher.department}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="Agenda"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              What is your agenda?
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="agenda"
                id="agenda"
                required
                value={agenda}
                onChange={onInputChange}
                placeholder="What's your agenda?"
                title="Write an course agenda!"
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="Date"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Choose an Unscheduled Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="date"
                name="date"
                id="date"
                required
                value={date}
                onChange={onInputChange}
                placeholder="when you are free?"
                title="when you are free? e.g. 12-12-2022"
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="Time"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Choose an Unscheduled Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="time"
                name="time"
                id="time"
                required
                value={time}
                onChange={onInputChange}
                placeholder="what time would be best?"
                title="what time would be best? e.g. 12:00"
                className="pl-2 max-w-lg block w-full h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleAppointmentRequest}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAppointment;
