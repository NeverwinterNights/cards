import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import s from './ListCard.module.scss';
import arrow from '../../../../assets/images/main/arrow.svg';
import { AddCardsAC, CreateCardTC, getCards } from '../../../../redux/cards-reducer';
import { useAppSelector } from '../../../../redux/store';
import {
	selectCardsPageNumber,
	selectCardsPageSize,
	selectCurrentPack,
} from '../../../../assets/selectors/authSelectors';
import { DenseTableList } from '../../../mui/table-list-card/TableListCard';
import { PaginationCardsContainer } from '../../../mui/pagination/PaginationCardsContainer';
import { CardInfo, confirmPayloadType } from '../CardInfo/CardInfo';


export function CardsList() {
	const { cardsPack_id } = useParams();
	const dispatch = useDispatch();
	const currentPack = useAppSelector( selectCurrentPack );
	const page = useAppSelector( selectCardsPageNumber );
	const pageCount = useAppSelector( selectCardsPageSize );
	const [searchFieldValue, setSearchFieldValue] = useState( '' );
	const [addingMode, setAddingMode] = useState( false );
	const addCard = async (payload: confirmPayloadType) => {
		if (cardsPack_id) {
			await dispatch( CreateCardTC( { cardsPack_id, ...payload } ) );
			setAddingMode( false );
		}
	};
	const addSearchHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	useEffect( () => {
		cardsPack_id && dispatch( getCards( { cardsPack_id, page, pageCount } ) );
	}, [cardsPack_id, page, pageCount] );
	useEffect( () => () => {
		dispatch( AddCardsAC( [] ) );
	}, [] );
	return (
		<div>
			{ addingMode && (
				<CardInfo confirm={ addCard } cancel={ () => setAddingMode( false ) }/>
			) }
			<div className={ s.wrapper }>
				<div className={ s.wrap }>
					<div className={ s.head }>
						<Link className={ s.link } to={ `/packs/${ currentPack?.user_id }` }>
							<img className={ s.img } src={ arrow } alt=''/>
						</Link>
						<h2 className={ s.title }>{ currentPack?.name }</h2>
					</div>
					<button onClick={ () => setAddingMode( true ) }>Add new</button>
					<form className={ s.wrapForm } onSubmit={ addSearchHandler }>
						<input
							className={ s.input }
							value={ searchFieldValue }
							onChange={ (e) => setSearchFieldValue( e.currentTarget.value ) }
							type='text'
							placeholder='Search...'
						/>
						<button className={ s.button }>Search</button>
					</form>

					<DenseTableList/>
					<div className={ s.wrapBottom }>
						<PaginationCardsContainer/>
					</div>
				</div>
			</div>
		</div>
	);
}
