import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../../../redux/store';
import { selectPacksTotalCount, selectPacksPageNumber, selectPacksPageSize } from '../../../assets/selectors/authSelectors';
import { setPacksPage, setPacksPageCount } from '../../../redux/packs-reducer';
import { PaginationSize } from './Pagination';


export function PaginationPacksContainer() {
	const dispatch = useDispatch();
	const page = useAppSelector( selectPacksPageNumber );
	const pageSize = useAppSelector( selectPacksPageSize );
	const cardPacksTotalCount = useAppSelector( selectPacksTotalCount );
	const totalPagesCount = Math.ceil( cardPacksTotalCount / pageSize );
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch( setPacksPage( value ) );
	};
	const selectChangeHandler = (e: SelectChangeEvent<number>) => {
		dispatch( setPacksPageCount( +e.target.value ) );
	};

	return (
		<PaginationSize page={ page }
						pageSize={ pageSize }
						totalPagesCount={ totalPagesCount }
						paginationCallback={ handleChange }
						selectCallback={ selectChangeHandler }

		/>
	);
}