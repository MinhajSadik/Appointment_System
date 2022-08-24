import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "../../redux/features/userSlice";

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
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => ({
    ...state.user,
  }));
  const id = useParams().id;
  // const userId = user?.result?._id;

  const [edit, setEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState(initialState);
  const { name, email, course, department, agenda, date, time, role } =
    profileInfo;

  const systemAdmin = user?.result?.role === "systemAdmin";

  const handleEdit = () => {
    if (!systemAdmin) {
      setProfileInfo({
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
    setProfileInfo({ ...profileInfo, [name]: value });
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
    } else if (!moment(time, "HH:mm", true).isValid()) {
      toast.error("Please enter a valid time");
    } else {
      // dispatch(updateOneUser({ userInfo, id, toast }));
      dispatch(updateProfile({ profileInfo, id, toast }));
      setProfileInfo(initialState);
    }
    setEdit(!edit);
  };

  return (
    <>
      {isLoggedIn && (
        <div className="p-8">
          <div className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <h3 className="mx-2">
                      {systemAdmin && "Admin Profile don't need to edit"}
                    </h3>
                    <p className="text-center mx-2 my-2">
                      {user?.result?.role === "teacher" && (
                        <span>
                          {`${user?.result?.name} You have to edit your profile before you leave!`}
                        </span>
                      )}
                    </p>
                    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg w-full">
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                              Name:
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user?.result?.name}
                              {/* small for role */}
                              <small className="px-1">
                                *{user?.result?.role}
                              </small>
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                              Email:
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user?.result?.email}
                            </dd>
                          </div>
                          {!systemAdmin && (
                            <>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">
                                  Course:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {user?.result?.course}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">
                                  Department:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {user?.result?.department}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">
                                  Agenda:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {user?.result?.agenda}
                                </dd>
                              </div>
                              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">
                                  Date:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {moment(new Date(user?.result?.date)).format(
                                    "dddd, DD, MMMM YYYY"
                                  )}
                                </dd>
                              </div>
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">
                                  Time:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  {moment(user?.result?.time, "HH:mm").format(
                                    "hh:mm a"
                                  )}
                                </dd>
                              </div>
                            </>
                          )}
                        </dl>
                      </div>
                    </div>
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
