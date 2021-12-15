type AuthStateType = typeof initialState

const initialState = {

}

const authReducer = (state = initialState, action: any): AuthStateType => {
	switch (action.type) {
		default:
			return { ...state };
	}
};

export default authReducer;