import { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewAppointmentRequest } from "../redux/api";
import { addNewAppointment } from "../redux/features/appointmentSlice";

const initialState = {
  name: "",
  course: "",
  department: "",
  agenda: "",
  date: "",
  time: "",
};

const AddAppointment = () => {
  const [appointmentInfo, setAppointmentInfo] = useState(initialState);
  const [toggleForm, setToggleForm] = useState(false);
  const { name, course, department, agenda, date, time } = appointmentInfo;
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacher = user?.result?.role === "teacher";
  const student = user?.result?.role === "student";
  const systemAdmin = user?.result?.role === "systemAdmin";

  //get teacher userId
  const userId = user?.result?.role === teacher ? user?.result?._id : null;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentInfo({ ...appointmentInfo, [name]: value });
    console.log(appointmentInfo);
  };

  const handleAppointment = () => {
    if (teacher || systemAdmin) {
      dispatch(addNewAppointment({ appointmentInfo, navigate, toast }));
    } else if (student) {
      dispatch(
        addNewAppointmentRequest({ appointmentInfo, userId, navigate, toast })
      );
    } else {
      toast.error(`${user?.result?.role} check your role and try again`);
    }
  };
  console.log(user?.result?.role);
  return (
    <div>
      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
        className={`bg-blue-400 text-white px-2 py-2 w-full text-left rounded-t-md
                    ${toggleForm ? "rounded-t-md" : "rounded-md"}`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top mr-2" />
          Add Appointment
        </div>
      </button>
      {toggleForm && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="ownerName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={onInputChange}
                placeholder="write an appointment name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="petName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Course
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="course"
                id="course"
                required
                value={course}
                onChange={onInputChange}
                placeholder="which course you wanna take?"
                title="which course you wanna take? e.g. CS"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="petName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Department
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="department"
                id="department"
                required
                value={department}
                onChange={onInputChange}
                placeholder="which department you wanna choose? e.g. CS"
                title="choose a department"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="petName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Agenda
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="agenda"
                id="agenda"
                required
                value={agenda}
                onChange={onInputChange}
                placeholder="what's the agenda?"
                title="write an course agenda!"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptDate"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Date
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
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptTime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Time
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
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleAppointment}
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

export default AddAppointment;
