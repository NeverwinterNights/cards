import React, { ChangeEventHandler, FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import s from './TextFieldEmail.module.scss';


type LabelType = 'Password' | 'Email'

type FormPropsType = {
	callback?: (value: string) => void
	value?: string
	type?: LabelType
	error?: string| null
	isHide?: boolean
}

const SuperTextField: FC<FormPropsType> = ({
											   callback,
											   value,
											   type,
											   error,
											   isHide,
										   }) => {
	const onChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
		callback
		&& callback( e.currentTarget.value );
	};
	return (
		<Box
			component='form'
			sx={ {
				'& .MuiTextField-root': { m: 1, width: '346px', margin: '0' },
			} }
			noValidate={ !error }
			autoComplete='off'
		>
			<div>
				<TextField
					className={ s.textField }
					id='standard-password-input'
					label={ type ? type : 'Email' }
					type={ type && !!isHide ? type : 'Email' }
					autoComplete='current-password'
					variant='standard'
					value={ value }
					onChange={ onChangeHandler }
					error={ !!error }
					helperText={ error }
				/>
			</div>
		</Box>
	);
};

export default SuperTextField;