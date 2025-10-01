import React, { useContext } from 'react'
import HelloContact_img from '../assets/images/contact-main.png'
import "../assets/css/contact.css"
import HeadParaBtn from '../components/HeadParaBtn'
import { ChangeLangContext } from '../App'

const ContactHello = () => {

	const {languageIs} = useContext(ChangeLangContext)

	return (
		<div className='contact-hello'>
			<div className="main-container pt-3">
				<div className="row mx-0 align-items-center contact-hello-content justify-content-between">
					<div className="py-3 px-0 col-12 col-lg-5 text-content"
						data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
					>
						<HeadParaBtn all_content={{
							head_t:"Connect with us",
							para_t:"Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire about speaking events, advertising rates, or just say hello.",
							important:"h2",
							btns:
								localStorage.getItem('login_obj_info') == null && sessionStorage.getItem('login_obj_info') == null
								?
									[
										{
											classes: languageIs == 'ar' ? "main-btn flex-row-reverse" : "main-btn",
											h_ref:"sign_up",
											content:"Create Account",
											icon_is: "Message_icon",
										}
									]
								:
									[]
						}}/>
					</div>
					<div className='col-12 col-lg-6 px-0 align-self-end'
						data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
					>
						<img src={HelloContact_img} alt="Welcome" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactHello
