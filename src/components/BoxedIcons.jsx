import React from 'react'
import { NavLink } from 'react-router'

const BoxedIcons = (props) => {
	return (
		<div className='icon-box '>
			<NavLink to={'#'} className="d-flex align-items-center justify-content-center">
				<i className={props.icon_class}></i>
			</NavLink>
		</div>
	)
}

export default BoxedIcons
