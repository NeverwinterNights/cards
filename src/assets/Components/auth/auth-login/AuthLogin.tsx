import React from 'react';
import s from './AuthLogin.module.scss';
import eye from '../../../images/auth-img/eye.svg';
import FormPropsTextFieldsEmail from '../../mui/text-field/TextFieldEmail';
import FormPropsTextFieldsPass from '../../mui/text-field/TextFieldPass';

function AuthLogin() {
	// const vlas = "vlas";
	return (
		<div className={s.login}>
			<div className={s.wrap}>
				<form className={s.form}>
					<h2 className={s.title}>It-incubator</h2>
					<h3 className={s.subtitle}>Sign In</h3>
					<div className={s.email}>
						<FormPropsTextFieldsEmail />
					</div>
					<img className={s.img} src={eye} alt='' />
					<FormPropsTextFieldsPass />
					<a className={s.linkNewPass} href='#'>
						Forgot Password
					</a>
					<button className={s.btn}>Login</button>
				</form>
				<div className={s.wrapLink}>
					<a className={s.linkNewAcc} href='#'>
						Don’t have an account?
					</a>
					<a className={s.linkReg} href='#'>
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
}

export default AuthLogin;
