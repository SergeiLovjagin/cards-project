import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../../n1-main/m2-bll/loginReducer";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import s from "./Login.module.scss"
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";

export const Login = () => {
    //HOOKS
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        loading,
        success,
        error
    } = useSelector<RootReducerType, { loading: boolean, success: boolean, error: string }>(state => state.login);

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
        <div className={s.loginPage}>
            <div className={s.wrap}>
                {
                    loading && <div>LOADING......</div>
                }
                {
                    error.length > 0 && <div>{error}</div>
                }
                <Logo/>
                <h1 className={s.title}>Sign in</h1>
                <p className={s.emailText}>Email</p>
                <SuperInputText onChangeText={(email) => setEmail(email)}/>
                <p className={s.passwordText}>Password</p>
                <SuperInputText onChangeText={(password) => setPassword(password)}/>

                <div className={s.remember}>
                    <SuperCheckbox onChangeChecked={(remember) => setRemember(remember)}/>
                    <p className={s.rememberText}>Remember</p>

                </div>
                <SuperButton   disabled={loading} onClick={onLoginButtonHandler}>Button</SuperButton>

                <SuperButton disabled={loading} onClick={onRecoveryButtonHandler}>Forgot password</SuperButton>
                <SuperButton disabled={loading} onClick={onRegistrationButtonHandler}>Sign Up</SuperButton>
            </div>
        </div>
    )
}
