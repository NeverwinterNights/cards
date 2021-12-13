import axios, { AxiosResponse } from 'axios';
import { LoginDataType } from '../redux/authReducer';
import { RegistrationRequestType, RegistrationResponseType } from '../redux/register-reducer';


const axiosConfig = {
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true,
};

const axiosInstance = axios.create( axiosConfig );


export const api = {
	login(data: any) {
		return axiosInstance.post<LoginDataType>( 'auth/login', data );
	},
	registration(body: RegistrationRequestType) {
		return axiosInstance.post<RegistrationRequestType,AxiosResponse<RegistrationResponseType>>('auth/register', {email: body.email, password: body.password});
	}
};
