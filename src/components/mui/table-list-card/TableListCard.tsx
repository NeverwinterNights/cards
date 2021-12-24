import React, { useState } from 'react';
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
import { selectAutorisedUserId, selectCards } from '../../../assets/selectors/authSelectors';
import { CustomizedRating } from '../rating/Rating';
import { cutDate } from '../table/Table';
import { ActionButton } from '../../common/button/ActionButton';
import { cardsType, DeleteCardTC, UpdateCardTC } from '../../../redux/cards-reducer';
import { CardInfo, confirmPayloadType } from '../../main/packs-list/CardInfo/CardInfo';


const StyledTableRow = styled( TableRow )( ({ theme }) => ( {
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
} ) );

export function DenseTableList() {
	const cards = useAppSelector( selectCards );
	const autorisedUserId = useAppSelector( selectAutorisedUserId );
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState( false );
	const [editableCard, setEditableCard] = useState<cardsType | null>( null );

	const rows = cards.map( (m) => {
		const onDeleteClickHandler = () =>
			dispatch( DeleteCardTC( m._id, m.cardsPack_id ) );
		const onEditClickHandler = () => {
			setEditableCard( m );
			setEditMode( true );
		};
		return (
			<StyledTableRow
				key={ m._id }
				sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
			>
				<TableCell component='th' scope='row'>
					{ m.question }
				</TableCell>
				<TableCell align='right'>{ m.answer }</TableCell>
				<TableCell align='right'>{ cutDate( m.updated ) }</TableCell>
				<TableCell align='right'>
					<CustomizedRating value={ Math.round( m.grade ) }/>
				</TableCell>
				<TableCell align='right'>
					{ m.user_id === autorisedUserId && (
						<>
							<ActionButton
								title='Delete'
								style={ { background: '#f1453d', color: '#fff' } }
								callBack={ onDeleteClickHandler }
							/>
							<ActionButton title='Edit' callBack={ onEditClickHandler }/>
						</>
					) }
				</TableCell>
			</StyledTableRow>
		);
	} );
	const editCard = (payload: confirmPayloadType) => {
		editableCard?._id
		&& dispatch( UpdateCardTC( { ...editableCard, ...payload } ) );
		setEditMode( false );
	};

	return (
		<>
			{ editMode && (
				<CardInfo confirm={ editCard }
						  cancel={ () => setEditMode( false ) }
						  answer={ editableCard?.answer }
						  question={ editableCard?.question }/>
			) }
			<TableContainer component={ Paper }>
				<Table sx={ { minWidth: 650 } } size='small' aria-label='a dense table'>
					<TableHead className={ s.tableHead }>
						<StyledTableRow>
							<TableCell>Question</TableCell>
							<TableCell align='right'>Answer</TableCell>
							<TableCell align='right'>Last Updated</TableCell>
							<TableCell align='right'>Grade</TableCell>
							<TableCell align='right'>Actions</TableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody className={ s.tableBody }>{ rows }</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
