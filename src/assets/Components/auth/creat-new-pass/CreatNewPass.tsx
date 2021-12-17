import React, { FormEvent, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import s from './CreatNewPass.module.scss';
import { createNewPasswordTC, NewPasswordType } from './new-password-reducer';
import { useAppSelector } from '../../../../redux/store';
import { Status } from '../../../../api/api';


export type sd = {
	id: string
}

function CreatNewPass() {
	const dispatch = useDispatch();
	const status = useAppSelector<NewPasswordType>( state => state.newPasswordReducer );
	const [text, setText] = useState( '' );
	const { id }  = useParams();
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		// @ts-ignore
		dispatch( createNewPasswordTC( text, id ) );
		setText( '' );
	};
	if (Status.ready === status.status) return <Navigate to='/login'/>;
	return (
		<div className={ s.login }>
			<div className={ s.wrap }>
				<form className={ s.form } onSubmit={ onSubmit }>
					<h2 className={ s.title }>It-incubator</h2>
					<h3 className={ s.subtitle }>Create new password</h3>
					<div className={ s.content }>
						<TextField
							value={ text }
							onChange={ (e) => setText( e.currentTarget.value ) }
							fullWidth
							required
							label='Password'
							variant='standard'
							id='password'
							name='password'
							type='password'
						/>
						{ text.length <= 7 && text.length >= 1 ?
							<p className={ s.error }>password must be more than 7 characters</p> : null }
						<p className={ s.textInfo }>
							Create new password and we will send you further instructions to
							email
						</p>
					</div>
					{ status.status === Status.loading ? <h3 className={ s.waiting }>Please waiting...</h3> :
						<button disabled={ text.length <= 7 } className={ s.btn }>Create new password
						</button> }
				</form>
			</div>
		</div>
	);
}

export default CreatNewPass;
