import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import s from './Main.module.scss';
import packs from '../../images/main/packs.svg';
import profile from '../../images/main/profile.svg';
import PackList from './packs-list/PacksList';
import { makeLogout } from '../../../redux/authReducer';
import { selectIsAuth } from '../../selectors/authSelectors';
import { useAppSelector } from '../../../redux/store';


function Main() {
	const isAuth = useAppSelector<boolean>( selectIsAuth );
	const dispatch = useDispatch();
	const onLogoutClickHandler = () => {
		dispatch( makeLogout() );
	};
	console.log( 'main' );
	if (!isAuth) {
		return <Navigate to='/login'/>;
	}

	return (
		<div className={ s.wrapper }>
			<header className={ s.header }>
				<div className={ s.container }>
					<h2 className={ s.logo }>It-incubator</h2>
					<div className={ s.wrapBtn }>
						<button className={ s.BtnLeft }>
							<img className={ s.iconPacks } src={ packs } alt=""/>
							<p>Packs list</p>
						</button>
						<button className={ s.BtnRight }>
							<img className={ s.iconProfile } src={ profile } alt=""/>
							<p>Profile</p>
						</button>
						<button className={ s.BtnRight } onClick={ onLogoutClickHandler }>
							logout
						</button>
					</div>
				</div>
			</header>
			<section className={ s.content }>
				<PackList/>
				{/*<PackListNew />*/ }
			</section>
		</div>
	);
}

export default Main;
