import { Route, Routes } from 'react-router-dom';
import React from 'react';
import AuthLogin from '../auth/auth-login/AuthLogin';
import ForgotPassword from '../auth/forgot-password/ForgotPassword';
import CreatNewPass from '../auth/creat-new-pass/CreatNewPass';
import { Register } from '../auth/register/Register';

export const MyRoutes = () => {
	return (
		<Routes>
			{/*<Route path="/" element={ <Test/> }/>*/}

			<Route path='change-password' element={<ForgotPassword />} />
			<Route path='login' element={<AuthLogin />} />
			{/*<Route path='/profile' element={<Profile />} />*/}
			<Route path='recover' element={<CreatNewPass />} />
			<Route path='registration' element={<Register />} />
			{/*<Route path='*' element={<Error404 />} />*/}
		</Routes>
	);
};
