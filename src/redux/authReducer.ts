import { AppThunk } from './store';
import { api } from '../api/api';


export type LoginDataType = {
	avatar: string | null
	email: string | null
	name: string | null
	publicCardPacksCount: string | null
	_id: string | null
}

export type LoginStateType = LoginDataType & { isAuth: boolean }

const initState: LoginStateType = {
	avatar: null,
	email: null,
	name: null,
	publicCardPacksCount: null,
	_id: null,
	isAuth: false,
};

type LoginValuesType = {
	email: string
	password: string
	rememberMe: boolean
}


const authReducer = (state = initState, action: AuthReducerActionTypes): LoginStateType => {
	switch (action.type) {
		case 'SET_LOGIN_DATA':
			return {
				...state,
				...action.payload,
				isAuth: true,
			};
		default:
			return { ...state };
	}
};

export type AuthReducerActionTypes = SetLoginDataActionType

type SetLoginDataActionType = ReturnType<typeof setLoginData>

const setLoginData = (payload: LoginDataType) => ( {
	type: 'SET_LOGIN_DATA', payload,
} as const );

export const makeLogin = (loginData: LoginValuesType): AppThunk<Promise<string>> => async (dispatch) => {
	try {
		const { data: { email, _id, avatar, name, publicCardPacksCount } } = await api.login( loginData );
		dispatch( setLoginData( { email, _id, avatar, name, publicCardPacksCount } ) );
		return '';
	} catch (error) {
		// let errorMessage = '';
		// if (axios.isAxiosError( error ) && error.response) {
		// 	errorMessage = error.response.data.error;
		// } else if (error instanceof Error) {
		// 	errorMessage = error.message;
		// }

		return 'Incorrect pair email/password';
	}
};

export default authReducer;