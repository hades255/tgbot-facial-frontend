import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/authSlice";

const withAuth = (Component) => {
  return (props) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
