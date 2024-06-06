import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";

const Private = ({ component: Component }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.users);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Fragment>
          <Sidebar />
          <Component />
        </Fragment>
      ) : (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
};

export default Private;
