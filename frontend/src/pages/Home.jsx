import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AddAppointment from "../Components/AddAppointment";
import AppointmentInfo from "../Components/AppointmentInfo";
import SearchAppointment from "../Components/SearchAppointment";
import { getAllAppointments } from "../redux/features/appointmentSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => ({ ...state.appointment }));
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [orderBy, setOrderBy] = useState("department");

  const filteredAppointment =
    appointments &&
    appointments
      ?.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.course.toLowerCase().includes(query.toLowerCase()) ||
          item.department.toLowerCase().includes(query.toLowerCase()) ||
          item.agenda.toLowerCase().includes(query.toLowerCase()) ||
          item.date.toLowerCase().includes(query.toLowerCase()) ||
          item.time.toLowerCase().includes(query.toLowerCase())
        );
      })
      .sort((a, b) => {
        let order = orderBy === "time" ? 1 : -1;
        return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
          ? -1 * order
          : 1 * order;
      });

  console.log(filteredAppointment);

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400" />
        Your Appointments
      </h1>
      <AddAppointment />
      <SearchAppointment
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort) => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointment?.map((appointment) => (
          <AppointmentInfo key={appointment._id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
