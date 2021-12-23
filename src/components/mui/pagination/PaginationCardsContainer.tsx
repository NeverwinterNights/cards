import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../../../redux/store';
import {
	selectCardsPageNumber,
	selectCardsPageSize,
	selectCardsTotalCount,
} from '../../../assets/selectors/authSelectors';
import { PaginationSize } from './Pagination';
import { setCardsPage, setCardsPageCount } from '../../../redux/cards-reducer';


export function PaginationCardsContainer() {
	const dispatch = useDispatch();
	const page = useAppSelector( selectCardsPageNumber );
	const pageSize = useAppSelector( selectCardsPageSize );
	const cardsTotalCount = useAppSelector( selectCardsTotalCount );
	const totalPagesCount = Math.ceil( cardsTotalCount / pageSize );
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch( setCardsPage( value ) );
	};
	const selectChangeHandler = (e: SelectChangeEvent<number>) => {
		dispatch( setCardsPageCount( +e.target.value ) );
	};

	return (
		<PaginationSize
			page={ page }
			pageSize={ pageSize }
			totalPagesCount={ totalPagesCount }
			paginationCallback={ handleChange }
			selectCallback={ selectChangeHandler }
		/>

	);
}