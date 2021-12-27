import axios from 'axios';
import { cardsApi, createCardParamsType, getCardsPayloadType, getCardsResponseType } from '../api/api';
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
	sortCards: '0grade',
	cardQuestion: '',
};

export type cardsUserType = {
	cards: Array<cardsType>
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
	sortCards: string
	cardQuestion: string
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
			return { ...state, ...action.state };
		case 'SET_CARDS_SORT':
			return { ...state, sortCards: action.sortCards };
		case 'SET_NEW_RANGE': {
			return { ...state, minGrade: action.minGrade, maxGrade: action.maxGrade };
		}
		case 'SET_CARDS_QUESTION':
			return { ...state, cardQuestion: action.cardQuestion };
		default:
			return state;
	}
};

export  type ActionCardsType = AddCardsActionType
	| setCardsStateActionType
	| setCardsPageActionType
	| setCardsPageCountActionType
	| setCardsSortActionType
	| setRangeActionType
	| setCardsQuestionActionType


type AddCardsActionType = ReturnType<typeof AddCardsAC>
type setCardsStateActionType = ReturnType<typeof setCardsState>
type setCardsPageActionType = ReturnType<typeof setCardsPage>
type setCardsPageCountActionType = ReturnType<typeof setCardsPageCount>
export type setCardsSortActionType = ReturnType<typeof setCardsSort>
type setRangeActionType = ReturnType<typeof SetRangeCardsAC>
type setCardsQuestionActionType = ReturnType<typeof setCardsQuestion>

export const AddCardsAC = (cards: Array<cardsType>) => ( { type: 'ADD_CARDS', cards } as const );
export const setCardsPage = (page: number) => ( { type: 'SET_CARDS_PAGE', page } as const );
export const setCardsPageCount = (pageCount: number) => ( { type: 'SET_CARDS_PAGE_COUNT', pageCount } as const );
export const setCardsState = (state: getCardsResponseType) => ( { type: 'SET_CARDS_STATE', state } as const );
export const setCardsSort = (sortCards: string) => ( { type: 'SET_CARDS_SORT', sortCards } as const );
export const SetRangeCardsAC = (minGrade: number, maxGrade: number) => ( {
	type: 'SET_NEW_RANGE',
	minGrade,
	maxGrade,
} as const );
export const setCardsQuestion = (cardQuestion: string) => ( {
	type: 'SET_CARDS_QUESTION',
	cardQuestion,
} as const );

export const getCards = (payload: getCardsPayloadType): AppThunk => (dispatch, getState) => {
	const { page, pageCount, sortCards, cardQuestion } = getState().cardsReducer;
	cardsApi.getCards( { page, pageCount, sortCards, cardQuestion, ...payload } )
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

export const UpdateCardTC = (payload: cardsType): AppThunk => async (dispatch) => {
	try {
		await cardsApi.updateCard( payload );
		dispatch( getCards( { cardsPack_id: payload.cardsPack_id } ) );
	} catch (err) {
		console.log( err );
	}
};

