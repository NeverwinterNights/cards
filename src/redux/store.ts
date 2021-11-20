import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import auth from './authReducer'


const rootReducer = combineReducers( {
    auth,
} )

export const store = createStore( rootReducer, applyMiddleware( thunk ) )

//@ts-ignore
window.store = store