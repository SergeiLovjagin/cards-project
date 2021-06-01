import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import {profileReducer} from "./profileReducer";
import {registrationReducer} from "./registrationReducer";
import {passRecoveryReducer} from "./passRecoveryReducer";
import thunk from "redux-thunk";
import {newPasswordReducer} from "./newPasswordReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    passRecovery: passRecoveryReducer,
    newPassword: newPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.__store__ = store