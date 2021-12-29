import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import s from './Learn.module.scss';
import { CustomizedRadios } from '../../../mui/radio-button/RadioButton';
import { getCards, putGrade } from '../../../../redux/cards-reducer';
import { useAppSelector } from '../../../../redux/store';
import { selectCards } from '../../../../assets/selectors/authSelectors';

export function Learn() {
	const cards = useAppSelector(selectCards);
	const dispatch = useDispatch();
	const [isAnswered, setIsAnswered] = useState(false);
	const { cardsPack_id } = useParams();
	const randomCard = useMemo(() => {
		if (!cards.length) return undefined;
		const invertedGradeSum = cards.reduce((acc, el) => {
			return acc + 6 - el.grade;
		}, 0);
		const randomNumber = Math.random() * invertedGradeSum;
		let sum = 0;
		let i = 0;
		while (sum < randomNumber) {
			sum += 6 - cards[i].grade;
			i += 1;
		}
		return cards[i - 1];
	}, [cards]);

	const [grade, setGrade] = useState(1);
	const onGradeChange = (newGrade: number) => setGrade(newGrade);

	const showAnswerClickHandler = () => setIsAnswered(true);

	const onNextClickHandler = () => {
		setIsAnswered(false);
		randomCard && dispatch(putGrade({ card_id: randomCard._id, grade }));
	};

	useEffect(() => {
		if (cardsPack_id) {
			dispatch(getCards({ cardsPack_id, pageCount: 1000 }));
		}
	}, [cardsPack_id]);

	return (
		<div>
			<div className={s.wrapper}>
				<div className={s.wrap}>
					<h3 className={s.subtitle}>Learn “Pack Name”</h3>
					<div className={s.content}>
						<p className={s.text}>
							<strong>Question:</strong> “{`${randomCard?.question || ''}`}”
						</p>
						{isAnswered && (
							<>
								<p className={s.textAnswer}>
									<strong>Answer:</strong> “{`${randomCard?.answer || ''}`}”
								</p>
								<p className={s.textRadio}>
									<strong>Rate yourself:</strong>
								</p>
								<CustomizedRadios
									callback={onGradeChange}
									averageGrade={randomCard?.grade}
								/>
							</>
						)}
						<div className={s.wrapBtn}>
							<Link to={`/cards/${cardsPack_id}`}>
								<button className={s.btnCancel}>Cancel</button>
							</Link>
							{isAnswered ? (
								<button className={s.btnSave} onClick={onNextClickHandler}>
									Next
								</button>
							) : (
								<button className={s.btnSave} onClick={showAnswerClickHandler}>
									Show answer
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
