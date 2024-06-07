import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../redux/modules/profiles";

const AddExperience = () => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
  });

  const { company, title, location, from, to, current } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience({ formData, navigate }));
  };

  return (
    <div
      className="main"
      style={{ textAlign: "center", width: 700, padding: 15 }}
    >
      <p className="form-title">Add Experience</p>
      <small>* = required field</small>
      <form className="form1" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left" }}>From Date</h3>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="">
          <p style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="">
          <h3 style={{ marginLeft: 110, textAlign: "left" }}>To Date</h3>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>
        <input type="submit" className="btn btn-primary" />
        <Link className="btn btn-light" to="/home">
          Go Back
        </Link>
      </form>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default AddExperience;
