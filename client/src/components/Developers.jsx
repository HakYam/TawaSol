import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";

function Developers() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const { profiles, loading } = useSelector((state) => state.profiles);

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    return (
        <div>
            {loading ? null : (
                <div className="home">
                    <div className="row">
                        {profiles.filter(profile => profile.user._id !== user._id).map((profile) => (
                            <div className="column" key={profile.user._id}>
                                <Link to={`/profile/${profile.user._id}`}><Developer profile={profile} /></Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Developer({ profile }) {
    const [errored, setErrored] = useState(false);
    const [image, setImage] = useState(getProfileImage(profile.user._id));

    function onError() {
        if (!errored) {
            setErrored(true);
            setImage(defaultImg);
        }
    }

    return (
        <div className="card">
            <img onError={onError} src={image} alt=""></img>
            <div className="card-container">
                <p>{profile.user.name}</p>
                <p className="title">{profile.status}</p>
            </div>
        </div>
    );
}

export default Developers;
