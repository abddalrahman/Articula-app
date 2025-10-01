import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import Arrow from '../assets/images/arrow.svg'
import { ChangeLangContext } from '../App'

const LiLinks = ({link_info}) => {

	const {languageIs} = useContext(ChangeLangContext)

	const render_arrow_link = (arrow2)=>{
		if(arrow2){
			return <>
				<span>{link_info.contene}</span>
				<img className= {languageIs == 'ar' ? 'ms-2 to-left' : 'ms-2'} src={Arrow} alt={languageIs == 'ar' ? 'arrow-left' : 'arrow-right'} />
			</>
		}else{
			return link_info.contene
		}
	}
	return (
		<li className={link_info.li_classes}>
			<NavLink className={link_info.a_classes} to={link_info.to_path}>
				{link_info.content_type == "icon" 
				?
					<i className={link_info.content_classes}></i>
				:
					render_arrow_link(link_info.is_arrow_link)
				}
			</NavLink>
		</li>
	)
}

export default LiLinks
