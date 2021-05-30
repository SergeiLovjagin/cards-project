import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";
import {API} from "../m3-dal/api";

const initialState = {
    loading: false,
    success: false,
    error: ''
}

export const registrationReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SET-ERROR":
            return {...state, error: action.error}
        case "REGISTRATION/SET-LOADING":
            return {...state, loading: action.loading}
        case "REGISTRATION/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//ACTIONS
const setLoading = (loading: boolean) => ({type: "REGISTRATION/SET-LOADING", loading} as const)
const setSuccess = (success: boolean) => ({type: "REGISTRATION/SET-SUCCESS", success} as const)
export const setError = (error: string) => ({type: "REGISTRATION/SET-ERROR", error} as const)

//THUNKS
export const registrationThunk = (email: string, password: string, confPassword: string): ThunkType => async (dispatch) => {
    if (password !== confPassword) {
        dispatch(setError('Passwords don\'t match!'))
    } else {
        dispatch(setError(''))
        dispatch(setLoading(true))
        try {
            await API.registration(email, password)
            dispatch(setSuccess(true))
        } catch (e) {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

//TYPES
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type ActionType = SetSuccessType | SetLoadingType | SetErrorType
type SetErrorType = ReturnType<typeof setError>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetLoadingType = ReturnType<typeof setLoading>
type InitialStateType = typeof initialState