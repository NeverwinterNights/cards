import React from 'react';

import { cardsApi } from '../../../api/api';


const btnStyle = {
	padding: 4,
	margin: 4,
	border: '1px solid #43447b',
};

export const Test = () => {
	const onGetPacksClickHandler = () => {
		cardsApi.getPacks( { user_id: '61b8cf59c4355e00049b16f7' } )
			.then( console.log );
	};

	// cardsPack_id: '61bd9ee25663080004d9caa7'


	const onCreatePackClickHandler = () => {
		cardsApi.createPack( { name: 'PackName' } )
			.then( console.log );
	};
	const onDeletePackClickHandler = () => {
		cardsApi.deletePack( '61beefc523ca880004b56cac' )
			.then( console.log );
	};
	const onUpdatePackClickHandler = () => {
		cardsApi.updatePack( {
			'_id': '61bf147923ca880004b56cae',
			'private': false,
			'name': 'PackName2',
			'path': '/def',
			'rating': 4,
			'shots': 1,
			grade: 5,
		} )
			.then( console.log );
	};
	const onGetCardsClickHandler = () => {
		cardsApi.getCards( { cardsPack_id: '61bf147923ca880004b56cae' } )
			.then( console.log );
	};
	const onCreateCardClickHandler = () => {
		cardsApi.createCard( { cardsPack_id: '61bf147923ca880004b56cae', grade: 5, rating: 4, shots: 1 } )
			.then( console.log );
	};
	const onDeleteCardClickHandler = () => {
		cardsApi.deleteCard( '61bf176223ca880004b56caf' )
			.then( console.log );
	};
	const onUpdateCardClickHandler = () => {
		cardsApi.updateCard( {
			_id: '61bf17a623ca880004b56cb0',
			answer: 'ans',
			question: 'que',
			'rating': 4,
			'shots': 1,
			grade: 5,
		} )
			.then( console.log );
	};
	return (
		<>
			<div>
				<button style={ btnStyle } onClick={ onGetPacksClickHandler }>getPacks</button>
				<button style={ btnStyle } onClick={ onCreatePackClickHandler }>createPack</button>
				<button style={ btnStyle } onClick={ onDeletePackClickHandler }>deletePack</button>
				<button style={ btnStyle } onClick={ onUpdatePackClickHandler }>updatePack</button>
			</div>
			<div>
				<button style={ btnStyle } onClick={ onGetCardsClickHandler }>getCards</button>
				<button style={ btnStyle } onClick={ onCreateCardClickHandler }>createCard</button>
				<button style={ btnStyle } onClick={ onDeleteCardClickHandler }>deleteCard</button>
				<button style={ btnStyle } onClick={ onUpdateCardClickHandler }>updateCard</button>
			</div>
		</>
	);
};