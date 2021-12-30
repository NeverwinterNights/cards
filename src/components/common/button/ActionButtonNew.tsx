import React, { CSSProperties, FC } from 'react';
import s from './ActionButton.module.scss';

type ActionButtonPropsType = {
	title: string;
	callBack?: () => void;
	style?: CSSProperties;
};

export const ActionButton: FC<ActionButtonPropsType> = ({
	title,
	callBack,
	style,
}) => {
	return (
		<>
			<button className={s.btn} style={style} onClick={callBack}>
				{title}
			</button>
		</>
	);
};
