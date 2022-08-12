import React from 'react';
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <img className={classes.headerLogo}
                 src="https://i.pinimg.com/originals/cc/7a/d3/cc7ad3d3ba4e80853304bee2dc3015da.png" alt="space"/>
        </header>
    )
}

export default Header;