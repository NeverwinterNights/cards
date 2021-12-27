import React, { MouseEventHandler, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
import {
	deletePackTC,
	getPacks,
	packType,
	setCurrentPack,
	setPacksSort,
	updatePackTC,
} from '../../../redux/packs-reducer';
import arrow from './../../../assets/images/main/sortArrow.svg';
import { ActionButton } from '../../common/button/ActionButton';
import {
	selectAutorisedUserId,
	selectCurrentPackId,
	selectSortPacks,
} from '../../../assets/selectors/authSelectors';

type sortDirectionsType = 'name' | 'cards' | 'updated' | 'created';


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

export const cutDate = (date: string) => new Date(date).toLocaleDateString();


type ProfilePropsType = {
	collier?: string
}

export function DenseTable(props: ProfilePropsType) {
	const packs = useAppSelector<packType[]>(
		(state) => state.packsReducer.cardPacks,
	);
	const autorisedUserId = useAppSelector(selectAutorisedUserId);
	const dispatch = useDispatch();
	const { currentUserId } = useParams();

	const cardsPack_id = useAppSelector(selectCurrentPackId);
	const sortCards = useAppSelector(selectSortPacks);
	const sortDirection = +sortCards[0];
	const sortField = sortCards.slice(1);


	const rows = packs.map((m) => {
		const linkClickHandler = () => {
			dispatch(setCurrentPack(m));
		};
		const onDeleteClickHandler = () => dispatch(deletePackTC(m._id, m.user_id));
		const onUpdateClickHandler = (text: string) => dispatch(updatePackTC({
			...m,
			name: text,
		}));

		return (
			<StyledTableRow
				key={m._id}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component='th' scope='row'>
					<Link to={`/cards/${m._id}`} onClick={linkClickHandler}>
						{m.name}
					</Link>
				</TableCell>
				<TableCell align='right'>{m.cardsCount}</TableCell>
				<TableCell align='right'>{cutDate(m.updated)}</TableCell>
				<TableCell align='right'>{cutDate(m.created)}</TableCell>
				<TableCell align='right'>
					{m.user_id === autorisedUserId && (
						<>
							<ActionButton
								title='Delete'
								style={{ background: '#f1453d', color: '#fff' }}
								callBack={onDeleteClickHandler}
							/>
							<ActionButton title='Edit'
														style={{ background: '#f1453d', color: '#fff' }}
														addName={onUpdateClickHandler} />
						</>
					)}
					<ActionButton title='Learn' />
				</TableCell>
			</StyledTableRow>
		);
	});

	useEffect(() => {
		console.log(props.collier, currentUserId);
		dispatch(getPacks({
			user_id: props.collier ? props.collier : currentUserId,
			sortPacks: sortDirection + sortField,
		}));
	}, [currentUserId, sortDirection, sortField]);


	const clickHandler: MouseEventHandler = (e) => {
		const field = (e.target as unknown as { dataset: { sortField: string } })
			.dataset.sortField;
		if (!field) return;
		if (field === sortField) {
			dispatch(setPacksSort((sortDirection ? 0 : 1) + sortField));
			return;
		}
		dispatch(setPacksSort(1 + field));
	};

	const getArrowStyle = (fieldName: string) => {
		if (fieldName !== sortField) return { display: 'none' };
		if (sortDirection === 0) return { transform: 'rotate(180deg)' };
		return {};
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
				<TableHead className={s.tableHead}>
					<StyledTableRow onClick={clickHandler}>
						<TableCell align='left' data-sort-field='name'>
							Name{' '}
							<img
								src={arrow}
								alt=''
								className={s.img}
								style={getArrowStyle('name')}
							/>
						</TableCell>

						<TableCell align='right' data-sort-field='cards'>Cards
							<img
								className={s.img}
								src={arrow}
								alt=''
								style={getArrowStyle('cards')}
							/>
						</TableCell>
						<TableCell align='right' data-sort-field='updated'>
							Last Updated{' '}
							<img
								className={s.img}
								src={arrow}
								alt=''
								style={getArrowStyle('updated')}
							/>
						</TableCell>
						<TableCell align='right' data-sort-field='created'>
							Created by
							<img
								className={s.img}
								src={arrow}
								alt=''
								style={getArrowStyle('created')}
							/>
						</TableCell>
						<TableCell align='right'>Actions</TableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody className={s.tableBody}>{rows}</TableBody>
			</Table>
		</TableContainer>
	);
}
