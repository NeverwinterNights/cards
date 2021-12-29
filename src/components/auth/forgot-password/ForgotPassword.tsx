import React, { FormEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import s from './FogotPassword.module.scss';
import { useAppSelector } from '../../../redux/store';
import { SendEmailTC } from '../../../redux/forgot-reducer';
import CheckEmail from '../chek-email/CheckEmail';
import { StatusType } from '../../../redux/new-password-reducer';
import { Status } from '../../../api/api';

function ForgotPassword() {
	const dispatch = useDispatch();
	const [valid, setValid] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const isEmail = useAppSelector<boolean>(
		(state) => state.forgotReducer.isSendEmail,
	);
	const isStatus = useAppSelector<StatusType>(
		(state) => state.forgotReducer.status,
	);
	const handlerEmail = (value: string) => setEmail(value);
	const checkEmailValidity = (e: FormEvent, value: string) => {
		e.preventDefault();
		const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		reg.test(value) ? dispatch(SendEmailTC(value)) : setValid(true);
	};
	if (isEmail) return <CheckEmail />;
	return (
		<div className={s.login}>
			<div className={s.wrap}>
				<form className={s.form} onSubmit={(e) => checkEmailValidity(e, email)}>
					<h2 className={s.title}>It-incubator</h2>
					<h3 className={s.subtitle}>Forgot your password?</h3>
					<div className={s.content}>
						<TextField
							fullWidth
							required
							label='Email'
							variant='standard'
							type='email'
							value={email}
							onChange={(e) => handlerEmail(e.currentTarget.value)}
						/>
						{valid && <p className={s.error}>incorrect email</p>}
						<p className={s.textInfo}>
							Enter your email address and we will send you further instructions
						</p>
					</div>
					{isStatus === Status.loading ? (
						<h3 className={s.waiting}>Please waiting...</h3>
					) : (
						<button className={s.btn}>Send Instructions</button>
					)}
				</form>
				<div className={s.wrapLink}>
					<span className={s.linkMemor}>Did you remember your password?</span>
					<Link className={s.trylog} to='/login'>
						Try logging in
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
