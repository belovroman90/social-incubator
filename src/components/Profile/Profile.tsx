import React, {FC} from "react"
import classes from "./Profile.module.css"
import userAvatar from "../../assets/joji.jpg"
import {MyPostContainer} from "./MyPost/MyPostContainer"

type PropsType = {
    profile: string
}

export const Profile: FC<PropsType> = (props) => {
    return (
        <section>
            <div className={classes.imageMain}></div>
            <img src={props.profile ? props.profile : userAvatar} alt="profilePhoto"/>
            <MyPostContainer/>
        </section>
    )
}