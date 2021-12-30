export type isLoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


export type InitialStateType = {
	isLoading: isLoadingStatus
}


const initialState: InitialStateType = {
	isLoading: 'idle',
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {

		case 'APP/SET-LOADING-STATUS':
			return { ...state, isLoading: action.isLoading };

		default:
			return state;
	}
};


export const setLoadingStatusAC = (isLoading: isLoadingStatus) => ({
	type: 'APP/SET-LOADING-STATUS',
	isLoading,
} as const);


export type setLoadingStatusActionType = ReturnType<typeof setLoadingStatusAC>


type ActionsType = setLoadingStatusActionType

