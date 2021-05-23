import {createStore} from "redux";
import {combineReducers} from "redux";
import {loginReducer} from "./loginReducer";
import {profileReducer} from "./profileReducer";
import {registrationReducer} from "./registrationReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
})

const store = createStore(rootReducer)
