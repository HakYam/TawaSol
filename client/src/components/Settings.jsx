import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../redux/modules/profiles";

function Settings() {
  const dispatch = useDispatch();

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
  };

  return (
    <div className="home">
      <div className="post-card center">
        <div style={{ marginBottom: 15 }}>
          <p>Update your profile information.</p>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Link className="btn btn-primary" to="/edit-profile">
            Edit Account
          </Link>
        </div>
      </div>
      <div className="post-card center">
        <div>
          <p>
            This will completely delete your account and remove your data from
            TawaSol.
          </p>
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
