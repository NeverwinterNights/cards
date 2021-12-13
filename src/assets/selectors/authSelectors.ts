import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { LoginStateType } from '../../redux/authReducer';


export function useAppSelector<T>(selector: (state: RootState) => T): T {
	return useSelector<RootState, T>( selector );
}

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
// export const selectLoginError = (state: RootState): string | null => state.auth.error;

export const selectAuth = (state: RootState): LoginStateType => state.auth;