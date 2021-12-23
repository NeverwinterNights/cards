import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';

import s from '../../main/packs-list/PackList.module.scss';


type PaginationSizePropsType = {
	totalPagesCount: number
	page: number
	pageSize: number
	paginationCallback: (e: React.ChangeEvent<unknown>, value: number) => void
	selectCallback: (e: SelectChangeEvent<number>) => void
}

export const PaginationSize: FC<PaginationSizePropsType> = ({
																pageSize,
																page,
																totalPagesCount,
																paginationCallback,
																selectCallback,
															}) => {

	return (
		<>
			<Stack spacing={ 2 }>
				<Pagination
					count={ totalPagesCount }
					page={ page }
					onChange={ paginationCallback }
					size='small'
					shape='rounded'
					color='primary'
				/>
			</Stack>
			<p className={ s.textBottom }> Show</p>
			<Select
				className={ s.select__pag } //класс для задания высоты селекта
				// size='small'
				value={ pageSize }
				onChange={ selectCallback }
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
};
