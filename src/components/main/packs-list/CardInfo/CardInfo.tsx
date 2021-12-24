import React, { useState } from 'react';

import s from './CardInfo.module.scss';

// import arrow from "../../../images/main/arrow.svg";

export type confirmPayloadType = { answer: string; question: string };

type CardInfoPropsType = {
	question?: string;
	answer?: string;
	confirm: (payload: confirmPayloadType) => void;
	cancel: () => void;
};

export const CardInfo: React.FC<CardInfoPropsType> = ({
														  answer,
														  question,
														  cancel,
														  confirm,
													  }) => {
	const [questionFieldValue, setQuestionFieldValue] = useState( question || '' );
	const [answerFieldValue, setAnswerFieldValue] = useState( answer || '' );
	const onSaveClickHandler = () => {
		confirm( { answer: answerFieldValue, question: questionFieldValue } );
	};

	return (
		<div>
			<div className={ s.wrapper }>
				<div className={ s.wrap }>
					<h3 className={ s.subtitle }>Card Info</h3>

					<div className={ s.content }>
						<p className={ s.text }>Question</p>
						<input
							type='text'
							className={ s.input }
							placeholder='How This works in JavaScript?'
							value={ questionFieldValue }
							onChange={ (e) => setQuestionFieldValue( e.currentTarget.value ) }
						/>

						<div className={ s.dada }>
							<label htmlFor='myfile2' className={ s.chous }>
								+ Attach file
							</label>
							<input type='file' className={ s.my } id='myfile2' name='myfile2'/>
						</div>

						<p className={ s.text }>Answer</p>
						<input
							type='text'
							className={ s.input }
							placeholder='This is how This works in JavaScript?'
							value={ answerFieldValue }
							onChange={ (e) => setAnswerFieldValue( e.currentTarget.value ) }
						/>
						<div className={ s.dada }>
							<label htmlFor='myfile2' className={ s.chous }>
								+ Attach file
							</label>
							<input type='file' className={ s.my } id='myfile2' name='myfile2'/>
						</div>
						<div className={ s.wrapBtn }>
							<button className={ s.btnCancel } onClick={ cancel }>
								Cancel
							</button>
							<button className={ s.btnSave } onClick={ onSaveClickHandler }>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
