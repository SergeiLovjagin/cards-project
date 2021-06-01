import {Dispatch} from "redux";
import {API} from "../m3-dal/api";
import {ThunkAction} from "redux-thunk";
import {RootReducerType} from "./store";

const initialState = {
    success: false,
    error: '',
    loading: false
}

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "NEW_PASSWORD/SET_LOADING":
            return {...state, loading: action.loading}
        case "NEW_PASSWORD/SET_ERROR":
            return {...state, error: action.error}
        case 'NEW_PASSWORD/SET_SUCCESS': {
            return {...state, success: action.success}
        }
        default:
            return state
    }
}

// ACTIONS
export const setSuccess = (success: boolean) => ({type: 'NEW_PASSWORD/SET_SUCCESS', success}) as const
export const setError = (error: string) => ({type: 'NEW_PASSWORD/SET_ERROR', error}) as const
export const setLoading = (loading: boolean) => ({type: 'NEW_PASSWORD/SET_LOADING', loading}) as const

// THUNKS
export const newPasswordThunk = (password: string, resetPasswordToken: string): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setError(''))
    dispatch(setLoading(true))
    try {
        await API.newPassword(password, resetPasswordToken)
        dispatch(setSuccess(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setError(error))
    } finally {
        dispatch(setLoading(false))
    }
}

// TYPES
type InitialStateType = typeof initialState
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionType>
type setSuccessType = ReturnType<typeof setSuccess>
type setErrorType = ReturnType<typeof setError>
type setLoadingType = ReturnType<typeof setLoading>
type ActionType = setSuccessType | setErrorType | setLoadingType
