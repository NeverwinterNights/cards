import axios from 'axios';

import { AppThunk, RootState } from './store';
import { cardsApi, getPacksPayloadType, getPacksResponseType } from '../api/api';
import { clearAuthData } from './authReducer';


export type packType = {
	_id: string
	user_id: string
	name: string
	path: string
	cardsCount: number
	grade: number
	shots: number
	rating: number
	type: string
	created: string
	updated: string
	__v: number
	private: boolean
	user_name: string
}

export type PacksReducerStateType = typeof initialState

const initialState = {
	cardPacks: [] as packType[],
	cardPacksTotalCount: 1 as number,
	maxCardsCount: Infinity as number,
	minCardsCount: 0 as number,
	page: 1 as number,
	pageCount: 4 as number,
	token: null as null | string,
	tokenDeathTime: null as null | number,
};

export const packsReducer = (state = initialState, action: ActionsType): PacksReducerStateType => {
	switch (action.type) {
		case 'PACKS/SET-PACKS': {
			return { ...state, ...action.payload };
		}
		case 'PACKS/SET_PAGE':
			return { ...state, page: action.page };
		case 'PACKS/SET_PAGE_COUNT':
			return { ...state, pageCount: action.pageCount };
		default:
			return state;
	}
};

export const setPacks = (payload: getPacksResponseType) => ( {
		type: 'PACKS/SET-PACKS',
		payload,
	} as const
);
export const setPage = (page: number) => ( {
	type: 'PACKS/SET_PAGE', page,
} as const );
export const setPageCount = (pageCount: number) => ( {
	type: 'PACKS/SET_PAGE_COUNT', pageCount,
} as const );

export const setCurrentUser = (value: string | null) => ( {
	type: 'PACKS/SET_IS_OWNER_PACK_SHOW', value,
} as const );


export type setPacksActionType = ReturnType<typeof setPacks>
export type setPageActionType = ReturnType<typeof setPage>
export type setPageCountActionType = ReturnType<typeof setPageCount>
export type setIsOwnerPacksShowActionType = ReturnType<typeof setCurrentUser>
type ActionsType = setPacksActionType | setPageActionType | setPageCountActionType | setIsOwnerPacksShowActionType

export const getPacks = (payload?: getPacksPayloadType): AppThunk => (dispatch, getState) => {
	const { page, pageCount, maxCardsCount, minCardsCount } = getState().packsReducer;
	cardsApi.getPacks( { min: minCardsCount, max: maxCardsCount, page, pageCount, ...payload } )
		.then( (res) => {
			dispatch( setPacks( res.data ) );
		} )
		.catch( (e) => {
			if (axios.isAxiosError( e ) && e.response && e.response.status === 401) {
				dispatch( clearAuthData() );
			}
		} );
};

export const deletePackTC = (idPack: string, user_id?: string): AppThunk => async (dispatch) => {
	try {
		await cardsApi.deletePack( idPack );
		dispatch( getPacks( { user_id } ) );
	} catch (e) {
		if (axios.isAxiosError( e ) && e.response) {
			console.log( e.response.data.error );
		}
	}
};
export const updatePackTC = (payload: packType, user_id?: string): AppThunk => async (dispatch, getState: () => RootState) => {
	try {
		const pack = getState().packsReducer.cardPacks.find( item => item._id === payload._id );
		if (!pack) {
			throw new Error( 'Pack not found in the state' );
		}
		const updatePack = { ...pack, ...payload };
		await cardsApi.updatePack( updatePack );
		dispatch( getPacks( { user_id } ) );
	} catch (e) {
		if (axios.isAxiosError( e ) && e.response) {
			console.log( e.response.data.error );
		}
	}
};


export const createPack = (name: string, user_id?: string): AppThunk => (dispatch) => {
	cardsApi.createPack( { name } )
		.then( () => {
			dispatch( getPacks( { user_id } ) );
		} );
};
