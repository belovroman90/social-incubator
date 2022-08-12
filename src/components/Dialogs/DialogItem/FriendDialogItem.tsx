import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./FriendDialogItem.module.css";

type PropsType = {
    name: string
    id: number
}

export const FriendDialogItem = (props: PropsType) => {
    const path = `/dialogs/${props.id}`;
    return (
        <NavLink
            to={path}
            className={classes.dialogLink}>
            <span>{props.name}</span>
        </NavLink>
    )
}