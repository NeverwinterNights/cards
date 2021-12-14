import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true,
});

export const changePasswordAPI = {
	sendMessagePassword(email: string) {
		return instance.post('auth/login', { email, from: 'test-front-admin <ai73a@yandex.by>', message: 2 });
	},
};