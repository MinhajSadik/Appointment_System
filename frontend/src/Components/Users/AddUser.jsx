const AddUser = ({
  edit,
  isOpen,
  userInfo,
  handleClose,
  onInputChange,
  handleAddUser,
}) => {
  const { name, email, password, role } = userInfo;
  return (
    <div>
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
                        required
                        className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={password}
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
                    required={true}
                    onChange={onInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>

                  <div className="flex justify-between items-center my-4">
                    <button
                      type="submit"
                      onClick={handleAddUser}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
                    >
                      {edit ? "Update" : "Add"}
                    </button>

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
    </div>
  );
};

export default AddUser;
