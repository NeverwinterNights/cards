import React from 'react';
import s from './DeletePack.module.scss';
import cross from '../../../../assets/images/modal/cross.png';

function DeletePack() {
	return (
		<div className={s.wrapper}>
			<div className={s.wrap}>
				<div className={s.header}>
					<h2 className={s.title}>Delete Pack</h2>
					<img className={s.img} src={cross} alt='' />
				</div>
				<p className={s.text}>
					Do you really want to remove <strong>Pack Name - Name Pack?</strong>
					All cards will be excluded from this course.
				</p>
				<div className={s.wrapBtn}>
					<button className={s.btnCancel}>Cancel</button>
					<button className={s.btnDel}>Delete</button>
				</div>
			</div>
		</div>
	);
}

export default DeletePack;
