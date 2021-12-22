import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { forgotReducer } from './forgot-reducer';
import { newPasswordReducer } from './new-password-reducer';
import auth from './authReducer';
import { registerReducer } from './register-reducer';
import { errorReducer } from './errorReducer';
import { packsReducer } from './packs-reducer';
import {cardsReducer} from "./cards-reducer";


const rootReducer = combineReducers( {
	auth,
	registerReducer,
	forgotReducer,
	newPasswordReducer,
	errorReducer,
	packsReducer,
	cardsReducer
} );

export type AppStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;

export const store = createStore( rootReducer, applyMiddleware( thunk ) );

//@ts-ignore
window.store = store;

// type AllActionsType = AuthReducerActionTypes
export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>