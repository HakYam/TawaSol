import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../redux/modules/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
    const alert = useSelector((state) => state.alerts);

    useEffect(() => {
        if (alert.show) {
            const toastTypes = {
                error: toast.error,
                success: toast.success,
                info: toast.info,
                warning: toast.warn,
                default: toast
            };

            const showToast = toastTypes[alert.type] || toastTypes.default;
            showToast(alert.msg);
        }
    }, [alert]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            toast.success("Login successful");
        } catch (error) {
            if (error.errors) {
                error.errors.forEach(err => {
                    toast.error(err.msg);
                });
            } else {
                toast.error("Login failed");
            }
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="main login">
            <ToastContainer />
            <p className="form-title" style={{ textAlign: "center" }}>Sign in</p>
            <form className="form1" onSubmit={onSubmit}>
                <input
                    className="input-text"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    style={{ textAlign: "center" }}
                    required
                />
                <input
                    className="input-text"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    style={{ textAlign: "center" }}
                    required
                />
                <input
                    className="btn btn-primary"
                    style={{ marginLeft: "36%", textAlign: "center" }}
                    type="submit"
                    value="Login"
                />
                <p className="forgot" style={{ textAlign: "center" }}>
                    New to TawaSol? <Link to="/register">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
