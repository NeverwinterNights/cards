import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { AuthStateType, OptionalStringType } from '../../redux/authReducer';


export function useAppSelector<T>(selector: (state: RootState) => T): T {
	return useSelector<RootState, T>( selector );
}

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
// export const selectLoginError = (state: RootState): DefaultFieldType => state.auth.error;

export const selectAuth = (state: RootState): AuthStateType => state.auth;

export const selectEmailError = (state: RootState): OptionalStringType => state.auth.errors.emailError
export const selectPasswordError = (state: RootState): OptionalStringType => state.auth.errors.passwordError