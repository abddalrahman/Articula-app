import React, { useContext } from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import MainBtn from '../components/MainBtn'
import Gallery_1 from '../assets/images/gallery-1.png'
import Gallery_2 from '../assets/images/gallery-2.png'
import Gallery_3 from '../assets/images/gallery-3.png'
import Gallery_4 from '../assets/images/gallery-4.png'
import Gallery_5 from '../assets/images/gallery-5.png'
import Gallery_6 from '../assets/images/gallery-6.png'
import Gallery_7 from '../assets/images/gallery-7.png'
import { ChangeLangContext } from '../App'

const Gallery = () => {

	const {languageIs} = useContext(ChangeLangContext)

	return (
		<div className='gallery py-5 '>
			<div className='main-container py-3'>
				<div className='row mx-0 w-100 justify-content-between align-items-center flex-column-reverse flex-lg-row'>
					<div className='col-12 col-lg-5 px-0'>
						<span>OUR GALLERY</span>
						<HeadParaBtn all_content={{
							head_t:"We’ve been here almost 15 years",
							para_t:"Fusce lobortis leo augue, sit amet tristique nisi commodo in. Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc libero. Curabitur in urna ligula.  torquent per conubia nostra.",
							important:"h3",
							btns:[]
						}}/>
						<MainBtn link_info={{
							link_classes:"main-btn",
							link_to:"#",
							content:"Join our team",
							icon_classes: languageIs == 'en' ? "fa-solid fa-arrow-right ms-2" : 'fa-solid fa-arrow-left ms-2'
						}}/>
					</div>
					<div className='col-12 gallery-imgs px-0 col-lg-6 position-relative mb-4 mb-lg-0'>
						<div className="row mx-0 align-items-end justify-content-center">
							<div className="col-4 px-1 px-sm-2"
								data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
							>
								<img src={Gallery_1} alt="gallery" />
							</div>
							<div className="col-5 px-1 px-sm-2"
								data-aos="fade-down" data-aos-delay="100" data-aos-duration="500"
							>
								<img src={Gallery_2} alt="gallery" />
							</div>
							<div className="col-2 px-1 px-sm-2"
								data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
							>
								<img src={Gallery_3} alt="gallery" />
							</div>
						</div>
						<div className="row mx-0 align-items-start mt-2 mt-sm-3">
							<div className="col-3 px-1 px-sm-2"
								data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
							>
								<img src={Gallery_4} alt="gallery" />
							</div>
							<div className="col-6 px-1 px-sm-2"
								data-aos="fade-up" data-aos-delay="100" data-aos-duration="500"
							>
								<img src={Gallery_5} alt="gallery" />
							</div>
							<div className="col-3 px-1 px-sm-2 d-flex flex-column"
								data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
							>
								<img src={Gallery_6} alt="gallery" />
								<img className='mt-2 mt-sm-3' src={Gallery_7} alt="gallery" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Gallery
