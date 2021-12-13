import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import auth from './authReducer';
import { registerReducer } from '../register-reducer';



const rootReducer = combineReducers( {
	auth,
	registerReducer:registerReducer
} );

export const store = createStore( rootReducer, applyMiddleware( thunk ) );

//@ts-ignore
window.store = store;

 type RootState = ReturnType<typeof rootReducer>

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>