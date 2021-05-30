import React from "react";
import s from "./Header.module.scss"
import { NavLink } from "react-router-dom";
import {PATH} from "../routes/Routes";

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.wrap}>
                    <a href="#" className={s.logo}> it-incubator</a>
                    <nav className={s.navMenu}>
                        <NavLink to={PATH.LOGIN}>Login</NavLink>
                        <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                        <NavLink to={PATH.RECOVERY}>Password Recovery</NavLink>
                        <NavLink to={PATH.PROFILE}>Profile</NavLink>
                        <NavLink to={PATH.ERROR}>404</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}
