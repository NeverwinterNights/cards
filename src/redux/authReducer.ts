import axios from 'axios';

import { AppThunk } from './store';
import { api, updateProfilePayloadType } from '../api/api';


export type OptionalStringType = string | null

export type LoginDataType = {
	avatar: OptionalStringType
	email: OptionalStringType
	name: OptionalStringType
	publicCardPacksCount: number | null
	_id: OptionalStringType

	rememberMe: boolean
	isAdmin: boolean
	verified: boolean
	created: OptionalStringType
	updated: OptionalStringType
	__v: number | null
	token: OptionalStringType
	tokenDeathTime: number | null
}

type LoginErrorsStateType = {
	passwordError: OptionalStringType
	emailError: OptionalStringType
}

export type AuthStateType = typeof initState

const initState = {
	loginData: {
		avatar: null,
		email: null,
		name: null,
		publicCardPacksCount: null,
		_id: null,

		rememberMe: false,
		__v: null,
		created: null,
		updated: null,
		verified: false,
		isAdmin: false,
		token: null,
		tokenDeathTime: null,
	} as LoginDataType,
	isAuth: false as boolean,
	errors: {
		passwordError: null,
		emailError: null,
	} as LoginErrorsStateType,
};


const authReducer = (state = initState, action: AuthReducerActionTypes): AuthStateType => {
	switch (action.type) {
		case 'SET_LOGIN_DATA':
			return {
				...state,
				loginData: {
					...state.loginData,
					...action.payload,
				},
				isAuth: true,
			};
		case 'SET_ERROR':
			return {
				...state,
				errors: {
					...state.errors,
					...action.payload,
				},
			};
		case 'SET_IS_AUTH': {
			return {
				...state,
				isAuth: action.isAuth,
			};
		}
		case 'CLEAR_AUTH_DATA':
			return action.initState;
		default:
			return state;
	}
};

export type AuthReducerActionTypes = SetLoginDataActionType
	| SetErrorActionType
	| SetIsAuthActionType
	| ClearAuthDataActionType

type SetLoginDataActionType = ReturnType<typeof setLoginData>
type SetErrorActionType = ReturnType<typeof setError>
type SetIsAuthActionType = ReturnType<typeof setIsAuth>
type ClearAuthDataActionType = ReturnType<typeof clearAuthData>

const setLoginData = (payload: LoginDataType) => ( {
	type: 'SET_LOGIN_DATA', payload,
} as const );

const setIsAuth = (isAuth: boolean) => ( {
	type: 'SET_IS_AUTH', isAuth,
} as const );

export const clearAuthData = () => ( {
	type: 'CLEAR_AUTH_DATA', initState,
} as const );

export const setError = (payload: Partial<LoginErrorsStateType>) => ( {
	type: 'SET_ERROR',
	payload,
} as const );


type LoginValuesType = {
	email: string
	password: string
	rememberMe: boolean
}

export const makeLogin = (loginData: LoginValuesType): AppThunk => async dispatch => {
	try {
		const { data } = await api.login( loginData );
		dispatch( setLoginData( data ) );
	} catch (error) {
		const errorMessage = 'Incorrect pair email/password';
		dispatch( setError( { passwordError: errorMessage, emailError: errorMessage } ) );
	}
};

export const checkAuth = (): AppThunk => async dispatch => {
	try {
		const { data } = await api.authMe();
		dispatch( setLoginData( data ) );
	} catch (e) {
		console.log( e );
	}
};

export const makeLogout = (): AppThunk => async dispatch => {
	try {
		const { data: { error, info } } = await api.logOut();
		dispatch( clearAuthData() );
		console.log( { error, info } );
	} catch (e) {
		if (axios.isAxiosError( e ) && e.response) {
			console.log( e.response.data.error );
		}
	}
};

export const updateProfile = (payload: updateProfilePayloadType): AppThunk => async dispatch => {
	try {
		const { data: { updatedUser } } = await api.updateProfile( payload );
		dispatch( setLoginData( updatedUser ) );
	} catch (e) {
		if (axios.isAxiosError( e ) && e.response) {
			console.log( e.response.data.error );
		}
	}
};


export default authReducer;