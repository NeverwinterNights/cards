import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { packType } from '../../../redux/packs-reducer';
import ButtonForTable from '../../common/button/ButtonForTable';
import AddNewPack from '../../common/modal-windows/add-new-pack/AddNewPack';


const StyledTableRow = styled( TableRow )( ({ theme }) => ( {
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
} ) );

const formatDate = (date: string) => {
	return new Date( date ).toLocaleDateString( [], {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	} );
};

export default function DenseTable() {
	const packs = useAppSelector<packType[]>( state => state.packsReducer.cardPacks );
	const [editMode, setEditMode] = useState( false );
	const toggleEditMode = () => setEditMode( !editMode );

	const rows = packs.map( m => {
			return (
				<StyledTableRow key={ m._id }
								sx={ { '&:last-child td, &:last-child th': { border: 0 } } }>
					<TableCell component="th" scope="row">{ m.name }</TableCell>
					<TableCell align="right">{ m.cardsCount }</TableCell>
					<TableCell align="right">{ formatDate( m.updated ) }</TableCell>
					<TableCell align="right">{ formatDate( m.created ) }</TableCell>
					<TableCell align="right">
						{/*<span>update</span>*/ }
						{/*<span onClick={ () => dispatch( deletePackTC( m._id, currentUserId) ) }>delete</span>*/ }
						<ButtonForTable packId={ m._id } ownerId={ m.user_id } callBack={ toggleEditMode }/>
					</TableCell>
				</StyledTableRow>
			);
		},
	);


	return (
		<>
			{ editMode && <AddNewPack/> }
			<TableContainer component={ Paper }>
				<Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
					<TableHead className={ s.tableHead }>
						<StyledTableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Cards</TableCell>
							<TableCell align="right">Last Updated</TableCell>
							<TableCell align="right">Created by</TableCell>
							<TableCell align="right">Actions</TableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody className={ s.tableBody }>
						{ rows }
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
