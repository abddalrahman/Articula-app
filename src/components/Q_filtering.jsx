import React from 'react'
import { NavLink } from 'react-router'

const Q_filtering = ({filters, func}) => {
	return (
		<ul className='w-100 px-2 px-md-0 mb-0 py-md-2 py-0 d-flex d-md-block align-items-center'
			data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
		>
			<li className='w-100 p-3 active-filter' data-id="-1"
				onClick={(e)=>func(e)}
			>
				All Categories
			</li>
			{
				filters.map((filter, index)=>(
					<li key={index} className='w-100 p-3' data-id={filter.id}
						onClick={(e)=>func(e)}
					>
						{filter.name}
					</li>
				))
			}
		</ul>
	)
}

export default Q_filtering
