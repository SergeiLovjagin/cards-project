import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {Redirect, useHistory} from "react-router-dom";
import {registrationThunk, setError} from "../../../n1-main/m2-bll/registrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import {validation} from "../../../n1-main/m1-ui/common/utills/validation";

export const Registration = () => {
    //HOOKS
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const {loading, success, error} = useSelector<RootReducerType, { loading: boolean, success: boolean, error: string }>(state => state.registration);

    //HANDLERS
    const onCancelButtonHandler = () => {
        history.push(PATH.LOGIN)
    };
    const onRegisterButtonHandler = () => {
        const emailValidation = validation.email(email)
        const passwordValidation = validation.password(password)
        if (emailValidation.length > 0) {
            dispatch(setError(emailValidation))
        } else if (passwordValidation.length > 0) {
            dispatch(setError(passwordValidation))
        } else {
            dispatch(registrationThunk(email, password, confPassword))
        }
    };

    if (success) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div>
            {
                loading && <div>LOADING......</div>
            }
            {
                error.length > 0 && <div>{error}</div>
            }
            Email
            <SuperInputText onChangeText={(email: string) => setEmail(email)}/>
            Password
            <SuperInputText onChangeText={(password: string) => setPassword(password)}/>
            Confirm password
            <SuperInputText onChangeText={(password: string) => setConfPassword(password)}/>
            <SuperButton disabled={loading} onClick={onCancelButtonHandler}>Cancel</SuperButton>
            <SuperButton disabled={loading} onClick={onRegisterButtonHandler}>Registed</SuperButton>
        </div>
    )
}