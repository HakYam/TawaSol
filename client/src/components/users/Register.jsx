import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../redux/modules/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            try {
                await dispatch(register({ name, email, password })).unwrap();
                toast.success("Registration successful");
            } catch (error) {
                // هنا نعرض جميع رسائل الأخطاء القادمة من الخادم
                if (error.errors) {
                    error.errors.forEach(err => {
                        toast.error(err.msg); // عرض رسالة الخطأ باستخدام toast
                    });
                } else {
                    toast.error("Registration failed"); // عرض رسالة خطأ عامة في حالة عدم وجود تفاصيل
                }
            }
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="main register">
            <ToastContainer />
            <p className="form-title" style={{ textAlign: "center" }}>Sign Up</p>
            <form className="form1" onSubmit={onSubmit}>
                <input
                    className="input-text"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={onChange}
                    style={{ textAlign: "center" }}
                />
                <input
                    className="input-text"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    style={{ textAlign: "center" }}
                />
                <input
                    className="input-text"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    style={{ textAlign: "center" }}
                />
                <input
                    className="input-text"
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={onChange}
                    style={{ textAlign: "center" }}
                />
                <input
                    className="btn btn-primary"
                    style={{ marginLeft: "36%", textAlign: "center" }}
                    type="submit"
                    value="Register"
                />
                <p className="forgot" style={{ textAlign: "center" }}>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
