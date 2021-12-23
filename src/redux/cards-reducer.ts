import axios from 'axios';
import { cardsApi, createCardParamsType, getCardsPayloadType } from '../api/api';
import { AppThunk } from './store';
import { clearAuthData } from './authReducer';


const initialState: cardsUserType = {
	cards: [],
	cardsTotalCount: 0,
	maxGrade: 0,
	minGrade: 0,
	page: 1,
	pageCount: 4,
	packUserId: '',
};

export type cardsUserType = {
	cards: Array<cardsType>
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


export const cardsReducer = (state = initialState, action: ActionCardsType): cardsUserType => {
	switch (action.type) {
		case 'ADD_CARDS':
			return { ...state, cards: action.cards };
		case 'SET_CARDS_PAGE':
			return { ...state, page: action.page };
		case 'SET_CARDS_PAGE_COUNT':
			return { ...state, pageCount: action.pageCount };
		case 'SET_CARDS_STATE':
			return action.state;
		default:
			return state;
	}
};

export  type ActionCardsType = AddCardsActionType
	| setCardsStateActionType
	| setCardsPageActionType
	| setCardsPageCountActionType


type AddCardsActionType = ReturnType<typeof AddCardsAC>
type setCardsStateActionType = ReturnType<typeof setCardsState>
type setCardsPageActionType = ReturnType<typeof setCardsPage>
type setCardsPageCountActionType = ReturnType<typeof setCardsPageCount>

export const AddCardsAC = (cards: Array<cardsType>) => ( { type: 'ADD_CARDS', cards } as const );
export const setCardsPage = (page: number) => ( { type: 'SET_CARDS_PAGE', page } as const );
export const setCardsPageCount = (pageCount: number) => ( { type: 'SET_CARDS_PAGE_COUNT', pageCount } as const );
export const setCardsState = (state: cardsUserType) => ( { type: 'SET_CARDS_STATE', state } as const );

// export const getCards = (payload: getCardsPayloadType): AppThunk => async dispatch => {
// 	try {
// 		const { data } = await cardsApi.getCards( payload );
// 		dispatch( setCardsState( data ) );
//
// 	} catch (err) {
// 		console.log( err );
// 	}
// };

export const getCards = (payload: getCardsPayloadType): AppThunk => (dispatch, getState) => {
	const { page, pageCount } = getState().cardsReducer;
	cardsApi.getCards( { page, pageCount, ...payload } )
		.then( (res) => {
			dispatch( setCardsState( res.data ) );
		} )
		.catch( (e) => {
			if (axios.isAxiosError( e ) && e.response && e.response.status === 401) {
				dispatch( clearAuthData() );
			}
		} );
};

export const CreateCardTC = (payload: createCardParamsType): AppThunk => async dispatch => {
	try {
		await cardsApi.createCard( payload );
		dispatch( getCards( { cardsPack_id: payload.cardsPack_id } ) );
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

