import React from 'react';
import s from './PackList.module.scss';
import RangeSlider from '../../mui/range-slider/RangeSlider';
import DenseTable from '../../mui/table/Table';
import PaginationSize from '../../mui/pagination/Pagination';

// import ButtonForTable from "./../../../Components/common/button/ButtonForTable";

function PackList() {
	return (
		<div>
			<div className={ s.wrapper }>
				<div className={ s.wrapLeft }>
					<h3 className={ s.subtitle }>Show packs cards</h3>
					<div className={ s.wrapBtn }>
						<button className={ s.buttonLeft }>My</button>
						<button className={ s.buttonRight }>All</button>
					</div>
					<h3 className={ s.subtitleSlid }>Number of cards</h3>
					<RangeSlider/>
				</div>
				<div className={ s.wrapRight }>
					<h2 className={ s.title }>Packs list</h2>
					<div className={ s.wrapForm }>
						<input className={ s.input } type="text" placeholder="Search..."/>
						<button className={ s.button }>Add new pack</button>
					</div>
					<div className={ s.table }>
						<DenseTable/>
						<PaginationSize/>
					</div>
				</div>
			</div>
			{/*<DeletePack/>*/ }
			{/*<AddNewPack/>*/ }
		</div>
	);
}

export default PackList;
