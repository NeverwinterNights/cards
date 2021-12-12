type AuthStateType = typeof initState


const initState = {};

const authReducer = (state = initState, action: any): AuthStateType => {
	switch (action.type) {
		default:
			return { ...state };
	}
};

export default authReducer;