import axios from 'axios';
import { LoginDataType } from '../redux/authReducer';


const axiosConfig = {
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true,
};

const axiosInstance = axios.create( axiosConfig );


export const api = {
	login(data: any) {
		return axiosInstance.post<LoginDataType>( 'auth/login', data )
	},
	// authMe() {
	// 	return axiosInstance.post<LoginDataType>( '/auth/me', {} );
	// },
};
