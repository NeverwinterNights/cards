import axios, { AxiosResponse } from 'axios';
import { RegistrationRequestType, RegistrationResponseType } from '../redux/register-reducer';


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
