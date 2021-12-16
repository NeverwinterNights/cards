import React, { ChangeEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useAppSelector } from '../../../selectors/authSelectors';
import { registerTC, RequestStatusType, SetStatusAC } from '../../../../redux/register-reducer';
import styles from './Register.module.scss';


export const Register = React.memo(() => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirm, setConfirm] = useState<string>('');
	const [inputType, setInputType] = useState<boolean>(false);

	const dispatch = useDispatch();
	const status = useAppSelector<RequestStatusType>(state => state.registerReducer.status);
	const isRegistered = useAppSelector<boolean>(state => state.registerReducer.isRegistered);
	const isLoading = useAppSelector<boolean>(state => state.registerReducer.isLoading);


	const onEmailHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};
	const onPasswordHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};
	const onConfirmHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirm(e.currentTarget.value);
	};

	const onInputTypeHandle = () => {
		setInputType(!inputType);
	};


	const checkValid = (value: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	};


	useEffect(() => {

		if (email === '') {
			dispatch(SetStatusAC('loading'));
		}
	}, [email]);
	//
	useEffect(() => {

		// if (password === '' || confirm === '') {
		// 	dispatch(SetStatusAC('loading'));
		// }

		if (checkValid(email) && password.length >= 8 && password === confirm) {

			dispatch(SetStatusAC('succeeded'));
		}
		if (!checkValid(email)) {
			dispatch(SetStatusAC('loading'));
		}

		if (password && password !== confirm) {

			dispatch(SetStatusAC('loading'));
		}
	}, [password, confirm, email, checkValid]);


	const onSendPasswordHandle = () => {
		dispatch(registerTC(email, password));
		setEmail('');
		setPassword('');
		setConfirm('');
	};


	if (isRegistered) {
			return  <Navigate to="/login"/>

	}


	return (
		<div className={styles.body}>
			<div className={styles.main}>
				<div className={styles.title}>It-incubator</div>
				<div className={styles.subtitle}>Sign Up</div>
				<div className={styles.email}>
					<div>
						<Box
							component='form'
							sx={{
								'& .MuiTextField-root': { m: 1, width: '346px', margin: '0' },
							}}
							className={styles.box}
							noValidate
							autoComplete='off'
						>
							<TextField
								className={styles.textField}
								id='standard-password-input'
								label='Email'
								type='Email'
								autoComplete='current-password'
								variant='standard'
								value={email}
								onChange={onEmailHandle}
							/>
						</Box>
					</div>
				</div>
				<div className={styles.password}>
					<div>
						<Box
							component='form'
							sx={{
								'& .MuiTextField-root': { m: 1, width: '346px', margin: '0' },
							}}
							className={styles.box}
							noValidate
							autoComplete='off'
						>
							<TextField
								className={styles.textField}
								id='standard-password-input'
								label='Password'
								type={!inputType ? 'password' : 'text'}
								autoComplete='current-password'
								variant='standard'
								value={password}
								onChange={onPasswordHandle}
							/>
						</Box>
					</div>
					<button onClick={onInputTypeHandle} className={styles.icon} />
				</div>
				<div className={styles.confirm}>
					<div>
						<Box
							component='form'
							sx={{
								'& .MuiTextField-root': { m: 1, width: '346px', margin: '0' },
							}}
							className={styles.box}
							noValidate
							autoComplete='off'
						>
							<TextField
								className={styles.textField}
								id='standard-password-input'
								label='Confirm password'
								type={!inputType ? 'password' : 'text'}
								autoComplete='current-password'
								variant='standard'
								value={confirm}
								onChange={onConfirmHandle}
							/>
						</Box>
					</div>
					<button onClick={onInputTypeHandle} className={styles.icon} />
				</div>

				<div className={styles.footer}>
					<button className={styles.cancel}>Cancel</button>
					<button onClick={onSendPasswordHandle} disabled={status === 'loading' && isLoading}
									className={styles.register}>Register
					</button>
				</div>
			</div>
		</div>
	);
});

