import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import { MyRoutes } from './components/routes/MyRoutes';
import { checkAuth } from './redux/authReducer';


const App = () => {
	const dispatch = useDispatch();
	console.log( 'app' );
	useEffect( () => {
		dispatch( checkAuth() );
	}, [] );
	return (
		<div>
			<MyRoutes/>
		</div>
	);
};

export default App;
