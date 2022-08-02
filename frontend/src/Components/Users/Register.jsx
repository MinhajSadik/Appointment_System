import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegisterRequest } from "../../redux/features/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.user }));
  const { name, email, password, role } = registerInfo;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
    console.log(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && role) {
      dispatch(userRegisterRequest({ registerInfo, navigate, toast }));
    }
  };

  useEffect(() => {
    if (error || loading) {
      error && toast.error(error);
    }
  }, [error, loading]);

  return (
    <div action="">
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="RegisterImage"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">
                    Dear {`${name}`} sign up by email, it will send a request to
                    admin, after approval you have to log in.
                  </p>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  {/* <p className="text-center font-semibold mx-4 mb-0">Or</p> */}
                  <p className="text-center font-semibold mx-4 mb-0">
                    Request an account
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    type="name"
                    name="name"
                    required
                    value={name}
                    onChange={onInputChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="what's your name?"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={onInputChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter your unique email"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={onInputChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter strong password"
                  />
                </div>
                <select
                  required
                  name="role"
                  onChange={onInputChange}
                  className="mb-6"
                  value={role}
                >
                  <option value="select a role">Select a Role</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>

                <div className="text-center lg:text-left">
                  <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Register
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
