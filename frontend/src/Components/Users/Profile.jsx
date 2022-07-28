import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/features/userSlice";

const initialState = {
  name: "",
  email: "",
  course: "",
  departmenet: "",
  agenda: "",
  date: "",
  time: "",
  role: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => ({
    ...state.user,
  }));
  const id = useParams().id;
  // const userId = user?.result?._id;

  const [edit, setEdit] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(initialState);
  const { name, email, course, department, agenda, date, time, role } =
    updatedUserInfo;

  const systemAdmin = user?.result?.role === "systemAdmin";

  const handleEdit = () => {
    if (!systemAdmin) {
      setUpdatedUserInfo({
        name: user?.result?.name,
        email: user?.result?.email,
        course: user?.result?.course,
        department: user?.result?.department,
        agenda: user?.result?.agenda,
        date: user?.result?.date,
        time: user?.result?.time,
        role: user?.result?.role,
      });
    }
    setEdit(!edit);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({ ...updatedUserInfo, [name]: value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      course === "" ||
      department === "" ||
      agenda === "" ||
      date === "" ||
      time === ""
    ) {
      toast.error("Please fill all the fields");
    }
    //check if email is valid
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
    }
    //check if date is valid
    else if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      toast.error("Please enter a valid date");
    }
    //check if time is valid
    else if (!moment(time, "HH:mm", true).isValid()) {
      toast.error("Please enter a valid time");
    } else {
      dispatch(updateUser({ updatedUserInfo, id, navigate, toast }));
      setUpdatedUserInfo(initialState);
    }
    setEdit(!edit);
  };

  return (
    <>
      {isLoggedIn && (
        <div className="p-8">
          <div className="bg-white shadow">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative"></div>
            </div>
            {/* <div className="mt-10 text-center border-b pb-12">
              <h4 className="text-4xl font-medium text-gray-700">
                Hi, {user?.result?.name}
                <small className="font-light text-gray-500 m-2">
                  {user?.result?.role}
                </small>
              </h4>
              <p className="font-light text-gray-600 mt-3">
                Email: {user?.result?.email}
              </p>

              {!systemAdmin && (
                <>
                  <p className="mt-8 text-gray-500">
                    Course: {user?.result?.course}
                  </p>
                  <p className="mt-2 text-gray-500">
                    Department: {user?.result?.department}
                  </p>
                  <p className="mt-2 text-gray-500">
                    Agenda: {user?.result?.agenda}
                  </p>
                  <p className="mt-2 text-gray-500">
                    Date:{" "}
                    {moment(new Date(user?.result?.date)).format(
                      "dddd, DD, MMMM YYYY"
                    )}
                  </p>
                  <p className="mt-2 text-gray-500">
                    Time:{" "}
                    {moment(user?.result?.time, "HH:mm").format("hh:mm a")}
                  </p>
                </>
              )}
            </div> */}
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <p className="text-center mx-2 my-2">
                      {user?.result?.role === "teacher" && (
                        <span>{`@${user?.result?.name} You have to Edit Your Profile Before Leave!`}</span>
                      )}
                    </p>
                    <table class="min-w-full border text-center">
                      <tbody>
                        <tr class="border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Name:
                          </td>
                          <td class="text-sm text-gray-900 font-blod px-6 py-4 whitespace-nowrap border-r">
                            {user?.result?.name}
                            <small>
                              <span class="text-gray-500 ml-1">
                                {user?.result?.role}
                              </span>
                            </small>
                          </td>
                        </tr>
                        <tr class="bg-white border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Email
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {user?.result?.email}
                          </td>
                        </tr>
                        {!systemAdmin && (
                          <>
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                Course
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                {user?.result?.course}
                              </td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                Department
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                {user?.result?.department}
                              </td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                Agenda
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                {user?.result?.agenda}
                              </td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                Date
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                {moment(new Date(user?.result?.date)).format(
                                  "dddd, DD, MMMM YYYY"
                                )}
                              </td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                Time
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                {moment(user?.result?.time, "HH:mm").format(
                                  "hh:mm a"
                                )}
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* edit profile button */}
            {!systemAdmin && (
              <div className="text-center">
                <button
                  className="bg-blue-500 text-white px-4 m-2 py-2 rounded-full hover:bg-blue-700"
                  onClick={() => handleEdit()}
                >
                  Edit Profile
                </button>
              </div>
            )}
            {
              //edit profile form
              edit && (
                <form onSubmit={handleProfileUpdate}>
                  <div className="h-screen py-5 px-3 bg-white items-center">
                    <div className="bg-white">
                      <h4 className="flex justify-center p-3 text-[22px]">
                        Edit Your Profile
                      </h4>
                      <div className="md:grid grid-cols-12 flex flex-col md:items-center gap-4 p-4">
                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            Name alike to your email address
                          </span>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                            placeholder="what's your first part of email name"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            Do you have another email?
                          </span>
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            placeholder="do you wanna change your email?"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            What course you are in?
                          </span>
                          <input
                            type="text"
                            name="course"
                            value={course}
                            onChange={onInputChange}
                            placeholder="what course are you in"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            Which department are you in?
                          </span>
                          <input
                            type="text"
                            name="department"
                            value={department}
                            onChange={onInputChange}
                            placeholder="which department you are in"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            what's your agenda?
                          </span>
                          <input
                            type="text"
                            name="agenda"
                            value={agenda}
                            onChange={onInputChange}
                            placeholder="what's your agenda"
                            className=" h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            Available Date
                          </span>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={onInputChange}
                            placeholder="available date"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            Available Time
                          </span>
                          <input
                            type="time"
                            name="time"
                            value={time}
                            onChange={onInputChange}
                            placeholder="available time"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>

                        <div className="col-span-6 relative">
                          <span className="absolute bg-white left-3 -top-[12px] px-2">
                            Role
                          </span>
                          <input
                            type="text"
                            name="role"
                            value={role}
                            disabled
                            onChange={onInputChange}
                            placeholder="role"
                            className="text-[13px] h-12 text-gray-700 w-full border-2 px-2 rounded-sm"
                          />
                        </div>
                      </div>
                      <div className="px-4 text-right py-2">
                        <button className="h-10 w-32 rounded-sm shadow-md text-white text-[16px] hover:bg-green-700 bg-green-600">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
