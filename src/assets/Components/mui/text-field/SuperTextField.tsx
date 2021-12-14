import React, { ChangeEventHandler, FC, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import s from './TextFieldEmail.module.scss';
import eye from '../../../images/auth-img/eye.svg';


type LabelType = 'Password' | 'Email'

type FormPropsType = {
	callback?: (value: string) => void
	value?: string
	type?: LabelType
	error?: string | null
}

const SuperTextField: FC<FormPropsType> = ({
											   callback,
											   value,
											   type,
											   error,
										   }) => {
	const [isPasswordHidden, setPasswordHidden] = useState( type === 'Password' );
	const onChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
		callback
		&& callback( e.currentTarget.value );
	};

	const isPasswordHideToggle = () => setPasswordHidden( !isPasswordHidden );

	return (
		<Box
			component='div'
			sx={ {
				'& .MuiTextField-root': { m: 1, width: '346px', margin: '0' },
			} }
		>
			<div style={ { position: 'relative' } }>
				{
					type === 'Password'
					&& <img className={ s.img } src={ eye } alt='' onClick={ isPasswordHideToggle }/>
				}
				<TextField
					className={ s.textField }
					id='standard-password-input'
					label={ type ? type : '' }
					type={ type && isPasswordHidden ? type : '' }
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