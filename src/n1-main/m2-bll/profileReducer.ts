import {ProfileType} from "../m3-dal/api"

const initialState = {
    user: {} as ProfileType
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE": {
            return {...state, user: action.data}
        }
        default:
            return state
    }
}

export const setProfile = (data: ProfileType) => ({type: 'PROFILE/SET-PROFILE', data} as const)

//TYPES
type InitialStateType = typeof initialState
export type SetProfileType = ReturnType<typeof setProfile>
type ActionType = SetProfileType