import axios, { AxiosResponse } from 'axios';
import { RegistrationRequestType, RegistrationResponseType } from '../redux/register-reducer';

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

export type AuthDomainDataType = {
	avatar: string
	email: string
	name: string
	publicCardPacksCount: number
	_id: string
}

const axiosConfig = {
	// baseURL: 'http://localhost:7542/2.0/',
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
};

const axiosInstance = axios.create( axiosConfig );


export const api = {
	login(data: any) {
		return axiosInstance.post<AuthDomainDataType>( 'auth/login', data );
	},
	registration(body: RegistrationRequestType) {
		return axiosInstance.post<RegistrationRequestType, AxiosResponse<RegistrationResponseType>>( 'auth/register', {
			email: body.email,
			password: body.password,
		} );
	},
	authMe() {
		return axiosInstance.post<AuthDomainDataType>( 'auth/me', {} );
	},
	logOut() {
		return axiosInstance.delete<{ info: string, error?: string }>( 'auth/me', {} );
	},
};
export const changePasswordAPI = {
	sendMessagePassword(email: string) {
		return axiosInstance.post<SendMessageType>('auth/forgot', {
			email,
			from: 'test-front-admin <t9371100211@gmail.com>',
			message: `<div><h1><a href='http://localhost:3000/#/set-new-password/$token$'>change password</h1></div>`,
		});
	},
	newPassword(password: string, token: string) {
		return axiosInstance.post(`auth/set-new-password`, {
			password,
			resetPasswordToken: token,
		});
	},
};
