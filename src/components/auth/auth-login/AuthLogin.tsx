import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

import SuperTextField from '../../mui/text-field/SuperTextField';
import { makeLogin, OptionalStringType, setError } from '../../../redux/authReducer';
import { selectEmailError, selectIsAuth, selectPasswordError } from '../../../assets/selectors/authSelectors';
import s from './AuthLogin.module.scss';
import { useAppSelector } from '../../../redux/store';


const checkEmailValidity = (value: string) => {
	const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return reg.test( value );
};

function AuthLogin() {
	const isAuth = useAppSelector<boolean>( selectIsAuth );
	const [email, setEmail] = useState( 'nya-admin@nya.nya' );
	const [password, setPassword] = useState( '1qazxcvBG' );
	const [rememberMe, setRememberMe] = useState( false );
	const emailError = useAppSelector<OptionalStringType>( selectEmailError );
	const passwordError = useAppSelector<OptionalStringType>( selectPasswordError );
	const dispatch = useDispatch();
	console.log( 'login' );

	const setAllErrors = (errorMessage: OptionalStringType) => {
		dispatch( setError( { passwordError: errorMessage, emailError: errorMessage } ) );
	};

	const onSubmitHandler: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		if (!checkEmailValidity( email )) {
			dispatch( setError( { emailError: 'not valid email' } ) );
			return;
		}
		if (password.length < 8) {
			setAllErrors( 'Incorrect pair email/password' );
			return;
		}
		dispatch( makeLogin( { email, password, rememberMe } ) );
	};

	const emailChangeHandler = (value: string) => {
		setEmail( value );

		emailError
		&& setAllErrors( null );
	};

	const passwordChangeHandler = (value: string) => {
		setPassword( value );

		passwordError
		&& setAllErrors( null );
	};

	const onCheckboxClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setRememberMe( e.currentTarget.checked );
	};

	if (isAuth) {
		return <Navigate to='/'/>;
	}

	return (
		<div className={ s.login }>
			<div className={ s.wrap }>
				<form className={ s.form } onSubmit={ onSubmitHandler }>
					<h2 className={ s.title }>It-incubator</h2>
					<h3 className={ s.subtitle }>Sign In</h3>
					<div className={ s.email }>
						<SuperTextField value={ email }
										callback={ emailChangeHandler }
										type={ 'Email' }
										error={ emailError }
						/>
					</div>
					<div>

						<SuperTextField value={ password }
										callback={ passwordChangeHandler }
										type={ 'Password' }
							// isHide={ isPasswordHidden }
										error={ passwordError }
						/>
					</div>
					<div className={ s.checkboxAndFogot }>
						<div className={ s.checkbox }>
							<Checkbox checked={ rememberMe } onChange={ onCheckboxClickHandler }/>
							<p className={ s.checkboxText }>remember me</p>
						</div>
						<Link className={ s.linkNewPass } to='/change-password'>
							Forgot Password
						</Link>
					</div>
					{/*<CircularProgress />*/ }
					<button className={ s.btn } disabled={ !email || !password }>Login
					</button>
				</form>
				<div className={ s.wrapLink }>
					<span className={ s.linkNewAcc }>
						Don’t have an account?
					</span>
					<Link className={ s.linkReg } to='/registration'>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AuthLogin;
