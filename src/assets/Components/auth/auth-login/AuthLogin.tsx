import React, { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import s from './AuthLogin.module.scss';
import eye from '../../../images/auth-img/eye.svg';
import SuperTextField from '../../mui/text-field/SuperTextField';
import { LoginStateType, makeLogin } from '../../../../redux/authReducer';
import { selectAuth, useAppSelector } from '../../../selectors/authSelectors';


function AuthLogin() {
	const authData = useAppSelector<LoginStateType>( selectAuth );
	const [error, setError] = useState( '' );
	const [email, setEmail] = useState( 'nya-admin@nya.nya' );
	const [password, setPassword] = useState( '1qazxcvBG' );
	const [isHidePassword, setHidePassword] = useState( true );
	const rememberMe = false;	// 																		Исправить !!!!!
	const dispatch = useDispatch();

	const onButtonClickHandler: MouseEventHandler<HTMLButtonElement> = async () => {
		const errorMessage = await dispatch( makeLogin( { email, password, rememberMe } ) );
		errorMessage
		&& setError( JSON.stringify( errorMessage ) );
	};
	const emailChangeHandler = (value: string) => {
		setEmail( value );
		error
		&& setError( '' );
	};
	const passwordChangeHandler = (value: string) => {
		setPassword( value );
		error
		&& setError( '' );
	};

	if (authData.isAuth) {
		return <Navigate to='/'/>;
	}
	return (
		<div className={ s.login }>
			<div className={ s.wrap }>
				<div className={ s.form }>
					<h2 className={ s.title }>It-incubator</h2>
					<h3 className={ s.subtitle }>Sign In</h3>
					<div className={ s.email }>
						<SuperTextField value={ email } callback={ emailChangeHandler } type={ 'Email' }
										error={ error }/>
					</div>
					<div style={ { position: 'relative' } }>
						<img className={ s.img } src={ eye } alt=''
							 onClick={ () => setHidePassword( !isHidePassword ) }/>
						<SuperTextField value={ password } callback={ passwordChangeHandler } type={ 'Password' }
										isHide={ isHidePassword } error={ error }/>
					</div>
					<a className={ s.linkNewPass } href='#'>
						Forgot Password
					</a>
					<button className={ s.btn } onClick={ onButtonClickHandler }>Login</button>
				</div>
				<div className={ s.wrapLink }>
					<a className={ s.linkNewAcc } href='#'>
						Don’t have an account?
					</a>
					<a className={ s.linkReg } href='#'>
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
}

export default AuthLogin;
