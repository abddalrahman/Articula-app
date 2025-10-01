import React from 'react'
import Comment_icon from '../assets/images/comment-icon.svg'
import { NavLink } from 'react-router'

const AnTestimonial = ({info}) => {
	return (
		<div className='testi'>
			<div className=' d-flex flex-column p-4 bl-gry position-relative'>
				<img src={Comment_icon} alt="Comment_icon" />
				<p className='text-center my-3'>{info.text}</p>
				<img className=' align-self-end' src={Comment_icon} alt="Comment_icon" />
			</div>
			<div className=' d-flex flex-column align-items-center pt-5 px-3'>
				<span className='mb-2'>{info.name}</span>
				<span>{info.job}<NavLink to={info.link}>{info.comp}</NavLink></span>
			</div>
		</div>
	)
}

export default AnTestimonial
