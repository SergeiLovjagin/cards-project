import React from "react";
import {SuperInputText} from "../../../n1-main/m1-ui/common/SuperInput/SuperInputText";
import {SuperButton} from "../../../n1-main/m1-ui/common/SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox";

export const Login = () => {
    return (
        <div>
            Login Page
            <SuperInputText/>
            <SuperButton>Button</SuperButton>
            <SuperCheckbox/>
        </div>
    )
}