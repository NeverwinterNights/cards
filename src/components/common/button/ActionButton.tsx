import React, { CSSProperties, FC, useState } from 'react';
import s from './ActionButton.module.scss';
import AddNewPack from '../modal-windows/add-new-pack/AddNewPack';
import DeletePack from '../modal-windows/delete-pack/DeletePack';


type ActionButtonPropsType = {
	title: string;
	callBack?: () => void;
	style?: CSSProperties;
	addName?: (value: string) => void;
	name?: string
};

export const ActionButton: FC<ActionButtonPropsType> = ({
															title,
															callBack,
															style,
															addName,
															name,
														}) => {
	const [modal, setModal] = useState<string>( '' );
	const setModalWindow = (value: string) => {
		switch (value) {
			case 'Edit':
				setModal( 'Edit' );
				break;
			case 'Delete':
				setModal( 'Delete' );
				break;
			default:
				setModal( '' );
		}
	};

	if (modal === 'Edit')
		return <AddNewPack addName={ addName } setModal={ () => setModal( '' ) } name={ name }/>;
	if (modal === 'Delete')
		return (
			<DeletePack deleteCallBack={ callBack } setModal={ () => setModal( '' ) }/>
		);
	return (
		<>
			<button
				className={ s.btn }
				style={ style }
				onClick={ () => setModalWindow( title ) }
			>
				{ title }
			</button>
		</>
	);
};
