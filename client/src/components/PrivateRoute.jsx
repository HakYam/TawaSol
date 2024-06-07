import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.users);
  const location = useLocation();

  if (loading) return <Spinner />;

  return isAuthenticated ? (
    <Fragment>
      <Sidebar />
      {Component ? <Component /> : <Outlet />}
    </Fragment>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
