import '../assets/css/navbar.css'
import React from 'react'
import MainNav from '../sub_sec_components/MainNav'
import SecNav from '../sub_sec_components/SecNav'

const Navbar = ({path}) => {
	const isSign = (path == "/SignUp" || path == "/SignIn")? true : false
	const SignForWhat = isSign ? path.replace('/', '') : '';

	
	return (
		<header className='position-sticky'>
			{
				isSign
				?
					''
				:
					<MainNav/>
			}
			<SecNav sign={SignForWhat}/>
		</header>
	)
}

export default Navbar