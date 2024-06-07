import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../redux/modules/profiles";

const AddEducation = () => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false
    });

    const { school, degree, fieldofstudy, from, to, current } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addEducation({ formData, navigate }));
    };

    return (
        <div className="main" style={{ textAlign: "center", width: 700, padding: 15 }}>
            <p className="form-title">Add Education</p>
            <small>* = required field</small>
            <form className="form1" onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder="* School" name="school" value={school} onChange={onChange} />
                </div>
                <div>
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={onChange} />
                </div>
                <div>
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
                </div>
                <div>
                    <h3 style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>From Date</h3>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div>
                    <p style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            onChange={() => setFormData({ ...formData, current: !current })}
                        />
                        Current School
                    </p>
                </div>
                <div>
                    <h3 style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>To Date</h3>
                    <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
                </div>
                <input type="submit" className="btn btn-primary" />
                <Link className="btn btn-light" to="/home">Go Back</Link>
            </form>
        </div>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default AddEducation;
