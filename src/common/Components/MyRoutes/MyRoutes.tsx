import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Test } from '../../../Components/Test';
import { ChangePassword } from '../../../Components/auth/ChangePassword/ChangePassword';
import { Login } from '../../../Components/auth/Login/Login';
import { Profile } from '../../../Components/auth/Profile/Profile';
import { RecoverPassword } from '../../../Components/auth/RecoverPassword/RecoverPassword';
import { Registration } from '../../../Components/auth/Registration/Registration';
import Error404 from '../Error/Error404';

export const MyRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Test />} />

			<Route path='/change-password' element={<ChangePassword />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/recover' element={<RecoverPassword />} />
			<Route path='/registration' element={<Registration />} />

			<Route path='*' element={<Error404 />} />
		</Routes>
	);
};
