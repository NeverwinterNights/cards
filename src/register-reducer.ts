import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import axios from 'axios';


const initialState: InitialStateType = {
    status: 'succeeded'
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTER/SET-STATUS':
            return {...state, status: action.status}

        default:
            return state
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


export const registerTC = (email: string, password: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    SetStatusAC('loading' )
    axios.post("http://localhost:7542/2.0/auth/register", {email, password})
    .then ((res)=> {
        console.log(res.data);
    })
      .catch(()=> {
          console.log("Some Error occur");
      })
      .finally(()=> {
          SetStatusAC('succeeded' )
      })

}



// const makeLogin = (loginData: LoginValuesType): AppThunk => async (dispatch) =>
