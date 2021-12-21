import React from 'react';
import { Link, useParams } from 'react-router-dom';

import s from '../PackList.module.scss';
import { useAppSelector } from '../../../../redux/store';


export const ToggleOwnerPacksShowButtons = () => {
	const userId = useAppSelector( state => state.auth.loginData._id );
	const { currentUserId } = useParams();


	return (
		<div className={ s.wrapBtn }>
			<Link to={ `/${ userId }` }>
				<button className={ `${ s.buttonLeft } ${ currentUserId === userId ? s.activeBtn : '' }` }>
					My
				</button>
			</Link>
			<Link to={ '/' }>
				<button className={ `${ s.buttonRight } ${ !currentUserId ? s.activeBtn : '' }` }>
					All
				</button>
			</Link>
		</div>
	);
};