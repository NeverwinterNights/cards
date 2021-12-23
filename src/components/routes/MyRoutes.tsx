import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLogin from '../auth/auth-login/AuthLogin';
import ForgotPassword from '../auth/forgot-password/ForgotPassword';
import CreatNewPass from '../auth/creat-new-pass/CreatNewPass';
import { Register } from '../auth/register/Register';
import Main from '../main/Main';
import Error404 from '../common/error/Error404';
import { Test } from '../common/test/Test';
import Profile from '../main/packs-list/Profile/Profile';
import PackList from '../main/packs-list/PacksList';
import { EditProfile } from '../main/packs-list/EditProfile/EditProfile';
import { CardsList } from '../main/packs-list/ListCard/ListCard';

export const MyRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />}>
				<Route path='/packs' element={<PackList />}>
					<Route path='/packs:currentUserId' element={<PackList />} />
				</Route>
				<Route path='/profile' element={<Profile />}>
					<Route path='/profile:currentUserId' element={<Profile />} />
				</Route>
				<Route path='/cards' element={<CardsList />}>
					<Route path='/cards:cardsPack_id' element={<CardsList />} />
				</Route>
			</Route>
			<Route path='edit-profile' element={<EditProfile />} />
			<Route path='change-password' element={<ForgotPassword />} />
			<Route path='login' element={<AuthLogin />} />
			<Route path='set-new-password/:id' element={<CreatNewPass />} />
			<Route path='registration' element={<Register />} />
			<Route path='test' element={<Test />} />
			<Route path='*' element={<Error404 />} />
		</Routes>
	);
};
