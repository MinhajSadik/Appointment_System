import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOneUser, deleteUser } from "../../redux/features/userSlice";

const UsersInfo = ({ userInfo, setUserInfo, setEdit, setIsOpen, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    setIsOpen(true);
    setEdit(true);
    setUserInfo({
      ...userInfo,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    navigate(`/admin/dashboard/${user._id}`);
  };

  //delete user
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      dispatch(deleteOneUser({ id }));
      dispatch(deleteUser({ id, toast }));
    }
  };

  return (
    <tr>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
          </div>
        </div>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <small className="relative">
            {new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </small>
        </span>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <button
          type="button"
          onClick={() => handleEdit(user?._id)}
          className="flex items-center justify-center px-3 py-1 text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          EDIT
        </button>
      </td>
      <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
        <button
          type="button"
          onClick={() => handleDelete(user?._id)}
          className="flex items-center justify-center px-3 py-1 text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default UsersInfo;
