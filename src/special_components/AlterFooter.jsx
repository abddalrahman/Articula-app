import React from 'react'
import { NavLink } from 'react-router'

const AlterFooter = () => {
	return (
		<div className='alter-footer py-3'>
			<div className="main-container d-flex align-items-lg-center justify-content-between flex-column flex-lg-row">
				<span className=' d-inline-block me-2'>
					© 2021 - Eduguard. Designed by 
					<NavLink to={'#'}> Templatecookie </NavLink>
					. All rights reserved
				</span>
				<ul className=' d-flex align-items-center mb-0 px-0 py-3 py-lg-0'>
					<li><NavLink to={'/FAQs'}>FAQs</NavLink></li>
					<li className='mx-3'><NavLink to={'#'}>Privacy Policy</NavLink></li>
					<li><NavLink to={'#'}>Terms & Condition</NavLink></li>
				</ul>
			</div>
		</div>
	)
}

export default AlterFooter
