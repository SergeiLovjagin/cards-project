import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import { NavLink } from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {passRecoveryThunk} from "../../../n1-main/m2-bll/passRecoveryReducer";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import { CheckEmail } from "./CheckEmail";

export const PasswordRecovery = () => {

    // HOOKS
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    const {success, loading, error} = useSelector<RootReducerType, {success: boolean, loading: boolean, error: string}>( (state) => state.passRecovery)

    // HANDLERS
    const onEmailButtonHandler = () => {
        dispatch(passRecoveryThunk(email))
    }

    if (success) {
        return (
            <div>
                <CheckEmail email={email}/>
            </div>
        )
    }

    return (
        <div>
            { loading && <div>Loading...</div> }
            { error && error }
            <div>Forgot your password?</div>
            <SuperInputText onChangeText={ (email) => setEmail(email) }/>
            <div>Enter yor email address and we will send you further instructions</div>
            <SuperButton onClick={onEmailButtonHandler} >Send instructions</SuperButton>
            <div>Did you remember your password?</div>
            <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
        </div>
    )
}