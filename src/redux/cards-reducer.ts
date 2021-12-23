import { cardsApi, getCardsPayloadType } from '../api/api';
import { AppThunk } from './store';


const initialState: cardsUserType = {
	cards: [],
	cardsTotalCount: 0,
	maxGrade: 0,
	minGrade: 0,
	page: 0,
	pageCount: 0,
	packUserId: '',
	rangeCards: [0, 50],
};

export type cardsUserType = {
	cards: Array<cardsType>
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
	rangeCards: number | number[]
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

export  type ActionCardsType = ReturnType<typeof AddCardsAC> | ReturnType<typeof SetRangeCardsAC>


export const cardsReducer = (state = initialState, action: ActionCardsType): cardsUserType => {
	switch (action.type) {
		case 'ADD_CARDS':
			return { ...state, cards: action.cards };
		case 'SET_CARDS_RANGE':
			return { ...state, rangeCards: action.range };

		default:
			return state;
	}
};

export const AddCardsAC = (cards: Array<cardsType>) => ( { type: 'ADD_CARDS', cards } as const );
export const SetRangeCardsAC = (range: number | number[]) => ( { type: 'SET_CARDS_RANGE', range } as const );

export const getCards = (payload: getCardsPayloadType): AppThunk => async dispatch => {
	try {
		const { data } = await cardsApi.getCards( payload );
		dispatch( AddCardsAC( data.cards ) );

	} catch (err) {
		console.log( err );
	}
};

export const CreateCardTC = (payload: getCardsPayloadType): AppThunk => async dispatch => {
	try {
		const { data } = await cardsApi.createCard( payload );
		dispatch( AddCardsAC( data.cards ) );
	} catch (err) {
		console.log( err );
	}
};

export const DeleteCardTC = (cardID: string, cardsPack_id: string): AppThunk => async dispatch => {
	try {
		await cardsApi.deleteCard( cardID );
		dispatch( getCards( { cardsPack_id } ) );
	} catch (err) {
		console.log( err );
	}
};

export const UpdateCardTC = (payload: cardsType): AppThunk => async (dispatch, getState) => {
	const card = getState().cardsReducer.cards.find( item => item._id === payload._id );
	const updateCard = { ...card, ...payload };
	try {
		const { data } = await cardsApi.updatePack( updateCard );
		dispatch( AddCardsAC( data.cards ) );
	} catch (err) {
		console.log( err );
	}
};

