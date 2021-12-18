import React from 'react';

import { cardsApi } from '../../../api/api';


export const Test = () => {
	const onClick1 = () => {
		cardsApi.getPacks( {} )
			.then( console.log );
	};


	// cardsPack_id: '61bd9ee25663080004d9caa7'
	const onClick2 = () => {
		cardsApi.getCards( { cardsPack_id: '61bd9ee25663080004d9caa7' } )
			.then( console.log );
	};
	return (
		<>
			<button onClick={ onClick1 }>getPacks</button>
			<button onClick={ onClick2 }>getCards</button>
		</>
	);
};