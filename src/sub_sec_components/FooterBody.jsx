import React from 'react'
import Logo_2 from '../assets/images/logo-2.png'
import Arrow from '../assets/images/arrow.svg'
import BoxedIcons from '../components/BoxedIcons'
import LiLinks from '../components/LiLinks'
import PlayStore from '../assets/images/app-1.png'
import AppStore from '../assets/images/app-2.png'
import { NavLink } from 'react-router'

const FooterBody = () => {
	return (
		<div className='py-5 footer-body'>
			<div className="main-container py-3">
				<div className="footer-body-content d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-sm-start">
					<div className=' mb-5 mb-lg-0 '>
						<img src={Logo_2} alt="main-logo" />
						<p className='py-2'>Aliquam rhoncus ligula est, non pulvinar elit
						convallis nec. Donec mattis odio at.</p>
						<div className=' d-flex align-items-center gap-2'>
							<BoxedIcons icon_class="fa-brands fa-facebook-f"/>
							<BoxedIcons icon_class="fa-brands fa-instagram"/>
							<BoxedIcons icon_class="fa-brands fa-linkedin-in"/>
							<BoxedIcons icon_class="fa-brands fa-twitter"/>
							<BoxedIcons icon_class="fa-brands fa-youtube"/>
						</div>
					</div>
					<div className='d-flex main-footer-links justify-content-between flex-column flex-sm-row  flex-wrap'>
						<div>
							<h4 className='mb-3'>Top 4 Category</h4>
							<ul className='px-0'>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Development",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Finance & Accounting",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Design",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Business",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
							</ul>
						</div>
						
						<div>
							<h4 className='mb-3'>Quick Links</h4>
							<ul className='px-0'>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/About",
									contene:"About",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/My_Articles",
									contene:"Become an author",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/Contact",
									contene:"Contact",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"",
									a_classes:"d-inline-block pb-1",
									to_path:"#",
									contene:"Career",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
							</ul>
						</div>

						<div>
							<h4 className='mb-3'>Support</h4>
							<ul className='px-0'>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Help Center",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/FAQs",
									contene:"FAQs",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"mb-2",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Terms & Condition",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
								<LiLinks link_info={{
									li_classes:"",
									a_classes:"d-inline-block pb-1",
									to_path:"/",
									contene:"Privacy Policy",
									content_type:"text",
									content_classes:"",
									is_arrow_link:"y"
								}}/>
							</ul>
						</div>

						<div className=' d-flex flex-column'>
							<h4>Downlaod our app</h4>
							<NavLink to={'#'}>
								<img className='my-3' src={AppStore} alt="App Store" />
							</NavLink>
							<NavLink to={'#'}>	
								<img src={PlayStore} alt="play Store" />
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FooterBody
