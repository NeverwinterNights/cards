import { Dispatch } from 'redux';
import { changePasswordAPI } from '../../../../api/change-password-API';

export type StatusType = 'loading' | 'error' | 'ready'

type ActionType = ReturnType<typeof ChangeStatus>

export type NewPasswordType = typeof initialState
const initialState = {
	status: 'error' as StatusType,
};

export const newPasswordReducer = (state = initialState, action: ActionType) => {
	switch (action.type) {
		case 'CHANGE_STATUS':
			return { ...state, status: action.status };
		default:
			return { ...state };
	}
};

export const ChangeStatus = (status: string) => ({ type: 'CHANGE_STATUS', status }as const);

export const createNewPasswordTC = (password: string, token: string) => async (dispatch: Dispatch<ActionType>) => {
	dispatch(ChangeStatus('loading'));
	try {
		const { data } = await changePasswordAPI.newPassword(password, token);
		dispatch(ChangeStatus('ready'));
		console.log(data);
	} catch (e) {
		dispatch(ChangeStatus('error'));
		console.log(e);
	}
};