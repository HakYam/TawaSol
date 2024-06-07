import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";

function Sidebar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

    const [image, setImage] = useState("");
    const [errored, setErrored] = useState(false);

    useEffect(() => {
        dispatch(getCurrentProfile());
        if (user) {
            setImage(getProfileImage(user._id));
        }
    }, [dispatch, user]);

    function onError() {
        if (!errored) {
            setErrored(true);
            setImage(defaultImg);
        }
    }

    return (
        <div>
            <div className="sidebar">
                <div>
                    <Link to="/home"><img src={image} onError={onError} className="profile" alt="" /></Link>
                </div>
                <Link to="/home">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/developers">Developers</Link>
                <Link to="/settings">Settings</Link>
            </div>
        </div>
    );
}

export default Sidebar;
