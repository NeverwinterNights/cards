type authStateType = typeof initState

const initState = {}

const authReducer = (state = initState, action: any): authStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default authReducer