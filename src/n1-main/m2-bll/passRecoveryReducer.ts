type InitialStateType = typeof initialState
const initialState = {}

export const passRecoveryReducer = (state: InitialStateType = {}, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}