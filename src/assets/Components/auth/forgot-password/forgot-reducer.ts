import { Dispatch } from 'redux';
import { changePasswordAPI } from '../../../../API/change-password-API';

type ForgotInitialStateType = ReturnType<typeof SendEmailAC>

const initialState = {
	isSendEmail: false as boolean,
};

export const forgotReducer = (state = initialState, action: ForgotInitialStateType) => {
	switch (action.type) {
		case 'SEND_IS_EMAIL':
			return { ...state, isSendEmail: action.isEmail };
		default:
			return { ...state };
	}
};

export const SendEmailAC = (isEmail: boolean) => ({ type: 'SEND_IS_EMAIL', isEmail });

export const SendEmailTC = (email: string) => async (dispatch: Dispatch<ForgotInitialStateType>) => {
	dispatch(SendEmailAC(true));
	try {
		const getEmail = await changePasswordAPI.sendMessagePassword(email);
		console.log(getEmail);
		dispatch(SendEmailAC(false));
	} catch (e) {
		console.log(e);
	}
};
