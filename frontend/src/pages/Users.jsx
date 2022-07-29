import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UsersInfo from "../Components/Users/UsersInfo";
import { addUser, deleteUser, getAllUsers } from "../redux/features/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { users } = useSelector((state) => ({
    ...state.user,
  }));
  const { name, email, password, role } = userInfo;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  console.log(users);

  const handleAddUser = (e, id) => {
    e.preventDefault();
    //if all fields are filled
    if (name === "" || email === "" || password === "" || role === "") {
      toast.error("Please fill all fields");
    } else {
      dispatch(addUser({ userInfo, navigate, toast }));
    }
    setUserInfo(initialState);
  };

  //open modal when click on add user
  const handleOpen = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
    setEdit(false);
    console.log("handleAdd");
    setUserInfo(initialState);
  };

  //close modal when click on close
  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // const handleEdit = (e) => {
  //   setIsOpen(!isOpen);
  //   setEdit(true);
  // };

  //delete user
  const handleDelete = (id) => {
    dispatch(deleteUser({ id, navigate, toast }));
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <div className=" w-full h-full flex justify-center items-center">
                <form className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg">
                  <label className="text-gray-700 font-bold py-2" htmlFor="">
                    User Name
                  </label>
                  <input
                    className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                    type="text"
                    name="name"
                    placeholder="username"
                    value={name}
                    required
                    onChange={onInputChange}
                  />
                  <label className="text-gray-700 font-bold py-2" htmlFor="">
                    Email address
                  </label>
                  <input
                    className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                    type="text"
                    name="email"
                    placeholder="email address"
                    value={email}
                    onChange={onInputChange}
                    required
                  />

                  {!edit && (
                    <>
                      <label
                        className="text-gray-700 font-bold py-2"
                        htmlFor=""
                      >
                        Password
                      </label>
                      <input
                        className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={password}
                        required
                        onChange={onInputChange}
                      />
                    </>
                  )}
                  <label className="text-gray-700 font-bold py-2" htmlFor="">
                    Role
                  </label>
                  <select
                    className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                    name="role"
                    value={role}
                    required
                    onChange={onInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>

                  <div className="flex justify-between items-center my-4">
                    {!edit && (
                      <button
                        type="submit"
                        onClick={handleAddUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
                      >
                        Add
                      </button>
                    )}
                    <div className="modal-footer hover:bg-red-600 rounded-full bg-fuchsia-700 text-white hover:text-white w-10 h-6 text-center">
                      <button onClick={handleClose}>X</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight">
            {users.length > 0
              ? "Total Users Found: " + users.length
              : "There are no users yet, you can add one!"}
          </h2>
          <div className="text-end">
            {!isOpen && (
              <button
                type="button"
                onClick={handleOpen}
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              >
                Add User
              </button>
            )}
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Joined
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Actions
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users?.map((user) => (
                  <UsersInfo
                    key={user._id}
                    user={user}
                    edit={edit}
                    handleDelete={handleDelete}
                    setEdit={setEdit}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
