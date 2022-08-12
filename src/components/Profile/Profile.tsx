import React, {FC} from "react";
import classes from "./Profile.module.css";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {Dispatch} from "redux";
import {ProfileInitialStateType} from "../../redux/profile-reducer";

type PropsType = {
    profilePage: ProfileInitialStateType
    dispatch: Dispatch
}

const Profile: FC<PropsType> = (props) => {
    return (
        <section className={classes.container}>
            <div className={classes.imageMain}>`</div>
            <MyPostContainer/>
        </section>
    )
}

export default Profile;