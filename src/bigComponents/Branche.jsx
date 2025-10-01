import React from 'react'

const Branche = ({branche_info}) => {
	return (
		<div className='branche position-relative'>
			<img src={branche_info.img} alt={branche_info.title} />
			<div className='d-flex align-items-center flex-column'
				data-aos="zoom-in" data-aos-delay="100" data-aos-duration="500"
			>
				{
					branche_info.more_info
					?
						<span>{branche_info.more_info}</span>
					:
					''
				}
				<h4>{branche_info.title}</h4>
				<p className='text-center'>{branche_info.text}</p>
			</div>
		</div>
	)
}

export default Branche
