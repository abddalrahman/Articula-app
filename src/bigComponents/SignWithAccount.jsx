import React, { memo } from 'react'
import Google from '../assets/images/google.svg'
import FaceBook from '../assets/images/facebook.svg'
import Apple from '../assets/images/apple.svg'
import { NavLink } from 'react-router'

const SignWithAccount = memo(({what_sign}) => {
	return (
		<div className='sign-with-account my-4'>
			<span className='mb-4'><h4>{what_sign}</h4></span>
			<div className='d-flex gap-3 flex-wrap'>
				<NavLink to={'#'} className='d-flex'>
					<span className='d-flex align-items-center justify-content-center'><img src={Google} alt="Google" /></span>
					<span className='d-flex align-items-center justify-content-center px-2'>Google</span>
				</NavLink>
				<NavLink to={'#'} className='d-flex'>
					<span className='d-flex align-items-center justify-content-center'><img src={FaceBook} alt="FaceBook" /></span>
					<span className='d-flex align-items-center justify-content-center px-2'>FaceBook</span>
				</NavLink>
				<NavLink to={'#'} className='d-flex'>
					<span className='d-flex align-items-center justify-content-center'><img src={Apple} alt="Apple" /></span>
					<span className='d-flex align-items-center justify-content-center px-2'>Apple</span>
				</NavLink>
			</div>
		</div>
	)
})

export default SignWithAccount
