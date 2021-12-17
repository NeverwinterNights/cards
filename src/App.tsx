import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import { MyRoutes } from './assets/Components/common/MyRoutes';
import { selectIsAuth, useAppSelector } from './assets/selectors/authSelectors';
import { checkAuth } from './redux/authReducer';


const App = () => {
	const isAuth = useAppSelector<boolean>( selectIsAuth );
	const dispatch = useDispatch();
	console.log('app');

	useEffect( () => {
		!isAuth
		&& dispatch( checkAuth() );
	}, [] );
	return (
		<div>
			<MyRoutes/>
		</div>
	);
};

export default App;
