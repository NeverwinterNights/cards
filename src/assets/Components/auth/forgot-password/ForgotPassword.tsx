import React from 'react';
import s from './FogotPassword.module.scss';
import FormPropsTextFieldsEmail from '../../mui/text-field/TextFieldEmail';

function ForgotPassword() {
	// const vlas = "vlas";
	return (
		<div className={s.login}>
			<div className={s.wrap}>
				<form className={s.form}>
					<h2 className={s.title}>It-incubator</h2>
					<h3 className={s.subtitle}>Forgot your password?</h3>
					<div className={s.content}>
						<FormPropsTextFieldsEmail />
						<p className={s.textInfo}>
							Enter your email address and we will send you further instructions
						</p>
					</div>
					<button className={s.btn}>Send Instructions</button>
				</form>
				<div className={s.wrapLink}>
					<a className={s.linkMemor} href='#'>
						Did you remember your password?
					</a>
					<a className={s.trylog} href='#'>
						Try logging in
					</a>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
