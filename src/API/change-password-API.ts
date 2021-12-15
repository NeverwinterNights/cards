import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
});

export const changePasswordAPI = {
	sendMessagePassword(email: string) {
		return instance.post<SendMessageType>('auth/forgot', {
			email,
			from: 'test-front-admin <ai73a@yandex.by>',
			message: `<div><h1><a href='http://localhost:3000/set-new-password/$token$'>change password</h1></div>`,
		});
	},
	newPassword(password: string, token: string) {
		return instance.post(`auth/set-new-password`, {
			password,
			resetPasswordToken: token,
		});
	},
};

export enum Status {
	loading = 'loading',
	error = 'error',
	ready = 'ready'
}

type SendMessageType = {
	answer: boolean
	html: boolean
	info: string
	success: boolean
}