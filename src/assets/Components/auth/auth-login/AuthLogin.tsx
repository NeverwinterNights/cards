import React, { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import s from './AuthLogin.module.scss';
import eye from '../../../images/auth-img/eye.svg';
import SuperTextField from '../../mui/text-field/SuperTextField';
import { LoginStateType, makeLogin } from '../../../../redux/authReducer';
import { selectAuth, useAppSelector } from '../../../selectors/authSelectors';
import Checkboxes from "../../mui/checkbox/Checkbox";

const checkValid = (value: string) => {
	const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return reg.test( value );
};

function AuthLogin() {
	const authData = useAppSelector<LoginStateType>( selectAuth );
	const [email, setEmail] = useState( 'nya-admin@nya.nya' );
	const [password, setPassword] = useState( '1qazxcvBG' );
	const [emailError, setEmailError] = useState( '' );
	const [passwordError, setPasswordError] = useState( '' );
	const [isPasswordHidden, setPasswordHidden] = useState( true );
	const rememberMe = false;	// 																		Исправить !!!!!
	const dispatch = useDispatch();

	const setAllErrors = (value: string) => {
		setEmailError( value );
		setPasswordError( value );
	};

	const onButtonClickHandler: MouseEventHandler<HTMLButtonElement> = async () => {
		if (!checkValid( email )) {
			setEmailError( 'not valid email' );
			return;
		}
		const errorMessage = await dispatch( makeLogin( { email, password, rememberMe } ) );
		errorMessage
		&& setAllErrors( JSON.stringify( errorMessage ) );
	};
	const emailChangeHandler = (value: string) => {
		setEmail( value );

		emailError
		&& setAllErrors( '' );
	};
	const passwordChangeHandler = (value: string) => {
		setPassword( value );

		passwordError
		&& setAllErrors( '' );
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
										error={ emailError }/>
					</div>
					<div style={ { position: 'relative' } }>
						<img className={ s.img } src={ eye } alt=''
							 onClick={ () => setPasswordHidden( !isPasswordHidden ) }/>
						<SuperTextField value={ password } callback={ passwordChangeHandler } type={ 'Password' }
										isHide={ isPasswordHidden } error={ passwordError }/>
					</div>
                  <div className={s.checkboxAndFogot}>
                    <div className={s.checkbox}>
                      <Checkboxes />
                      <p className={s.checkboxText}>remember me</p>
                    </div>
                    <a className={s.linkNewPass} href="#">
                      Forgot Password
                    </a>
                  </div>
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
