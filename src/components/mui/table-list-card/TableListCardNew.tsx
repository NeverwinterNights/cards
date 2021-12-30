import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import s from './TableListCard.module.scss';
import { useAppSelector } from '../../../redux/store';
import {
	isLoading,
	selectAutorisedUserId,
	selectCards,
	selectCardsPageNumber,
	selectCardsPageSize,
	selectCurrentPackId,
	selectSortCards,
} from '../../../assets/selectors/authSelectors';
import { CustomizedRating } from '../rating/Rating';
import { cutDate } from '../table/Table';
import { ActionButton } from '../../common/button/ActionButtonNew';
import {
	cardsType,
	DeleteCardTC,
	getCards,
	setCardsSort,
	UpdateCardTC,
} from '../../../redux/cards-reducer';
import {
	CardInfo,
	confirmPayloadType,
} from '../../main/packs-list/CardInfo/CardInfoNew';
import arrow from '../../../assets/images/main/sortArrow.svg';
import CircularIndeterminate from '../progress-bar/CircularIndeterminate';
import { DeleteCard } from '../../common/modal-windows/delete-pack/DeleteCardNew';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
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

export function DenseTableList() {
	const cards = useAppSelector(selectCards);
	const autorisedUserId = useAppSelector(selectAutorisedUserId);
	const cardsPack_id = useAppSelector(selectCurrentPackId);
	const page = useAppSelector(selectCardsPageNumber);
	const pageCount = useAppSelector(selectCardsPageSize);
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	const [deletableCard, setDeletableCard] = useState<cardsType | null>(null);

	const [editableCard, setEditableCard] = useState<cardsType | null>(null);
	const isLoadingStatus = useAppSelector(isLoading);

	const sortCards = useAppSelector(selectSortCards);
	const sortDirection = +sortCards[0];
	const sortField = sortCards.slice(1);

	const updateCardHandler = (payload: confirmPayloadType) => {
		editableCard && dispatch(UpdateCardTC({ ...editableCard, ...payload }));
		setEditMode(false);
	};
	const deleteCardHandler = () => {
		deletableCard &&
			dispatch(DeleteCardTC(deletableCard?._id, deletableCard?.cardsPack_id));
		setDeleteMode(false);
	};

	const clickHandler: MouseEventHandler = (e) => {
		const field = (e.target as unknown as { dataset: { sortField: string } })
			.dataset.sortField;
		if (!field) return;
		if (field === sortField) {
			dispatch(setCardsSort((sortDirection ? 0 : 1) + sortField));
			return;
		}
		dispatch(setCardsSort(1 + field));
	};

	useEffect(() => {
		cardsPack_id &&
			dispatch(
				getCards({
					cardsPack_id,
					page,
					pageCount,
					sortCards: sortDirection + sortField,
				}),
			);
	}, [cardsPack_id, page, pageCount, sortField, sortDirection]);

	const getArrowStyle = (fieldName: string) => {
		if (fieldName !== sortField) return { display: 'none' };
		if (sortDirection === 0) return { transform: 'rotate(180deg)' };
		return {};
	};

	const rows = cards.map((m) => {
		const onDeleteClickHandler = () => {
			setDeletableCard(m);
			setDeleteMode(true);
		};
		const onEditClickHandler = () => {
			setEditableCard(m);
			setEditMode(true);
		};
		return (
			<StyledTableRow
				key={m._id}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component='th' scope='row'>
					{m.question}
				</TableCell>
				<TableCell align='right'>{m.answer}</TableCell>
				<TableCell align='right'>{cutDate(m.updated)}</TableCell>
				<TableCell align='right'>
					<CustomizedRating value={Math.round(m.grade)} />
				</TableCell>
				<TableCell align='right'>
					{m.user_id === autorisedUserId && (
						<>
							<ActionButton
								title='Delete'
								style={{ background: '#f1453d', color: '#fff' }}
								callBack={onDeleteClickHandler}
							/>
							<ActionButton title='EditCard' callBack={onEditClickHandler} />
						</>
					)}
				</TableCell>
			</StyledTableRow>
		);
	});

	return (
		<div
			className={s.wrapper}
			style={
				isLoadingStatus === 'loading'
					? { pointerEvents: 'none' }
					: { pointerEvents: 'auto' }
			}
		>
			{isLoadingStatus === 'loading' ? <CircularIndeterminate /> : ''}

			{editMode && (
				<CardInfo
					confirm={updateCardHandler}
					cancel={() => setEditMode(false)}
					answer={editableCard?.answer}
					question={editableCard?.question}
				/>
			)}

			{deleteMode && (
				<DeleteCard
					cancel={() => setDeleteMode(false)}
					confirm={deleteCardHandler}
				/>
			)}
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead className={s.tableHead}>
						<StyledTableRow onClick={clickHandler}>
							<TableCell data-sort-field='question'>
								Question
								<img
									className={s.arrow}
									style={getArrowStyle('question')}
									src={arrow}
									alt=''
								/>
							</TableCell>
							<TableCell align='right' data-sort-field='answer'>
								Answer
								<img
									className={s.arrow}
									style={getArrowStyle('answer')}
									src={arrow}
									alt=''
								/>
							</TableCell>
							<TableCell align='right' data-sort-field='updated'>
								Last Updated
								<img
									className={s.arrow}
									style={getArrowStyle('updated')}
									src={arrow}
									alt=''
								/>
							</TableCell>
							<TableCell align='right' data-sort-field='grade'>
								Grade
								<img
									className={s.arrow}
									style={getArrowStyle('grade')}
									src={arrow}
									alt=''
								/>
							</TableCell>
							<TableCell align='right'>Actions</TableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody className={s.tableBody}>{rows}</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
