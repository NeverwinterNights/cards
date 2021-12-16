import { Dispatch } from 'redux';
import { changePasswordAPI } from '../../../../API/change-password-API';
import { StatusType } from '../creat-new-pass/new-password-reducer';

type ForgotInitialStateType = ReturnType<typeof SendEmailAC> | ReturnType<typeof SetStatusAC>

export type TypeInitialState = {
	isSendEmail: boolean
	status: StatusType
}

const initialState: TypeInitialState = {
	isSendEmail: false,
	status: 'error',
};

export const forgotReducer = (state = initialState, action: ForgotInitialStateType): TypeInitialState => {
	switch (action.type) {
		case 'SET_STATUS':
			return { ...state, status: action.value };
		case 'SEND_IS_EMAIL':
			return { ...state, isSendEmail: action.isEmail };
		default:
			return { ...state };
	}
};

export const SendEmailAC = (isEmail: boolean) => ({ type: 'SEND_IS_EMAIL', isEmail } as const);
export const SetStatusAC = (value: StatusType) => ({ type: 'SET_STATUS', value } as const);

export const SendEmailTC = (email: string) => async (dispatch: Dispatch<ForgotInitialStateType>) => {
	dispatch(SetStatusAC('loading'));
	try {
		const { data } = await changePasswordAPI.sendMessagePassword(email);
		dispatch(SendEmailAC(true));
		dispatch(SetStatusAC('ready'));
		console.log(data);
	} catch (e) {
		dispatch(SetStatusAC('error'));
		console.log(e);
	}
};
