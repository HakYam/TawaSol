import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert = () => {
  const alert = useSelector((state) => state.alerts);

  useEffect(() => {
    console.log("inside useEffect ", alert);
    if (alert.show) {
      console.log("showing the alert...");
      toast(alert.msg, { type: alert.type });
    }
  }, [alert]);

  return <ToastContainer />;
};

export default Alert;
