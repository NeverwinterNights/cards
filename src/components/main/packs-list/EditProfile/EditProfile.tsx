import React, { FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SuperTextField from '../../../mui/text-field/SuperTextField';
import { useAppSelector } from '../../../../redux/store';
import { selectUserName } from '../../../../assets/selectors/authSelectors';
import { updateProfile } from '../../../../redux/authReducer';


export const EditProfile = () => {
	const nickName = useAppSelector( selectUserName );
	const [name, setName] = useState( nickName || '' );
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const clickHandler: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		await dispatch( updateProfile( { name } ) );
		navigate( '/profile' );
	};


	return (
		<form onSubmit={ clickHandler }>
			<SuperTextField type={ 'Nickname' } value={ name } callback={ setName }/>
			<button type='submit'>Save</button>
		</form>
	);
};