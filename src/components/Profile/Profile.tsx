import React, {FC} from "react";
import classes from "./Profile.module.css";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {ProfileType} from "../../redux/profile-reducer";
import {url} from "inspector";

type PropsType = {
    profile: ProfileType
}

export const Profile: FC<PropsType> = (props) => {
    return (
        <section>
            <div className={classes.imageMain}></div>
            {/*<img src={props.profile.photo.small} alt="photoProfile"/>*/}
            <MyPostContainer/>
        </section>
    )
}