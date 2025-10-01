import React from 'react'
import IconText from '../components/IconText'
import Star from "../assets/images/star.svg"
import { NavLink } from 'react-router'

const SwiperWriterCard = ({info}) => {
	return (
		<NavLink to={'#'} className='card rounded-0 '>
			<div className="card-image">
				<img src={info.img} alt={info.name} />
			</div>
			<div className="card-text d-flex flex-column align-items-center py-2">
				<span>{info.name}</span>
				<span className='mt-1'>{info.job}</span>
			</div>
			<div className="card-footer d-flex align-items-center justify-content-between rounded-0">
				<IconText info={{
					img:Star,
					span1:info.rate,
					span2:""
				}}/>
				<span>{info.art_num} <span> Articles</span> </span>
			</div>
		</NavLink>
	)
}

export default SwiperWriterCard
