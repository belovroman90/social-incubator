import React from "react";
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={s.navMenu}>
            <ul className={s.menuItems}>
                <li>
                    <NavLink to={"/profile"}
                             className={l => l.isActive ? s.activeLink
                                 : s.menuItem}>Profile</NavLink></li>
                <li>
                    <NavLink to={"/dialogs"}
                             className={l => l.isActive ? s.activeLink
                                 : s.menuItem}>Messages</NavLink></li>
                <li>
                    <NavLink to={'/users'} className={l => l.isActive ? s.activeLink
                        : s.menuItem}>Users</NavLink></li>
                <li>
                    <NavLink to={"/news"}
                             className={l => l.isActive ? s.activeLink
                                 : s.menuItem}>News</NavLink></li>
                <li>
                    <NavLink to={"/music"}
                             className={l => l.isActive ? s.activeLink
                                 : s.menuItem}>Music</NavLink></li>
                <li>
                    <NavLink to={"/settings"}
                             className={l => l.isActive ? s.activeLink
                                 : s.menuItem}>Settings</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;