import {Dispatch} from "redux";
import {API} from "../m3-dal/api";


const initialState = {
    success: false,
    loading: false,
    error: ''
}

export const passRecoveryReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "RECOVERY/SET_LOADING":
            return {...state, loading: action.loading}
        case "RECOVERY/SET_ERROR":
            return {...state, error: action.error}
        case 'RECOVERY/SET_SUCCESS':
            return {...state, success: action.success}
        default:
            return state
    }
}


// ACTIONS
const setSuccess = (success: boolean) => ({
    type: 'RECOVERY/SET_SUCCESS',
    success
}) as const

const setError = (error: string) => ({
    type: 'RECOVERY/SET_ERROR',
    error
}) as const

const setLoading = (loading: boolean) => ({
    type: 'RECOVERY/SET_LOADING',
    loading
}) as const



// THUNKS
export const passRecoveryThunk = (email: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoading(true))
    API.forgot(email)
        .then((res) => {
            dispatch(setLoading(false))
            dispatch(setSuccess(true))
        })
        .catch( (err) => {
            let error = err.response.data.error
            dispatch(setError(error))
        })
        .finally( () => {
            dispatch(setLoading(false))
        } )
}


// TYPES
type InitialStateType = typeof initialState
type setSuccessType = ReturnType<typeof setSuccess>
type setErrorType = ReturnType<typeof setError>
type setLoadingType = ReturnType<typeof setLoading>
type ActionType = setSuccessType | setErrorType | setLoadingType
