import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Register } from './assets/Components/register/Register';

import AuthLogin from './assets/Components/auth/auth-login/AuthLogin';




const App = () => (
	<div>
		{/*<Register/>*/ }
		{/*<AuthLogin/>*/ }
		<Register/>
		{/*<Routes>*/}
		{/*	<Route path="login" element={<AuthLogin/>}/>*/}
		{/*</Routes>*/}
	</div>
);

export default App;
