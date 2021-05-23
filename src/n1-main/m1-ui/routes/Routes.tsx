import React from "react";
import {Route, Switch} from "react-router-dom";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {PasswordRecovery} from "../../../n2-features/f1-auth/a2-registration/PasswordRecovery";
import {Registration} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {Profile} from "../../../n2-features/f2-profile/Profile";
import {Page404} from "../../../n2-features/f3-error/Page404";

//путь констант
export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/registration'} render={() => <Registration/>}/>
                <Route path={'/recovery'} render={() => <PasswordRecovery/>}/>
                <Route path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/404'} render={() => <Page404/>}/>
            </Switch>
        </div>
    )
}