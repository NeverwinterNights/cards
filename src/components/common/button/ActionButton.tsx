import React, { CSSProperties, FC, useState } from 'react';
import s from './ActionButton.module.scss';
import AddNewPack from '../modal-windows/add-new-pack/AddNewPack';
import DeletePack from '../modal-windows/delete-pack/DeletePack';
import {
	CardInfo,
	confirmPayloadType,
} from '../../main/packs-list/CardInfo/CardInfo';

type ActionButtonPropsType = {
	title: string;
	callBack?: () => void;
	style?: CSSProperties;
	addName?: (value: string) => void;
	name?: string;
	changeCard?: (payload: confirmPayloadType) => void;
};

export const ActionButton: FC<ActionButtonPropsType> = ({
	title,
	callBack,
	style,
	addName,
	name,
	changeCard,
}) => {
	const [modal, setModal] = useState<string>('');
	const setModalWindow = (value: string) => {
		switch (value) {
			case 'Edit':
				setModal(value);
				break;
			case 'Delete':
				setModal(value);
				break;
			case 'EditCard':
				setModal(value);
				break;
			default:
				setModal('');
		}
	};

	if (modal === 'Edit')
		return (
			<AddNewPack addName={addName} setModal={() => setModal('')} name={name} />
		);
	if (modal === 'Delete')
		return (
			<DeletePack deleteCallBack={callBack} setModal={() => setModal('')} />
		);
	if (modal === 'EditCard')
		return (
			<CardInfo
				EditCard={'EditCard'}
				callBack={changeCard}
				cancel={() => setModal('')}
			/>
		);

	return (
		<>
			<button
				className={s.btn}
				style={style}
				onClick={() => setModalWindow(title)}
			>
				{title}
			</button>
		</>
	);
};
