import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import s from './FogotPassword.module.scss';
import { useAppSelector } from '../../../../redux/store';
import { SendEmailTC } from './forgot-reducer';

function ForgotPassword() {
	const dispatch = useDispatch();
	const isEmail = useAppSelector<boolean>(state => state.forgotReducer.isSendEmail);
	console.log(isEmail);
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: values => {
			dispatch(SendEmailTC(values.email));
			formik.resetForm();
		},

	});
	if (isEmail) console.log('1', isEmail);
	console.log('2', isEmail);
	return (
		<div className={s.login}>
			<div className={s.wrap}>
				<form className={s.form} onSubmit={formik.handleSubmit}>
					<h2 className={s.title}>It-incubator</h2>
					<h3 className={s.subtitle}>Forgot your password?</h3>
					<div className={s.content}>
						<TextField
							fullWidth
							required
							label='Email'
							variant='standard'
							id='email'
							name='email'
							type='email'
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
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
