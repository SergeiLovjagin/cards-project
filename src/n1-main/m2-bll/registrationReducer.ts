type InitialStateType = typeof initialState
const initialState = {}

export const registrationReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}