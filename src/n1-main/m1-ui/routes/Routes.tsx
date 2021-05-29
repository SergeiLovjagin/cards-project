import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {PasswordRecovery} from "../../../n2-features/f1-auth/a2-registration/PasswordRecovery";
import {Registration} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {Profile} from "../../../n2-features/f2-profile/Profile";
import {Page404} from "../../../n2-features/f3-error/Page404";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    RECOVERY: '/recovery',
    PROFILE: '/profile',
    ERROR: '/404'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.RECOVERY} render={() => <PasswordRecovery/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Redirect from={'/'} to={PATH.LOGIN}/>
                <Route render={() => <Page404/>}/>
            </Switch>
        </div>
    )
}