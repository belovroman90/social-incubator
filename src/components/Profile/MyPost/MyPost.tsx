import React, {ChangeEvent, FC, KeyboardEvent} from "react";
import classes from "./MyPost.module.css";
import {ProfileToPropsType} from "./MyPostContainer";
import Post from "../Post/Post";

export const MyPost: FC<ProfileToPropsType> = (props) => {

    function onEnterAddPost(e: KeyboardEvent<HTMLTextAreaElement>) {
        e.key === 'Enter' && props.addPost()
    }

    const changeNewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewTextHandler(e.currentTarget.value)
    }

    const postsElements = props.profilePage.postsMessages.map(el => {
        return (
            <Post key={el.id} message={el.post}/>
        )
    })

    return (
        <div>
            <div className={classes.newPost}>
            <textarea
                value={props.profilePage.newPostText}
                onChange={changeNewTextHandler}
                onKeyPress={onEnterAddPost}
            > </textarea>
                <button className={classes.buttonAdd}
                        onClick={props.addPost}
                >Add Post
                </button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>

    );
};