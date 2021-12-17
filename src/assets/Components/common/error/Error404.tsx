import React from 'react'
import s from './Error404.module.css'
import img from '../../../images/error/404girl.jpg'

function Error404() {
	return (
		<div className={s.error404}>
			<span className={s.num404}>404</span>
			<img src={img} alt="sad girl"/>
			<div className={s.content404}>
				<div>Page not found!</div>
				<div>But don't worry, and click the "Back" button of your browser</div>
			</div>
		</div>
	)
}

export default Error404