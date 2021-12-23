import { RootState } from '../../redux/store';
import { LoginDataType, OptionalStringType } from '../../redux/authReducer';
import { cardsType } from '../../redux/cards-reducer';
import { packType } from '../../redux/packs-reducer';

// auth selectors

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectLoginData = (state: RootState): LoginDataType => state.auth.loginData;
export const selectAutorisedUserId = (state: RootState): OptionalStringType => state.auth.loginData._id;
export const selectEmail = (state: RootState): OptionalStringType => state.auth.loginData.email;
export const selectUserName = (state: RootState): OptionalStringType => state.auth.loginData.name;


export const selectEmailError = (state: RootState): OptionalStringType => state.auth.errors.emailError;
export const selectPasswordError = (state: RootState): OptionalStringType => state.auth.errors.passwordError;

// packs selectors

export const selectPageNumber = (state: RootState): number => state.packsReducer.page;
export const selectPageSize = (state: RootState): number => state.packsReducer.pageCount;
export const selectCardPacksTotalCount = (state: RootState): number => state.packsReducer.cardPacksTotalCount;
export const selectCurrentPack = (state: RootState): null | packType => state.packsReducer.currentPack;

// cards selectors

export const selectCards = (state: RootState): cardsType[] => state.cardsReducer.cards;
