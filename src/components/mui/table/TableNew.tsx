import React, { MouseEventHandler, useEffect, useState } from 'react';
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
import { ActionButton } from '../../common/button/ActionButtonNew';
import {
	isLoading,
	selectAutorisedUserId,
	selectPacksPageNumber,
	selectPacksPageSize,
	selectSortPacks,
} from '../../../assets/selectors/authSelectors';
import CircularIndeterminate from '../progress-bar/CircularIndeterminate';
import EditPackName from '../../common/modal-windows/add-new-pack/EditPackName';
import DeletePack from '../../common/modal-windows/delete-pack/DeletePackNew';

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
	user_id?: string;
};

export function DenseTable({ user_id }: ProfilePropsType) {
	const packs = useAppSelector<packType[]>(
		(state) => state.packsReducer.cardPacks,
	);
	const page = useAppSelector(selectPacksPageNumber);
	const pageCount = useAppSelector(selectPacksPageSize);
	const autorisedUserId = useAppSelector(selectAutorisedUserId);
	const dispatch = useDispatch();
	const { currentUserId } = useParams();

	const isLoadingStatus = useAppSelector(isLoading);

	const [editMode, setEditMode] = useState(false);
	const [editablePack, setEditablePack] = useState<packType | null>(null);

	const [deleteMode, setDeleteMode] = useState(false);
	const [deletablePack, setDeletablePack] = useState<packType | null>(null);

	const editPackHandler = (newName: string) => {
		const userId = currentUserId ? currentUserId : autorisedUserId;
		userId &&
			editablePack &&
			dispatch(
				updatePackTC({
					// добавил currentUserId для
					// сохранения паков конкретного юзера
					...editablePack,
					name: newName,
					user_id: userId, // добавил для сохранения паков конкретного юзера
				}),
			);
		setEditMode(false);
	};

	const deletePackHandler = () => {
		autorisedUserId &&
			deletablePack &&
			dispatch(deletePackTC(deletablePack._id, autorisedUserId)); // добавил для сохранения паков конкретного юзера
		setDeleteMode(false);
	};

	const sortCards = useAppSelector(selectSortPacks);
	const sortDirection = +sortCards[0];
	const sortField = sortCards.slice(1);

	const rows = packs.map((m) => {
		const linkClickHandler = () => {
			dispatch(setCurrentPack(m));
		};
		const onDeleteClickHandler = () => {
			setDeletablePack(m);
			setDeleteMode(true);
		};
		const onEditClickHandler = () => {
			setEditablePack(m);
			setEditMode(true);
		};

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
							<ActionButton title='Edit' callBack={onEditClickHandler} />
						</>
					)}
					{!!m.cardsCount && (
						<Link to={`/learn/${m._id}`}>
							<ActionButton title='Learn' />
						</Link>
					)}
				</TableCell>
			</StyledTableRow>
		);
	});

	useEffect(() => {
		dispatch(
			getPacks({
				user_id: user_id ? user_id : currentUserId,
				sortPacks: sortDirection + sortField,
				page,
				pageCount,
			}),
		);
	}, [currentUserId, sortDirection, sortField, page, pageCount]);

	const tableHeadClickHandler: MouseEventHandler = (e) => {
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
		<>
			{editMode && (
				<EditPackName
					cancel={() => setEditMode(false)}
					confirm={editPackHandler}
					name={editablePack?.name}
				/>
			)}
			{deleteMode && (
				<DeletePack
					confirm={deletePackHandler}
					cancel={() => setDeleteMode(false)}
					packName={deletablePack?.name}
				/>
			)}

			<TableContainer
				style={
					isLoadingStatus === 'loading'
						? { pointerEvents: 'none' }
						: { pointerEvents: 'auto' }
				}
				className={s.wrapper}
				component={Paper}
			>
				{isLoadingStatus === 'loading' ? <CircularIndeterminate /> : ''}
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead className={s.tableHead}>
						<StyledTableRow onClick={tableHeadClickHandler}>
							<TableCell align='left' data-sort-field='name'>
								Name{' '}
								<img
									src={arrow}
									alt=''
									className={s.img}
									style={getArrowStyle('name')}
								/>
							</TableCell>

							<TableCell align='right' data-sort-field='cardsCount'>
								Cards
								<img
									className={s.img}
									src={arrow}
									alt=''
									style={getArrowStyle('cardsCount')}
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
		</>
	);
}
