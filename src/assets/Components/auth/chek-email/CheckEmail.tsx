import s from './CheckEmail.module.scss';
import letter from './../../../images/auth-img/letter.svg';

const data = {
	email: 'example@mail.com',
};

function CheckEmail() {
	return (
		<div className={s.check}>
			<div className={s.wrap}>
				<h2 className={s.title}>It-incubator</h2>
				<img className={s.img} src={letter} alt='' />
				<h3 className={s.subtitle}>Check Email</h3>
				<div className={s.content}>
					<p className={s.textInfo}>
						We’ve sent an Email with instructions to {data.email}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CheckEmail;
