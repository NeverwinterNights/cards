import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#21268F',
	},
	'& .MuiRating-iconHover': {
		color: '#21268F',
	},
});

export const CustomizedRating: FC<{ value: number }> = ({ value }) => {
	return (
		<Box
			sx={{
				'& > legend': { mt: 5 },
			}}
		>
			<StyledRating
				name='customized-5'
				value={value}
				defaultValue={5}
				max={5}
				size='small'
			/>
		</Box>
	);
};
