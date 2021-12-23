import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/store';
import { SetRangeCardsAC } from '../../../redux/cards-reducer';

function valuetext(value: number) {
	return `${value}°C`;
}

export default function RangeSlider() {
	const dispatch = useDispatch();
	const rangeValue = useAppSelector<number | number[]>(
		(state) => state.cardsReducer.rangeCards,
	);

	const handleChange = (event: Event, newValue: number | number[]) => {
		dispatch(SetRangeCardsAC(newValue));
	};

	return (
		<Box sx={{ width: 196 }}>
			<Slider
				style={{ color: '#21268F' }}
				getAriaLabel={() => 'Temperature range'}
				value={rangeValue}
				onChange={handleChange}
				valueLabelDisplay='auto'
				getAriaValueText={valuetext}
			/>
		</Box>
	);
}
