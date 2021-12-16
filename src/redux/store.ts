import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import auth from './authReducer';
import { registerReducer } from './register-reducer';



const rootReducer = combineReducers( {
	auth,
	registerReducer
} );

export const store = createStore( rootReducer, applyMiddleware( thunk ) );

//@ts-ignore
window.store = store;

// type AllActionsType = AuthReducerActionTypes
export type RootState = ReturnType<typeof rootReducer>

 export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>