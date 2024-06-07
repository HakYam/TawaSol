import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profiles.profile);

    const [image, setImage] = useState("");
    const [errored, setErrored] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        dispatch(getProfileById(id));
        setImage(getProfileImage(id));
    }, [dispatch, id]);

    function onError() {
        if (!errored) {
            setErrored(true);
            setImage(defaultImg);
        }
    }

    return (
        <div className="home">
            {profile === null ? null : (
                <div>
                    <div className="home-row">
                        <div style={{ textAlign: "center" }} className="home-column">
                            <img src={image} className="profile-picture" alt="profile" onError={onError}></img>
                            <p className="name">{profile.user.name}</p>
                        </div>
                        <div className="home-column">
                            <BasicInfo profile={profile} />
                            <div className="social">
                                {profile.social ? Object.keys(profile.social)
                                    .filter(media => profile.social[media] !== "")
                                    .map(media => {
                                        return (
                                            <a key={media} rel="noreferrer" target="_blank" href={profile.social[media]}>
                                                <i className={`fab fa-${media} fa-2x`}></i>
                                            </a>
                                        )
                                    })
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
                            </div>
                            <Education profile={profile} />
                        </div>
                        <div className="home-column">
                            <div className="home-row">
                                <div className="home-column">
                                    <h3>Experience</h3>
                                </div>
                            </div>
                            <Experience profile={profile} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
