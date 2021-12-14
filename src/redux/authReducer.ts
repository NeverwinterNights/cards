import { AppThunk } from './store';
import { api } from '../api/api';

export type OptionalStringType = string | null

export type LoginDataType = {
	avatar: OptionalStringType
	email: OptionalStringType
	name: OptionalStringType
	publicCardPacksCount: number | null
	_id: OptionalStringType
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
		default:
			return { ...state };
	}
};

export type AuthReducerActionTypes = SetLoginDataActionType | SetErrorActionType

type SetLoginDataActionType = ReturnType<typeof setLoginData>
type SetErrorActionType = ReturnType<typeof setError>

const setLoginData = (payload: LoginDataType) => ( {
	type: 'SET_LOGIN_DATA', payload,
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
		const { data: { email, _id, avatar, name, publicCardPacksCount } } = await api.login( loginData );
		dispatch( setLoginData( { email, _id, avatar, name, publicCardPacksCount } ) );
	} catch (error) {
		// let errorMessage = '';
		// if (axios.isAxiosError( error ) && error.response) {
		// 	errorMessage = error.response.data.error;
		// } else if (error instanceof Error) {
		// 	errorMessage = error.message;
		// }
		const errorMessage = 'Incorrect pair email/password';
		dispatch( setError( { passwordError: errorMessage, emailError: errorMessage } ) );
	}
};

// export const checkAuth = ():AppThunk => dispatch => {
// 	try {
//
// 	}
// }

export default authReducer;