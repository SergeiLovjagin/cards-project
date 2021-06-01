import React, {useState} from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../n1-main/m2-bll/store";
import { newPasswordThunk } from "../../../n1-main/m2-bll/newPasswordReducer";
import {Redirect, useParams} from 'react-router-dom'

export const NewPasswordForm = () => {

    //HOOKS
    const [password, setPassword] = useState('')
    const {success, loading, error} = useSelector<RootReducerType, {success: boolean, loading: boolean, error: string}>( (state) => state.newPassword)
    const dispatch = useDispatch()
    const {resetPasswordToken} = useParams<{resetPasswordToken: string}>();

    //HANDLERS
    const onNewPasswordButtonHandler = () => {
        dispatch(newPasswordThunk(password, resetPasswordToken))
    }

    if (success) {
        return (
            <div>
                <Redirect to={'/login'}/>
            </div>
        )
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && error}
            <h2>IT-INCUBATOR</h2>
            <h3>Create new password</h3>
            <SuperInputText onChangeText={(password) => setPassword(password)} />
            <div>Create new password and we will send you further instructions to mail</div>
            <div>
                <SuperButton onClick={onNewPasswordButtonHandler}>Create new password</SuperButton>
            </div>

        </div>
    )
}