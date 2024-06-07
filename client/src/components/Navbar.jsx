import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/modules/users";

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

    const authLinks = (
        <ul>
            <li>
                <Link onClick={() => dispatch(logout())} to="/">Logout</Link>
            </li>
        </ul>
    );

    const links = (
        <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-navbar">
            <h1>
                <Link className="logo-navbar" to="/">
                    TawaSol
                </Link>
            </h1>
            <Fragment>
                {isAuthenticated ? authLinks : links}
            </Fragment>
        </nav>
    );
};

export default Navbar;
