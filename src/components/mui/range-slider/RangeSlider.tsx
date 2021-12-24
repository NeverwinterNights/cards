import React, { useEffect } from 'react';
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


	const [value, setValue] = React.useState<number[]>([0, 100]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};


	useEffect(() => {
		dispatch(SetRangeCardsAC(value[0], value[1]));
	}, );

	const rangeValue1 = useAppSelector<number>(
		(state) => state.cardsReducer.minGrade,
	);

	return (
		<Box sx={{ width: 196 }}>
			<Slider
				style={{ color: '#21268F' }}
				getAriaLabel={() => 'Temperature range'}
				value={value}
				onChange={handleChange}
				valueLabelDisplay='auto'
				getAriaValueText={valuetext}
			/>
		</Box>
	);
}
