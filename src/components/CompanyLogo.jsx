import React from 'react'
import { NavLink } from 'react-router'

function CompanyLogo({info}) {
	return (
		<NavLink to={'#'} className='comp_trusted d-flex align-items-center justify-content-center'
			data-aos={"fade-" + info.animat} data-aos-delay="100" data-aos-duration="400" 
		>
			<img src={info.img} alt={info.name} />
		</NavLink>
	)
}

export default CompanyLogo
