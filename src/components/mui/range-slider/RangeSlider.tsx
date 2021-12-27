import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { PacksReducerStateType, SetRangeCardsAC } from '../../../redux/packs-reducer';
import { RootState, useAppSelector } from '../../../redux/store';
import { maxCardsRangeInPackNumber } from '../../../assets/selectors/authSelectors';

function valuetext(value: number) {
	return `${value}°C`;
}

export default function RangeSlider() {
	const dispatch = useDispatch();

	const maxNumberCards = useAppSelector(maxCardsRangeInPackNumber);

	const [value, setValue] = React.useState<number[]>([0, maxNumberCards]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};

	useEffect(() => {
		setValue([0, maxNumberCards])
	}, [maxNumberCards]);


	useEffect(() => {
		dispatch(SetRangeCardsAC(value[0], value[1]));
	}, [value]);

	return (
		<Box sx={{ width: 196 }}>
			<Slider
				style={{ color: '#21268F' }}
				getAriaLabel={() => 'Temperature range'}
				value={value}
				valueLabelDisplay='on'
				onChange={handleChange}
				getAriaValueText={valuetext}
				max={maxNumberCards}
			/>
		</Box>
	);
}
