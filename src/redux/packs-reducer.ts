import { Dispatch } from 'redux';
import { RootState } from './store';
import { cardsApi } from '../api/api';


export type packsType = {
	cardPacks: cardsUserPack[],
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number
	page: number
	pageCount: number
	// token?: string
	// tokenDeathTime?: number
}


export type cardsUserPack = {
	_id: string
	user_id: string
	name: string
	path?: string
	cardsCount: number
	grade?: number
	shots?: number
	rating?: number
	type?: string
	created: string
	updated: string
	__v?: number
	private: boolean
	user_name: string

}


export type InitialStateType = {
	cardPacks: cardsUserPack[]
}


const initialState: InitialStateType = {
	cardPacks: [],
};

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'PACKS/GET-PACKS': {
			return { ...state, cardPacks: action.packs };
		}
		case 'PACKS/POST-PACK': {
			return { ...state, cardPacks: [action.pack, ...state.cardPacks] };
		}

		default:
			return state;
	}
};


export const GetPackAC = (packs: Array<cardsUserPack>) => ({
		type: 'PACKS/GET-PACKS',
		packs,
	} as const
);

export const PostPackAC = (pack: cardsUserPack) => ({
		type: 'PACKS/POST-PACK',
		pack,
	} as const
);


export type PostPacksActionType = ReturnType<typeof PostPackAC>
export type GetPacksActionType = ReturnType<typeof GetPackAC>


type ActionsType = GetPacksActionType | PostPacksActionType


export const getPack = () => (dispatch: Dispatch, getState: () => RootState) => {
	cardsApi.getPacks()
		.then((res) => {
			dispatch(GetPackAC(res.data.cardPacks));
		})
		.catch((error) => {
			console.log(error);
		});


};


export const postPack = (name: string) => (dispatch: Dispatch, getState: () => RootState) => {
	cardsApi.createPack({ name })
		.then((res) => {
			dispatch(PostPackAC(res.data));
		});
};



