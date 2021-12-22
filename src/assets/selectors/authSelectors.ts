import { RootState } from '../../redux/store';
import { LoginDataType, OptionalStringType } from '../../redux/authReducer';


export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectLoginData = (state: RootState): LoginDataType => state.auth.loginData;
export const selectAutorisedUserId = (state: RootState): OptionalStringType => state.auth.loginData._id;
export const selectAutorisedUserName = (state: RootState): OptionalStringType => state.auth.loginData.name;
export const selectEmail = (state: RootState): OptionalStringType => state.auth.loginData.email;
export const selectUserName = (state: RootState): OptionalStringType => state.auth.loginData.name;


export const selectEmailError = (state: RootState): OptionalStringType => state.auth.errors.emailError;
export const selectPasswordError = (state: RootState): OptionalStringType => state.auth.errors.passwordError;

// packs selectors

export const selectPageNumber = (state: RootState): number => state.packsReducer.page;
export const selectPageSize = (state: RootState): number => state.packsReducer.pageCount;
export const selectCardPacksTotalCount = (state: RootState): number => state.packsReducer.cardPacksTotalCount;

