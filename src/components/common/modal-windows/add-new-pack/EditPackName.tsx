import React, { useEffect, useState } from 'react';
import s from './AddNewPack.module.scss';

type AddNewPackType = {
	name?: string;
	confirm: (newName: string) => void;
	cancel: () => void;
};

function EditPackName({ name, confirm, cancel }: AddNewPackType) {
	const [text, setText] = useState('');
	useEffect(() => {
		if (name) setText(name);
		const body = document.querySelector('body');
		if (body) body.style.overflow = 'hidden';
		return () => {
			if (body) body.style.overflow = 'auto';
		};
	}, []);
	const addNameHandler = () => {
		confirm && confirm(text);
	};
	return (
		<div className={s.modal} onClick={cancel}>
			<div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={s.wrap}>
					<div className={s.header}>
						<h2 className={s.title}>Edit pack name</h2>
					</div>
					<p className={s.text}>Pack name</p>
					<input
						type='text'
						value={text}
						onChange={(e) => setText(e.currentTarget.value)}
						className={s.input}
					/>
					<div className={s.wrapBtn}>
						<button className={s.btnCancel} onClick={cancel}>
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

export default EditPackName;
