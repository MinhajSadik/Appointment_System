import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddUser from "../Components/Users/AddUser";
import UsersInfo from "../Components/Users/UsersInfo";
import { addUser, getAllUsers, updateUser } from "../redux/features/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const Users = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { users } = useSelector((state) => ({
    ...state.user,
  }));

  // console.log("id", id);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    //if all fields are filled
    if (!edit) {
      dispatch(addUser({ userInfo, toast }));
    } else {
      // dispatch(updateOneUser({ userInfo, id }));
      dispatch(updateUser({ userInfo, id, toast }));
    }
    setUserInfo(initialState);
    setIsOpen(false);
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

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="container sm:px-8 max-w-3xl">
      <AddUser
        isOpen={isOpen}
        handleClose={handleClose}
        handleAddUser={handleAddUser}
        onInputChange={onInputChange}
        userInfo={userInfo}
        edit={edit}
      />
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
            <table className="min-w-full leading-normal text-center">
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

              {!isOpen && (
                <tbody className="text-center">
                  {users?.map((user) => (
                    <UsersInfo
                      key={user._id}
                      user={user}
                      edit={edit}
                      setEdit={setEdit}
                      setIsOpen={setIsOpen}
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
