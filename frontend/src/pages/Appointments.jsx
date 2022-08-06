import React, { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AddAppointment from "../Components/Appointments/AddAppointment";
import AppointmentInfo from "../Components/Appointments/AppointmentInfo";
import SearchAppointment from "../Components/Appointments/SearchAppointment";
import AppointmentRequest from "../Components/RequestsInfo/AppointmentRequest";
import { getAllAppointments } from "../redux/features/appointmentSlice";
import { getAllTeachers } from "../redux/features/teacherSlice";

const Appointments = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [orderBy, setOrderBy] = useState("department");
  const { appointments, user } = useSelector((state) => ({
    ...state.appointment,
    ...state.user,
  }));

  const filteredAppointment =
    appointments &&
    Object.values(appointments)
      ?.filter((item) => {
        return (
          item.name?.toLowerCase().includes(query.toLowerCase()) ||
          item.course?.toLowerCase().includes(query.toLowerCase()) ||
          item.department?.toLowerCase().includes(query.toLowerCase()) ||
          item.agenda?.toLowerCase().includes(query.toLowerCase()) ||
          item.date?.toLowerCase().includes(query.toLowerCase()) ||
          item.time?.toLowerCase().includes(query.toLowerCase())
        );
      })
      .sort((a, b) => {
        let order = orderBy === "time" ? 1 : -1;
        return a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase()
          ? -1 * order
          : 1 * order;
      });

  useEffect(() => {
    dispatch(getAllAppointments());
    dispatch(getAllTeachers());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400" />
        Your Appointments
      </h1>
      {user?.result?.role === "student" ? (
        <AppointmentRequest user={user} key={user?.result?._id} />
      ) : (
        <AddAppointment />
      )}
      <SearchAppointment
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort) => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />
      {/* <div class="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div class="py-8">
          <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 class="text-2xl leading-tight">Users</h2>
            <div class="text-end">
              <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div class=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="name"
                  />
                </div>
                <button
                  class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Course
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Department
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Agenda
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Date
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Time
                </th>
                {/* edit and delete button */}
                <th
                  scope="col"
                  class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointment &&
                filteredAppointment.map((appointment) => (
                  <AppointmentInfo
                    appointment={appointment}
                    key={appointment._id}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;