import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../Shared/LoadingToRedirect";
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  //check if user is logged in? if not redirect to login page
  return user ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
