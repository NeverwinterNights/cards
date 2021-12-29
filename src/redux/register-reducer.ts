import { Dispatch } from 'redux';

import { RootState } from './store';
import { api } from '../api/api';
import { setErrorAC } from './errorReducer';


const initialState: InitialStateType = {
	status: 'loading',
	isLoading: true,
	isRegistered: false,

};

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'REGISTER/SET-STATUS': {
			return { ...state, status: action.status };
		}

		case 'REGISTER/SET-REGISTERED-STATUS': {
			return { ...state, isRegistered: action.isRegistered };
		}
		case 'REGISTER/SET-LOADING-STATUS': {
			return { ...state, isLoading: action.isLoading };

		}
		default:
			return state;
	}
};

export type RequestStatusType = 'loading' | 'succeeded'
export type InitialStateType = {
	status: RequestStatusType
	isRegistered: boolean
	isLoading: boolean
}


export const SetStatusAC = (status: RequestStatusType) => ({
	type: 'REGISTER/SET-STATUS',
	status,
} as const);

export const SetRegisteredStatusAC = (isRegistered: boolean) => ({
	type: 'REGISTER/SET-REGISTERED-STATUS',
	isRegistered,
} as const);

export const SetLoadingStatusAC = (isLoading: boolean) => ({
	type: 'REGISTER/SET-LOADING-STATUS',
	isLoading,
} as const);

export type SetRegisteredStatusActionType = ReturnType<typeof SetRegisteredStatusAC>
export type SetStatusActionType = ReturnType<typeof SetStatusAC>
export type SetLoadingStatusActionType = ReturnType<typeof SetLoadingStatusAC>


type ActionsType =
	| SetStatusActionType
	| SetRegisteredStatusActionType
	| SetLoadingStatusActionType

export type RegistrationRequestType = {
	email: string
	password: string

}


export type RegistrationResponseType = {
	addedUser: {}
	error?: string
}

export const registerTC = (email: string, password: string) => (dispatch: Dispatch, getState: () => RootState) => {
	// dispatch(SetLoadingStatusAC(true));

	api.registration({ email, password })
		.then((res) => {
			dispatch(SetRegisteredStatusAC(true));
			console.log(res.data);


		})
		.catch((error) => {
			dispatch(setErrorAC('Incorrect pair email/password'));

		})
		.finally(() => {
			// dispatch(SetLoadingStatusAC(false));
		});

};

