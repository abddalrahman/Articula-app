import React from 'react'
import MainHead from '../components/MainHead'
import MainBtn from '../components/MainBtn'
import Form_input from '../components/Form_input'

const SendContMessage = () => {
	return (
		<div className='send-cont-message pb-5'>
			<div className="main-container pb-3">	
				<MainHead content="Contact Us"/>
				<div className="send-content d-flex justify-content-between gap-5 flex-wrap">
					<div
						data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
					>
						<p>Will you be in Los Angeles or any other branches any time soon? Stop by the office! We'd love to meet.</p>
						<ul className='px-0'>
							<li className='py-4 d-flex'>
								<h5>Address</h5>
								<p>Excepteur sint occaecat cupidatat non proiden. Excepteur sint occaecat.</p>
							</li>
							<li className='py-4 d-flex'>
								<h5>Phone Number</h5>
								<div className=' d-flex flex-column'>
									<span>(963) 950-0001</span>
									<span>(973) 532-3214</span>
								</div>
							</li>
							<li className='py-4 d-flex'>
								<h5>Email address</h5>
								<div className=' d-flex flex-column'>
									<span>Info@articula.com</span>
									<span>career@articula.com</span>
								</div>
							</li>
						</ul>
					</div>

					<div className='p-4 d-flex flex-column justify-content-between'
						data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
					>
						<div>
							<h4>Get In touch</h4>
							<p className='mb-0'>Feel free contact with us, we love to make new partners & friends</p>
						</div>
						<form>
							<div className='my-4'>
								<div className=' d-flex gap-2 flex-wrap'>
									<Form_input input_info={{
										label:"First Name",
										inp_placeholder:"First name...",
										inp_type:"y",
										inp_classes:"flex-inp"
									}}/>
									<Form_input input_info={{
										label:"Last Name",
										inp_placeholder:"Last name...",
										inp_type:"y",
										inp_classes:"flex-inp"
									}}/>
								</div>
								<Form_input input_info={{
									label:"Email",
									inp_placeholder:"Email Address",
									inp_type:"y",
									inp_classes:''
								}}/>
								<Form_input input_info={{
									label:"Subject",
									inp_placeholder:"Message Subject",
									inp_type:"y",
									inp_classes:''
								}}/>
								<Form_input input_info={{
									label:"Message",
									inp_placeholder:"Message Subject",
									inp_type:"n",
									inp_classes:''
								}}/>
							</div>
							<MainBtn link_info={{
								btn_type:"btn",
								link_classes:"main-btn gap-2",
								link_to:"#",
								content:"Send Message",
								img:"send"
							}}/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SendContMessage
