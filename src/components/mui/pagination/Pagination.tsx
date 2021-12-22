import React from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import s from  '../../main/packs-list/PackList.module.scss'
import { useAppSelector } from '../../../redux/store';
import { selectCardPacksTotalCount, selectPageNumber, selectPageSize } from '../../../assets/selectors/authSelectors';
import { setPage, setPageCount } from '../../../redux/packs-reducer';


export default function PaginationSize() {
	const dispatch = useDispatch();
	const page = useAppSelector( selectPageNumber );
	const pageSize = useAppSelector( selectPageSize );
	const cardPacksTotalCount = useAppSelector( selectCardPacksTotalCount );
	const totalPagesCount = Math.ceil( cardPacksTotalCount / pageSize );
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch( setPage( value ) );
	};
	const selectChangeHandler = (e: SelectChangeEvent<number>) => {
		dispatch( setPageCount( +e.target.value ) );
	};


	return (
		<>
			<Stack spacing={ 2 }>
				<Pagination count={ totalPagesCount } page={ page } onChange={ handleChange } size="small"
							shape="rounded"
							color="primary"/>
			</Stack>
			<p className={ s.textBottom }> Show</p>
			<Select
				className={s.select__pag} //класс для задания высоты селекта
				// size='small'
				value={ pageSize }
				onChange={ selectChangeHandler }
				defaultValue={ 4 }
			>
				<MenuItem value={ 4 }>4</MenuItem>
				<MenuItem value={ 6 }>6</MenuItem>
				<MenuItem value={ 8 }>8</MenuItem>
				<MenuItem value={ 12 }>12</MenuItem>
			</Select>
			<p className={ s.textBottom }> Cards per Page</p>
		</>
	);
}
////////

// const [page, setPage] = React.useState(1);
// const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
// 	setPage(value);
// };
//
// return (
// 	<Stack spacing={2}>
// 		<Typography>Page: {page}</Typography>
// 		<Pagination count={10} page={page} onChange={handleChange} />
// 	</Stack>


// <select className={ s.select }>
// 	<option>1</option>
// 	<option>2</option>
// 	<option>3</option>
// 	<option>4</option>
// 	<option>5</option>
// </select>
// <p className={ s.textBottom }> Cards per Page</p>