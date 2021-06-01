import {ThunkAction} from "redux-thunk";
import {API} from "../m3-dal/api";
import {setProfile, setProfileError, SetProfileErrorType, SetProfileType} from "./profileReducer";
import {RootReducerType} from "./store";

const initialState = {
    loading: false,
    success: false,
    error: ''
}
export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-ERROR":
            return {...state, error: action.error}
        case "LOGIN/SET-LOADING":
            return {...state, loading: action.loading}
        case "LOGIN/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

//ACTIONS
const setError = (error: string) => ({type: "LOGIN/SET-ERROR", error} as const)
const setSuccess = (success: boolean) => ({type: "LOGIN/SET-SUCCESS", success} as const)
const setLoading = (loading: boolean) => ({type: "LOGIN/SET-LOADING", loading} as const)

//THUNKS
export const loginThunk = (email: string, pass: string, remember: boolean): ThunkType => async (dispatch) => {
    dispatch(setError(''))
    dispatch(setLoading(true))
    try {
        const response = await API.login(email, pass, remember)
        dispatch(setProfile(response.data))
        dispatch(setSuccess(true))
        dispatch(setProfileError(''))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setError(error))
    } finally {
        dispatch(setLoading(false))
    }
}

export const logoutThunk = (): ThunkType => async (dispatch) => {
    try {
        await API.logOut()
        dispatch(setSuccess(false))
    } catch (e) {
        console.log('Error while logging out')
    }
}

//TYPES
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type SetErrorType = ReturnType<typeof setError>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetLoadingType = ReturnType<typeof setLoading>
type ActionType = SetErrorType | SetSuccessType | SetLoadingType | SetProfileType | SetProfileErrorType