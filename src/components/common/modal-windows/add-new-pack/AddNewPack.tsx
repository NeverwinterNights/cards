import React, { useEffect, useState } from 'react';
import s from './AddNewPack.module.scss';
import cross from '../../../../assets/images/modal/cross.png';


type AddNewPackType = {
	setModal: () => void;
	addName?: (value: string) => void;
	name?: string;
};

function AddNewPack({ setModal, addName, name }: AddNewPackType) {
	const [text, setText] = useState( '' );
	useEffect( () => {
		if (name) setText( name );
		const body = document.querySelector( 'body' );
		if (body) body.style.overflow = 'hidden';
		return () => {
			if (body) body.style.overflow = 'auto';
		};
	}, [] );
	const addNameHandler = () => {
		addName && addName( text );
		setText( '' );
		setModal();
	};
	return (
		<div className={ s.modal } onClick={ setModal }>
			<div className={ s.wrapper } onClick={ (e) => e.stopPropagation() }>
				<div className={ s.wrap }>
					<div className={ s.header }>
						<h2 className={ s.title }>Add new pack</h2>
					</div>
					<p className={ s.text }>Name pack</p>
					<input
						type='text'
						value={ text }
						onChange={ (e) => setText( e.currentTarget.value ) }
						className={ s.input }
					/>
					<div className={ s.wrapBtn }>
						<button className={ s.btnCancel } onClick={ setModal }>
							Cancel
						</button>
						<button className={ s.btnSave } onClick={ addNameHandler }>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddNewPack;
