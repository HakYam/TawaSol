import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteEducation, deleteExperience } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";

const Home = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profiles.profile);
    const user = useSelector((state) => state.users.user);

    const [image, setImage] = useState("");
    const [errored, setErrored] = useState(false);

    useEffect(() => {
        dispatch(getCurrentProfile());
        if (user) {
            setImage(getProfileImage(user._id));
        }
    }, [dispatch, user]);

    const onError = () => {
        if (!errored) {
            setErrored(true);
            setImage(defaultImg);
        }
    };

    return (
        <div className="home">
            {profile === null ? (
                <div>
                    <p style={{ padding: 10 }}>Please create a profile</p>
                    <Link to="/create-profile" className="btn btn-primary">Create Profile</Link>
                </div>
            ) : (
                <div>
                    <div className="home-row">
                        <div style={{ textAlign: "center" }} className="home-column">
                            <img src={image} className="profile-picture" alt="profile" onError={onError}></img>
                            <p className="name">{profile.user.name}</p>
                        </div>
                        <div className="home-column">
                            <BasicInfo profile={profile} />
                            <div className="social">
                                {profile.social
                                    ? Object.keys(profile.social)
                                        .filter((media) => profile.social[media] !== "")
                                        .map((media) => (
                                            <a key={media} rel="noreferrer" target="_blank" href={profile.social[media]}>
                                                <i className={`fab fa-${media} fa-2x`}></i>
                                            </a>
                                        ))
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="home-row">
                        <div className="home-column">
                            <div className="home-row">
                                <div className="home-column">
                                    <h3>Education</h3>
                                </div>
                                <div className="home-column">
                                    <Link to="/add-education" className="add-button">
                                        <i className="fa fa-plus-circle fa-2x"></i>
                                    </Link>
                                </div>
                            </div>
                            <Education profile={profile} deleteEducation={(id) => dispatch(deleteEducation(id))} />
                        </div>
                        <div className="home-column">
                            <div className="home-row">
                                <div className="home-column">
                                    <h3>Experience</h3>
                                </div>
                                <div className="home-column">
                                    <Link to="/add-experience" className="add-button">
                                        <i className="fa fa-plus-circle fa-2x"></i>
                                    </Link>
                                </div>
                            </div>
                            <Experience profile={profile} deleteExperience={(id) => dispatch(deleteExperience(id))} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
