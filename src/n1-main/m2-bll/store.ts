import {createStore} from "redux";
import {combineReducers} from "redux";
import {loginReducer} from "./loginReducer";
import {profileReducer} from "./profileReducer";
import {registrationReducer} from "./registrationReducer";
import {passRecoveryReducer} from "./passRecoveryReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    passRecoveryReducer : passRecoveryReducer
})

export const store = createStore(rootReducer)
