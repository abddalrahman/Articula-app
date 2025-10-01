import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { ChangeLangContext } from '../App'

const CommonLink = ({link_detailes}) => {
	
	const {languageIs} = useContext(ChangeLangContext)
	
	return (
		<div className="comon-link d-flex align-items-center justify-content-center mt-5 flex-column flex-sm-row">
			<span className="d-flex align-items-center">{link_detailes.text} </span>
			<NavLink className="d-flex align-items-center mx-2 mt-3 mt-sm-0" to={link_detailes.to_}>{link_detailes.to_text}
				<i className={languageIs == 'ar' ? "fa-solid fa-arrow-left mx-2" : "fa-solid fa-arrow-right mx-2"}></i>
			</NavLink>
		</div>
	)
}

export default CommonLink
