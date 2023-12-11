import React, {FC} from "react"
import classes from "./Profile.module.css"
import userAvatar from "../../assets/joji.jpg"
import {MyPostContainer} from "./MyPost/MyPostContainer"
import {Preloader} from "../CommonComponents/Preloader/Preloader";
// import {FriendsContainer} from "../Users/Friends";

type PropsType = {
    profile: string
    isFetching: boolean
    isAuth: boolean
}

export const Profile: FC<PropsType> = (props) => {

    return (
        <section>
            {props.isFetching ? <Preloader/> :
                <>
                    <div className={classes.imageMain}></div>
                    <img src={props.profile ? props.profile : userAvatar} alt="profilePhoto"/>
                    {/*<FriendsContainer/>*/}
                    <MyPostContainer/>
                </>
            }
        </section>
    )
}