import React from 'react'
import FooterTop from '../sub_sec_components/FooterTop'
import FooterBody from '../sub_sec_components/FooterBody'
import FooterFooter from '../sub_sec_components/FooterFooter'
import AlterFooter from '../special_components/AlterFooter'

const Footer = ({path}) => {
	const some_paths = ["/About", "/Contact", "/Jobs", "/FAQs","/Articles" , "/Dashboard", "/Dashboard/UsersList", "/Dashboard/ArticlesList", "/Category", "/Tags"];
	const currect_path = (some_paths.includes(path)) || path.startsWith('/Details/') ? true : false
	const isSign = (path == "/SignUp" || path == "/SignIn")? true : false
	return (
		<footer className='footer'>
		{
			path == '/'
			?
				<>
					<FooterTop/>
					<FooterBody/>
					<FooterFooter/>
				</>
			:
				currect_path
				?		
					<>
						<FooterBody/>
						<FooterFooter/>
					</>
				:
					!isSign
					?
						<AlterFooter/>
					:
						""
		}
		</footer>
	)
}

export default Footer
