import { RootState } from '../../redux/store';
import { AuthStateType, OptionalStringType } from '../../redux/authReducer';


export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
// export const selectLoginError = (state: RootState): DefaultFieldType => state.auth.error;

export const selectAuth = (state: RootState): AuthStateType => state.auth;

export const selectEmailError = (state: RootState): OptionalStringType => state.auth.errors.emailError;
export const selectPasswordError = (state: RootState): OptionalStringType => state.auth.errors.passwordError;

export const selectPageNumber = (state:RootState): number  => state.packsReducer.page
export const selectPageSize = (state:RootState): number => state.packsReducer.pageCount
export const selectCardPacksTotalCount = (state:RootState): number  => state.packsReducer.cardPacksTotalCount

