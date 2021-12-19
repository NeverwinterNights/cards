


const initialState: cardsUserType | {} = {};

export type cardsUserType = {
	cards: cardsType[]
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
}


export type cardsType = {
	answer: string
	question: string
	cardsPack_id: string
	grade: number
	rating?: number
	shots: number
	type?: string
	user_id: string
	created: string
	updated: string
	__v?: number
	_id: string
}


// cardPacks: packType[],
// 	page: number
// pageCount: number
// cardPacksTotalCount: number
// minCardsCount: number
// maxCardsCount: number
// token: string
// tokenDeathTime: number


export const cardsReducer = (state: cardsUserType | {} = initialState, action: ActionsType): cardsUserType | {} => {
	switch (action.type) {

		default:
			return state;
	}
};


// export const SetStatusAC = (status: RequestStatusType) => ({
// 	type: 'REGISTER/SET-STATUS',
// 	status,
// } as const);


// export type SetStatusActionType = ReturnType<typeof SetStatusAC>


// type ActionsType =


// export type RegistrationRequestType = {
// 	email: string
// 	password: string
//
// }


// export const registerTC = (email: string, password: string) => (dispatch: Dispatch, getState: () => RootState) => {
// 	// dispatch(SetLoadingStatusAC(true));
//
// 	api.registration({ email, password })
// 		.then((res) => {
// 			dispatch(SetRegisteredStatusAC(true));
// 			console.log(res.data);
//
//
// 		})
// 		.catch((error) => {
// 			dispatch(setErrorAC('Incorrect pair email/password'))
//
// 		})
// 		.finally(() => {
// 			// dispatch(SetLoadingStatusAC(false));
// 		});
//
// };

