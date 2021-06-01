import {API, ProfileType} from "../m3-dal/api"
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";

const initialState = {
    user: {} as ProfileType,
    loading: false,
    success: false,
    profileError: '',
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE":
            return {...state, user: action.data}
        case "PROFILE/SET-PROFILE-ERROR":
            return {...state, profileError: action.profileError}
        case "PROFILE/SET-LOADING":
            return {...state, loading: action.loading}
        case "PROFILE/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return state
    }
}

export const setProfile = (data: ProfileType) => ({type: 'PROFILE/SET-PROFILE', data} as const)
const setLoading = (loading: boolean) => ({type: "PROFILE/SET-LOADING", loading} as const)
const setSuccess = (success: boolean) => ({type: "PROFILE/SET-SUCCESS", success} as const)
export const setProfileError = (profileError: string) => ({type: "PROFILE/SET-PROFILE-ERROR", profileError} as const)

//THUNKS
export const authMe = (): ThunkType => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await API.authMe()
        dispatch(setProfile(response.data))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setProfileError(error))
    } finally {
        dispatch(setLoading(false))
        dispatch(setSuccess(true))
    }
}

//TYPES
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type InitialStateType = typeof initialState
export type SetProfileType = ReturnType<typeof setProfile>
export type SetProfileErrorType = ReturnType<typeof setProfileError>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetLoadingType = ReturnType<typeof setLoading>
type ActionType = SetProfileType | SetLoadingType | SetProfileErrorType | SetSuccessType