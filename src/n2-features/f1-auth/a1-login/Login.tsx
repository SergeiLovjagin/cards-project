import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../../n1-main/m2-bll/loginReducer";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";

export const Login = () => {
    //HOOKS
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const loginSuccess = useSelector<RootReducerType, boolean>(state => state.login.success);
    const loginLoading = useSelector<RootReducerType, boolean>(state => state.login.loading);

    //HANDLERS
    const setEmailHandler = (value: string) => {
        setEmail(value)
    }
    const setPasswordHandler = (value: string) => {
        setPassword(value)
    }
    const setRememberHandler = (value: boolean) => {
        setRemember(value)
    }
    const onLoginButtonHandler = async () => {
        dispatch(loginThunk(email, password, remember))
    }
    const onRecoveryButtonHandler = () => {
        history.push(PATH.RECOVERY)
    }
    const onRegistrationButtonHandler = () => {
        history.push(PATH.REGISTRATION)
    }

    if (loginSuccess) {
        return <Redirect to={PATH.PROFILE}/>
    }
    return (
        <div>
            {
                loginLoading && <div>LOADING......</div>
            }
            Login Page
            <SuperInputText onChangeText={setEmailHandler}/>
            Password
            <SuperInputText onChangeText={setPasswordHandler}/>
            Remember
            <SuperCheckbox onChangeChecked={setRememberHandler}/>
            <SuperButton onClick={onLoginButtonHandler}>Button</SuperButton>
            <SuperButton onClick={onRecoveryButtonHandler}>Forgot password</SuperButton>
            <SuperButton onClick={onRegistrationButtonHandler}>Sign Up</SuperButton>
        </div>
    )
}
