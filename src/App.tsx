import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import { MyRoutes } from './assets/Components/common/MyRoutes';
import { selectIsAuth } from './assets/selectors/authSelectors';
import { checkAuth } from './redux/authReducer';
import { useAppSelector } from './redux/store';
import { ErrorSnackbar } from './assets/Components/common/error/ErrorSnackbar';


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
