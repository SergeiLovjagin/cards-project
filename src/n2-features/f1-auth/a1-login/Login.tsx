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
    const {loading, success, error} = useSelector<RootReducerType, { loading: boolean, success: boolean, error: string }>(state => state.login);

    //HANDLERS
    const onLoginButtonHandler = async () => {
        dispatch(loginThunk(email, password, remember))
    }
    const onRecoveryButtonHandler = () => {
        history.push(PATH.RECOVERY)
    }
    const onRegistrationButtonHandler = () => {
        history.push(PATH.REGISTRATION)
    }

    if (success) {
        return <Redirect to={PATH.PROFILE}/>
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
            <SuperInputText onChangeText={(email) => setEmail(email)}/>
            Password
            <SuperInputText onChangeText={(password) => setPassword(password)}/>
            Remember
            <SuperCheckbox onChangeChecked={(remember) => setRemember(remember)}/>
            <SuperButton disabled={loading} onClick={onLoginButtonHandler}>Button</SuperButton>
            <SuperButton disabled={loading} onClick={onRecoveryButtonHandler}>Forgot password</SuperButton>
            <SuperButton disabled={loading} onClick={onRegistrationButtonHandler}>Sign Up</SuperButton>
        </div>
    )
}
