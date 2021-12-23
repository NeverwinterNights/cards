import s from 'CardInfo.module.scss';
// import arrow from "../../../images/main/arrow.svg";

function CardInfo() {
	return (
		<div>
			<div className={s.wrapper}>
				<div className={s.wrap}>
					<h3 className={s.subtitle}>Card Info</h3>

					<div className={s.content}>
						<p className={s.text}>Question</p>
						<input
							type='text'
							className={s.input}
							placeholder='How This works in JavaScript?'
						/>

						<div className={s.dada}>
							<label htmlFor='myfile2' className={s.chous}>
								+ Attach file
							</label>
							<input type='file' className={s.my} id='myfile2' name='myfile2' />
						</div>

						<p className={s.text}>Answer</p>
						<input
							type='text'
							className={s.input}
							placeholder='This is how This works in JavaScript?'
						/>
						<div className={s.dada}>
							<label htmlFor='myfile2' className={s.chous}>
								+ Attach file
							</label>
							<input type='file' className={s.my} id='myfile2' name='myfile2' />
						</div>
						<div className={s.wrapBtn}>
							<button className={s.btnCancel}>Cancel</button>
							<button className={s.btnSave}>Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardInfo;
