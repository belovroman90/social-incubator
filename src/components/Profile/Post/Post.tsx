import React from 'react';
import classes from "./Post.module.css";

type PropsType = {
    message: string
}

export const Post = (props: PropsType) => {
    return (
        <div className={classes.post}>
            <img className={classes.avatar}
                 src="https://www.wallpaperflare.com/static/283/269/235/cat-face-close-view-wallpaper.jpg" alt={"cat"}/>
            <span>{props.message}</span>
        </div>
    );
};

export default Post;