import React from "react";
import s from "./Header.module.scss"
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.wrap}>
                    <a href="#" className={s.logo}> it-incubator</a>
                    <nav className={s.navMenu}>
                        <NavLink to={'/login'}>Login</NavLink>
                        <NavLink to={'/registration'}>Registration</NavLink>
                        <NavLink to={'/recovery'}>Password Recovery</NavLink>
                        <NavLink to={'/profile'}>Profile</NavLink>
                        <NavLink to={'/404'}>404</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}
