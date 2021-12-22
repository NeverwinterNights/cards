import React from 'react';
import { useDispatch } from 'react-redux';

import s from './ButtonForTable.module.scss';
import { useAppSelector } from '../../../redux/store';
import { selectAutorisedUserId } from '../../../assets/selectors/authSelectors';
import { deletePackTC } from '../../../redux/packs-reducer';


type ButtonForTablePropsType = {
	packId: string
	ownerId: string
	callBack: () => void
}

function ButtonForTable({
							packId,
							ownerId,
							callBack,
						}: ButtonForTablePropsType) {
	const autorisedUserId = useAppSelector( selectAutorisedUserId );
	const dispatch = useDispatch();
	const deleteHandler = () => {
		dispatch( deletePackTC( packId, ownerId ) );
	};

	return (
		<div className={ s.wrapper }>
			{ autorisedUserId === ownerId
			&&
						<div className={ s.wrapBtn }>
							<button className={ s.btnRed } onClick={ deleteHandler }>Delete</button>
							<button className={ s.btnEdit } onClick={ callBack }>Edit</button>
						</div> }
			<button className={ s.btnLern }>Learn</button>
		</div>
	);
}

export default ButtonForTable;
