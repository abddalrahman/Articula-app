import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { ChangeLangContext } from '../App'

const FooterFooter = () => {

	const {changeLang, languageIs} = useContext(ChangeLangContext)

	return (
		<div className='py-4 footer-footer'>
			<div className="main-container ">
				<div className='footer-footer-content d-flex align-items-center justify-content-between flex-column-reverse flex-md-row'>
					<span>© 2021 - Eduflex. Designed by <NavLink to={'#'}>Templatecookie</NavLink>. All rights reserved</span>
					<button className='convert-lang-btn py-2 px-3 mb-3 mb-md-0'
						onClick={changeLang}
					>
						{
							languageIs == 'ar'
							?
								'English'
							:
								'Arabic'
						}
							 
					</button>
				</div>
			</div>
		</div>
	)
}

export default FooterFooter
