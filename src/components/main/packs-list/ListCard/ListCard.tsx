import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import s from './ListCard.module.scss';
import arrow from '../../../../assets/images/main/arrow.svg';
import { AddCardsAC, getCards } from '../../../../redux/cards-reducer';
import { useAppSelector } from '../../../../redux/store';
import { selectCurrentPack } from '../../../../assets/selectors/authSelectors';
import { DenseTableList } from '../../../mui/table-list-card/TableListCard';
import { PaginationCardsContainer } from '../../../mui/pagination/PaginationCardsContainer';


export function CardsList() {
	const { cardsPack_id } = useParams();
	const dispatch = useDispatch();
	const currentPack = useAppSelector( selectCurrentPack );
	useEffect( () => {
		cardsPack_id && dispatch( getCards( { cardsPack_id } ) );
		return () => {
			dispatch( AddCardsAC( [] ) );
		};
	}, [cardsPack_id] );
	return (
		<div>
			<div className={ s.wrapper }>
				<div className={ s.wrap }>
					<div className={ s.head }>
						<Link className={ s.link } to={ `/packs/${ currentPack?.user_id }` }>
							<img className={ s.img } src={ arrow } alt=''/>
						</Link>
						<h2 className={ s.title }>{ currentPack?.name }</h2>
					</div>
					<div className={ s.wrapForm }>
						<input className={ s.input } type='text' placeholder='Search...'/>
					</div>
					<DenseTableList/>
					<div className={ s.wrapBottom }>
						<PaginationCardsContainer/>
					</div>
				</div>
			</div>
		</div>
	);
}
