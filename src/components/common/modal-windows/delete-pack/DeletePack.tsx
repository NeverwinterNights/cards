import React, { useEffect } from 'react';
import s from './DeletePack.module.scss';

type DeletePackType = {
	setModal: () => void;
	deleteCallBack?: () => void;
};

function DeletePack({ setModal, deleteCallBack }: DeletePackType) {
	const deletePack = () => deleteCallBack && deleteCallBack();

	useEffect(() => {
		const body = document.querySelector('body');
		if (body) body.style.overflow = 'hidden';
		return () => {
			if (body) body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className={s.modal} onClick={setModal}>
			<div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={s.wrap}>
					<div className={s.header}>
						<h2 className={s.title}>Delete Pack</h2>
					</div>
					<p className={s.text}>
						Do you really want to remove <strong>Pack Name - Name Pack?</strong>
						All cards will be excluded from this course.
					</p>
					<div className={s.wrapBtn}>
						<button className={s.btnCancel} onClick={setModal}>
							Cancel
						</button>
						<button className={s.btnDel} onClick={deletePack}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeletePack;
