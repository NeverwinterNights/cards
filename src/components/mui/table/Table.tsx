import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './Table.module.scss';
import { useAppSelector } from '../../../redux/store';
import { deletePackTC, getPacks, packType } from '../../../redux/packs-reducer';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
	'& td': {
		padding: 16,
	},
}));

export default function DenseTable() {
	const packs = useAppSelector<packType[]>(state => state.packsReducer.cardPacks);
	const dispatch = useDispatch();
	const { currentUserId } = useParams();

	const [sortName, setSortName] = useState<string>('0name');
	const [sortUpdated, setSortUpdated] = useState<string>('0updated');
	const [sortCreated, setSortCreated] = useState<string>('0created');


	const rows = packs.map(m => (
		<StyledTableRow key={m._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component='th' scope='row'>{m.name}</TableCell>
			<TableCell align='right'>{m.cardsCount}</TableCell>
			<TableCell align='right'>{m.updated}</TableCell>
			<TableCell align='right'>{m.created}</TableCell>
			<TableCell align='right'>
				<span>update</span>
				<span onClick={() => dispatch(deletePackTC(m._id, currentUserId))}>delete</span>
			</TableCell>
		</StyledTableRow>));

	const onSortNameClickHandler = () => {
		if (sortName === '0name') {
			setSortName('1name');
		}
		if (sortName === '1name') {
			setSortName('0name');
		}
		dispatch(getPacks({ user_id: currentUserId, sortPacks: sortName }));
	};

	const onSortUpdatedClickHandler = () => {
		if (sortUpdated === '0updated') {
			setSortUpdated('1updated');
		}
		if (sortUpdated === '1updated') {
			setSortUpdated('0updated');
		}
		dispatch(getPacks({ user_id: currentUserId, sortPacks: sortUpdated }));
	};

	const onSortCreatedClickHandler = () => {
		if (sortCreated === '0created') {
			setSortCreated('1created');
		}
		if (sortCreated === '1created') {
			setSortCreated('0created');
		}
		dispatch(getPacks({ user_id: currentUserId, sortPacks: sortCreated }));

	};


	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
				<TableHead className={s.tableHead}>
					<StyledTableRow>
						<TableCell onClick={onSortNameClickHandler}>Name</TableCell>
						<TableCell align='right'>Cards</TableCell>
						<TableCell onClick={onSortUpdatedClickHandler} align='right'>Last
							Updated</TableCell>
						<TableCell onClick={onSortCreatedClickHandler} align='right'>Created
							by</TableCell>
						<TableCell align='right'>Actions</TableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody className={s.tableBody}>
					{rows}
				</TableBody>
			</Table>
		</TableContainer>
	);
}