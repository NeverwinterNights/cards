import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import s from './Profile.module.scss';
import RangeSlider from '../../../mui/range-slider/RangeSlider';
import { DenseTable } from '../../../mui/table/Table';
import PaginationSize from '../../../mui/pagination/Pagination';
import { useAppSelector } from '../../../../redux/store';
import { selectLoginData, selectPageNumber, selectPageSize } from '../../../../assets/selectors/authSelectors';
import { getPacks } from '../../../../redux/packs-reducer';


const defaultAva = 'https://via.placeholder.com/150';

// import ButtonForTable from "./../../../Components/common/button/ButtonForTable";

function Profile() {
	const { name, avatar, _id } = useAppSelector( selectLoginData );
	const { currentUserId } = useParams();
	const dispatch = useDispatch();
	const page = useAppSelector( selectPageNumber );
	const pageCount = useAppSelector( selectPageSize );
	useEffect( () => {
		_id &&
		dispatch(
			getPacks( {
				user_id: currentUserId ? currentUserId : _id,
				page,
				pageCount,
			} ),
		);
	}, [currentUserId, page, pageCount] );

	return (
		<div>
			<div className={ s.wrapper }>
				<div className={ s.wrapLeft }>
					<div className={ s.wrapPerson }>
						<img className={ s.img } src={ avatar ? avatar : defaultAva } alt=''/>
						<h3 className={ s.subtitle }>{ name }</h3>
						{ _id === currentUserId ||
						( !currentUserId && (
							<Link to={ '/edit-profile' }>
								<button className={ s.btnEditProfile }>Edit Profile</button>
							</Link>
						) ) }
					</div>
					<div className={ s.wrapSlider }>
						<h3 className={ s.subtitleSlid }>Number of cards</h3>
						<RangeSlider/>
					</div>
				</div>
				<div className={ s.wrapRight }>
					<h2 className={ s.title }>{ `${ name } Packs list` }</h2>
					<div className={ s.wrapForm }>
						<input className={ s.input } type='text' placeholder='Search...'/>
					</div>
					<div className={ s.table }>
						<DenseTable/>
						<div className={ s.wrapBottom }>
							<PaginationSize/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
