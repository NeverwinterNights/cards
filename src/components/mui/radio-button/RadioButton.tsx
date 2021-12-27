import React, { MouseEventHandler } from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const BpIcon = styled('span')(({ theme }) => ({
	borderRadius: '50%',
	width: 16,
	height: 16,
	boxShadow:
		theme.palette.mode === 'dark'
			? '0 0 0 1px rgb(16 22 26 / 40%)'
			: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
	backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
	backgroundImage:
		theme.palette.mode === 'dark'
			? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
			: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
	'.Mui-focusVisible &': {
		outline: '1px auto rgba(19,124,189,.6)',
		outlineOffset: 2,
	},
	'input:hover ~ &': {
		backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
	},
}));

const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: '#21268F',
	backgroundImage:
		'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
	'&:before': {
		display: 'block',
		width: 16,
		height: 16,
		backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
		content: '""',
	},
	'input:hover ~ &': {
		backgroundColor: '#106ba3',
	},
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
	return (
		<Radio
			sx={{
				'&:hover': {
					bgcolor: 'transparent',
				},
			}}
			disableRipple
			color='default'
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			{...props}
		/>
	);
}

type CustomizedRadiosPropsType = {
	callback: (grade: number) => void;
	averageGrade?: number;
};

export const CustomizedRadios = ({
	callback,
	averageGrade,
}: CustomizedRadiosPropsType) => {
	const clickHandler: MouseEventHandler = (e) => {
		const grade = +(e.target as HTMLInputElement).value;
		grade && callback(grade);
	};
	return (
		<FormControl component='fieldset'>
			<RadioGroup
				onClick={clickHandler}
				defaultValue={averageGrade && Math.ceil(averageGrade)}
			>
				<FormControlLabel
					value={1}
					control={<BpRadio />}
					label='Did not know'
				/>
				<FormControlLabel value={2} control={<BpRadio />} label='Forgot' />
				<FormControlLabel
					value={3}
					control={<BpRadio />}
					label='A lot of thought'
				/>
				<FormControlLabel value={4} control={<BpRadio />} label='Сonfused' />
				<FormControlLabel
					value={5}
					control={<BpRadio />}
					label='Knew the answer'
				/>
			</RadioGroup>
		</FormControl>
	);
};
