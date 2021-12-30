import React, { useEffect } from 'react';
import s from './DeletePack.module.scss';

type DeleteCardType = {
	confirm: () => void;
	cancel: () => void;
	cardName?: string;
};

export function DeleteCard({ confirm, cancel, cardName }: DeleteCardType) {
	useEffect(() => {
		const body = document.querySelector('body');
		if (body) body.style.overflow = 'hidden';
		return () => {
			if (body) body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className={s.modal} onClick={cancel}>
			<div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={s.wrap}>
					<div className={s.header}>
						<h2 className={s.title}>Delete Card</h2>
					</div>
					<p className={s.text}>
						Do you really want to remove{' '}
						<strong>{cardName || 'this card'}?</strong>
						This action can't be canceled
					</p>
					<div className={s.wrapBtn}>
						<button className={s.btnCancel} onClick={cancel}>
							Cancel
						</button>
						<button className={s.btnDel} onClick={confirm}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
