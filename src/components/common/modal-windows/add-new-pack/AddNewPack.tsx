import React, { useState } from 'react';
import s from './AddNewPack.module.scss';

type AddNewPackType = {
	setModal: () => void;
	addName?: (value: string) => void;
};

function AddNewPack({ setModal, addName }: AddNewPackType) {
	const [text, setText] = useState('');
	const addNameHandler = () => {
		addName && addName(text);
		setText('');
		setModal();
	};
	return (
		<div className={s.modal} onClick={setModal}>
			<div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={s.wrap}>
					<div className={s.header}>
						<h2 className={s.title}>Add new pack</h2>
					</div>
					<p className={s.text}>Name pack</p>
					<input
						type='text'
						value={text}
						onChange={(e) => setText(e.currentTarget.value)}
						className={s.input}
					/>
					<div className={s.wrapBtn}>
						<button className={s.btnCancel} onClick={setModal}>
							Cancel
						</button>
						<button className={s.btnSave} onClick={addNameHandler}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddNewPack;
