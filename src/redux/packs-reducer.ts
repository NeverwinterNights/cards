import axios from 'axios';

import { AppThunk, RootState } from './store';
import { cardsApi, getPacksPayloadType, getPacksResponseType } from '../api/api';
import { clearAuthData } from './authReducer';
import { setLoadingStatusAC } from './appReducer';


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
	currentPack: null as null | packType,
	minRangeSearchSlider: 0 as number,
	maxRangeSearchSlider: 0 as number,
	sortPacks: '0name' as string,
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
		case 'PACKS/SET_CURRENT_PACK':
			return { ...state, currentPack: action.pack };
		case 'SET_NEW_SEARCH_RANGE': {
			return {
				...state,
				minRangeSearchSlider: action.minRangeSearchSlider,
				maxRangeSearchSlider: action.maxRangeSearchSlider,
			};
		}
		case 'SET_PACKS_SORT': {
			return { ...state, sortPacks: action.sortPacks };
		}
		default:
			return state;
	}
};

export const setPacks = (payload: getPacksResponseType) => ({
		type: 'PACKS/SET-PACKS',
		payload,
	} as const
);
export const setPacksPage = (page: number) => ({
	type: 'PACKS/SET_PAGE', page,
} as const);
export const setPacksPageCount = (pageCount: number) => ({
	type: 'PACKS/SET_PAGE_COUNT', pageCount,
} as const);

export const setCurrentPack = (pack: packType) => ({
	type: 'PACKS/SET_CURRENT_PACK', pack,
} as const);
export const SetRangeCardsAC = (minRangeSearchSlider: number, maxRangeSearchSlider: number) => ({
	type: 'SET_NEW_SEARCH_RANGE',
	minRangeSearchSlider,
	maxRangeSearchSlider,
} as const);

export const setPacksSort = (sortPacks: string) => ({
	type: 'SET_PACKS_SORT',
	sortPacks,
} as const);

type setRangeActionType = ReturnType<typeof SetRangeCardsAC>
export type setPacksActionType = ReturnType<typeof setPacks>
export type setPageActionType = ReturnType<typeof setPacksPage>
export type setPageCountActionType = ReturnType<typeof setPacksPageCount>
export type setCurrentPackActionType = ReturnType<typeof setCurrentPack>
export type setPacksSortActionType = ReturnType<typeof setPacksSort>

type ActionsType =
	setPacksActionType
	| setPageActionType
	| setPageCountActionType
	| setCurrentPackActionType
	| setRangeActionType
	| setPacksSortActionType


export const getPacks = (payload?: getPacksPayloadType): AppThunk => (dispatch, getState) => {
	const {
		page,
		pageCount,
		maxCardsCount,
		sortPacks,
		minCardsCount,
	} = getState().packsReducer;

	dispatch(setLoadingStatusAC('loading'))
	cardsApi.getPacks({
		min: minCardsCount,
		max: maxCardsCount,
		page,
		pageCount,
		sortPacks,
		...payload,
	})
		.then((res) => {
			dispatch(setPacks(res.data));
			dispatch(setLoadingStatusAC('idle'))
			// dispatch(SetRangeCardsAC(0, res.data.maxCardsCount));
		})
		.catch((e) => {
			if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
				dispatch(clearAuthData());
			}
		});
};

export const deletePackTC = (idPack: string, user_id?: string): AppThunk => async (dispatch) => {
	try {
		await cardsApi.deletePack(idPack);
		dispatch(getPacks({ user_id }));
	} catch (e) {
		if (axios.isAxiosError(e) && e.response) {
			console.log(e.response.data.error);
		}
	}
};
export const updatePackTC = (payload: packType): AppThunk => async (dispatch, getState: () => RootState) => {
	try {
		const pack = getState().packsReducer.cardPacks.find(item => item._id === payload._id);
		if (!pack) {
			throw new Error('Pack not found in the state');
		}
		const updatePack = { ...pack, ...payload };
		await cardsApi.updatePack(updatePack);
		dispatch(getPacks({user_id: payload.user_id}));

	} catch (e) {
		if (axios.isAxiosError(e) && e.response) {
			console.log(e.response.data.error);
		}
	}
};


export const createPack = (name: string, user_id?: string): AppThunk => (dispatch) => {
	cardsApi.createPack({ name })
		.then(() => {
			dispatch(getPacks({ user_id }));
		});
};
