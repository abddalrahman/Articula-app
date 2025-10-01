import React from 'react'
import JobHello_img from '../assets/images/job_hello.png'
import HeadParaBtn from '../components/HeadParaBtn'

const JobsHello = () => {
	return (
		<div className='job-hello'>
			<div className="main-container pt-3">
				<div className="row mx-0 align-items-center job-hello-content justify-content-between">
					<div className="py-3 px-0 col-12 col-lg-5 text-content"
						data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
					>
						<HeadParaBtn all_content={{
							head_t:"Join the most incredible & creative team.",
							para_t:"Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.",
							important:"h2",
							btns:[
								{
									classes:"main-btn",
									h_ref:"#",
									content:"View Open Positions"
								}
							]
						}}/>
					</div>
					<div className='col-12 col-lg-6 px-0 align-self-end'
						data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
					>
						<img src={JobHello_img} alt="Welcome" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobsHello
