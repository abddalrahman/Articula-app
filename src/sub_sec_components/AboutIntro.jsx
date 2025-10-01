import React from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import AboutWelcome from '../assets/images/about-welcome.jpg'

const AboutIntro = () => {
	return (
		<div className='about-intro py-5'>
			<div className='main-container py-3'>
				<div className='row mx-0 w-100 justify-content-between align-items-center flex-column-reverse flex-lg-row'>
					<div className='col-12 col-lg-5 px-0'
						data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
					>
						<h2>2011-2025</h2>
						<HeadParaBtn all_content={{
							head_t:"We share knowledge with the world",
							para_t:"Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.",
							important:"h3",
							btns:[]
						}}/>
					</div>
					<div className='col-12 px-0 col-lg-6 position-relative mb-4 mb-lg-0'
						data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
					>
						<img src={AboutWelcome} alt="Welcome" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutIntro
