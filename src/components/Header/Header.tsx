import React, {FC} from 'react';
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    email: string | null
    id: number | null
    isAuth: boolean
    login: string | null
}

const Header: FC<HeaderPropsType> = (props) => {
    return (
        <header className={classes.header}>
            <img className={classes.headerLogo}
                 src="https://i.pinimg.com/originals/cc/7a/d3/cc7ad3d3ba4e80853304bee2dc3015da.png" alt="space"/>
            <div className={classes.loginBlock}>
                {props.isAuth ? <span>{props.login}</span> : <NavLink className={classes.login} to={'/login'}>login</NavLink>}
            </div>
        </header>
    )
}

export default Header;