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

export const selectPacksPageNumber = (state: RootState): number => state.packsReducer.page;
export const selectPacksPageSize = (state: RootState): number => state.packsReducer.pageCount;
export const selectPacksTotalCount = (state: RootState): number => state.packsReducer.cardPacksTotalCount;
export const selectCurrentPack = (state: RootState): null | packType => state.packsReducer.currentPack;
export const selectCurrentPackId = (state: RootState): string | undefined => state.packsReducer.currentPack?._id;

// cards selectors

export const selectCards = (state: RootState): cardsType[] => state.cardsReducer.cards;
export const selectCardsPageNumber = (state: RootState): number => state.cardsReducer.page;
export const selectCardsPageSize = (state: RootState): number => state.cardsReducer.pageCount;
export const selectCardsTotalCount = (state: RootState): number => state.cardsReducer.cardsTotalCount;
export const selectSortCards = (state: RootState): string => state.cardsReducer.sortCards;
