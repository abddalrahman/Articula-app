import React from 'react'
import AnTestimonial from '../components/AnTestimonial'

const Testimonials = () => {
	return (
		<div className='testimonials py-5'>
			<div className="main-container py-3">
				<div className="row mx-0">
					<div className="col-12 col-lg-4 px-2 px-lg-0 mb-5 mb-lg-0">
						<AnTestimonial info={{
							text:"Eduguard fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.",
							name:"Sundar Pichai",
							job:"Chief Chairman of ",
							comp:"Google",
							link:'#'
						}}/>
					</div>
					<div className="col-12 col-lg-4 px-2 px-lg-3 mb-5 mb-lg-0">
						<AnTestimonial info={{
							text:"Edugaurd responds to the needs of the business in an agile and global manner. It’s truly the best solution for our employees and their careers.",
							name:"Satya Nadella",
							job:"CEO of ",
							comp:"Microsoft",
							link:'#'
						}}/>
					</div>
					<div className="col-12 col-lg-4 px-2 px-lg-0 mb-5 mb-lg-0">
						<AnTestimonial info={{
							text:"In total, it was a big success, I would get emails about what a fantastic resource it was.",
							name:"Ted Sarandos",
							job:"Chief Executive Officer of ",
							comp:"Netflix",
							link:'#'
						}}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Testimonials
