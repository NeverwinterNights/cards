import React from 'react';

import s from './ButtonForTable.module.scss';
import { useAppSelector } from '../../../redux/store';
import { selectAutorisedUserId } from '../../../assets/selectors/authSelectors';

type ButtonForTablePropsType = {
	isOwner?: boolean;
	deleteCallback?: () => void;
	editCallback?: () => void;
	learnCallback?: () => void;
};

export function ButtonForTable({
	isOwner,
	deleteCallback,
	editCallback,
	learnCallback,
}: ButtonForTablePropsType) {
	return (
		<div className={s.wrapper}>
			{isOwner && (
				<div className={s.wrapBtn}>
					<button className={s.btnRed} onClick={deleteCallback}>
						Delete
					</button>
					<button className={s.btnEdit} onClick={editCallback}>
						Edit
					</button>
				</div>
			)}
			<button className={s.btnLern} onClick={learnCallback}>
				Learn
			</button>
		</div>
	);
}
