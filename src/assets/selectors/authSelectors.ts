import { useSelector } from 'react-redux';

import { LoginStateType } from '../../redux/authReducer';
import { RootState } from '../../redux/store';


export function useAppSelector<T>(selector: (state: RootState) => T): T {
	return useSelector<RootState, T>( selector );
}

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
// export const selectLoginError = (state: RootState): string | null => state.auth.error;

export const selectAuth = (state: RootState): LoginStateType => state.auth;