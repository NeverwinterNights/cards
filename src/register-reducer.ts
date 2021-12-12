import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


const initialState: InitialStateType = {
    status: 'succeeded'
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTER/SET-STATUS':
            return {...state, status: action.status}

        default:
            return {...state}
    }
}

export type RequestStatusType = 'loading' | 'succeeded'
export type InitialStateType = {
    status: RequestStatusType

}


export const SetStatusAC = (status: RequestStatusType) => ({
    type: 'REGISTER/SET-STATUS',
    status
} as const)



export type SetStatusActionType = ReturnType<typeof SetStatusAC>

type ActionsType =

    | SetStatusActionType


export const registerTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    // .then (()=> {
    //
    // })

}



