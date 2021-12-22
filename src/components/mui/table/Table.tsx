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
import arrow from './../../../assets/images/main/sortArrow.svg';


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
	const [showArrow, setShowArrow] = useState(false);
	const [showSecondArrow, setSecondShowArrow] = useState(false);
	const [showThirdArrow, setThirdShowArrow] = useState(false);


	const rows = packs.map(m => (
		<StyledTableRow key={m._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component='th' scope='row'>{m.name}</TableCell>
			<TableCell align='right'>{m.cardsCount}</TableCell>
			<TableCell align='right'>{new Date(m.updated).toLocaleDateString()}</TableCell>
			<TableCell align='right'>{new Date(m.created).toLocaleDateString()}</TableCell>
			<TableCell align='right'>
				<span>update</span>
				<span onClick={() => dispatch(deletePackTC(m._id, currentUserId))}>delete</span>
			</TableCell>
		</StyledTableRow>));

	const onSortNameClickHandler = () => {
		const test = sortName === '0name' ? '1name' : '0name';
		setSortName(test);
		dispatch(getPacks({ user_id: currentUserId, sortPacks: test }));
		setShowArrow(true)
		setSecondShowArrow(false)
		setThirdShowArrow(false)
	};
	const onSortUpdatedClickHandler = () => {
		const test = sortUpdated === '0updated' ? '1updated' : '0updated';
		setSortUpdated(test);
		dispatch(getPacks({ user_id: currentUserId, sortPacks: test }));
		setSecondShowArrow(true)
		setShowArrow(false)
		setThirdShowArrow(false)
	};

	const onSortCreatedClickHandler = () => {
		const test = sortCreated === '0created' ? '1created' : '0created';
		setSortCreated(test);
		dispatch(getPacks({ user_id: currentUserId, sortPacks: test }));
		setThirdShowArrow(true)
		setShowArrow(false)
		setSecondShowArrow(false)
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
				<TableHead className={s.tableHead}>
					<StyledTableRow>
						<TableCell onClick={onSortNameClickHandler}>Name <img className={showArrow ? s.arrow : s.displayNone}
																																	style={sortName === '0name' ? {transform: "rotate(180deg)"} : undefined}
																																	src={arrow}
																																	alt='' /></TableCell>

						<TableCell align='right'>Cards</TableCell>
						<TableCell onClick={onSortUpdatedClickHandler} align='right'>Last
							Updated <img className={showSecondArrow ? s.arrow : s.displayNone}
													 style={sortUpdated === '0updated' ? {transform: "rotate(180deg)"} : undefined}
													 src={arrow}
													 alt='' /></TableCell>
						<TableCell onClick={onSortCreatedClickHandler} align='right'>Created
							by
							<img className={showThirdArrow ? s.arrow : s.displayNone}
									 style={sortCreated === '0created' ? {transform: "rotate(180deg)"} : undefined}
									 src={arrow}
									 alt='' />
						</TableCell>
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