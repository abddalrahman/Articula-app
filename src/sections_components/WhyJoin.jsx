import React from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import JoinUs_img from '../assets/images/join-us-job.jpg'
import ImageHeadPara from '../components/ImageHeadPara'
import Check_img from '../assets/images/check-sign.svg'

const WhyJoin = () => {
	return (
		<div className='why-join py-5'>
			<div className="main-container py-3">
				<div className="row mx-0 align-items-start justify-content-between">
					<div className='col-12 col-lg-6 px-0 position-relative divided-img order-2 order-lg-1'
						data-aos="fade-up" data-aos-delay="100" data-aos-duration="500"
					>
						<img src={JoinUs_img} alt="join_us" />
						<span className='position-absolute'></span>
						<span className='position-absolute'></span>
					</div>
					<div className="py-3 px-0 col-12 col-lg-5 text-content order-1 order-lg-2 mb-4 mb-lg-0"
						data-aos="fade-down" data-aos-delay="100" data-aos-duration="500"
					>
						<HeadParaBtn all_content={{
							head_t:"Why you will join our team",
							para_t:"Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. ",
							important:"h3",
							btns:[]
						}}/>

						<div className='mt-4 d-flex flex-column'>
							<ImageHeadPara box_data={{
								img:Check_img,
								head:"Ut justo ligula, vehicula sed egestas vel.",
								text:"Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. ",
								color_info:"fff",
								img_align:'n'
							}}/>
							<ImageHeadPara box_data={{
								img:Check_img,
								head:"Ut justo ligula, vehicula sed egestas vel.",
								text:"Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. ",
								color_info:"fff",
								img_align:'n'
							}}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WhyJoin
