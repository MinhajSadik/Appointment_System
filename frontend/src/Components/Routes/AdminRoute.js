import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => ({ ...state.user }));
  const systemAdmin = user?.result?.role === "systemAdmin";
  return systemAdmin ? (
    children
  ) : (
    <div className="container text-center relative top-60 left-10 font-bold">
      <h1>
        {`${
          user?.result?.role ? user?.result?.role : "Guest"
        } You are not authorized to access this page`}
      </h1>
      <span>
        Visit
        {isLoggedIn ? (
          <Link className="underline text-blue-500 mx-2" to="/appointments">
            {" "}
            Appointments{" "}
          </Link>
        ) : (
          <Link className="underline text-blue-500 mx-2" to="/">
            {" "}
            Home
          </Link>
        )}
        Page
      </span>
    </div>
  );
};

export default AdminRoute;
