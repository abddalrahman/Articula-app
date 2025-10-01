import React from 'react'
import TrustedComp from '../sub_sec_components/TrustedComp'
import IconText from '../components/IconText'
import User_icon from '../assets/images/about-Users.svg'
import Note_icon from '../assets/images/about-Notebook.svg'
import Earth_icon from '../assets/images/about-earth.svg'
import Gear_icon from '../assets/images/about-gear.svg'
import Stack_icon from '../assets/images/about-Stack.svg'

const CompaniesStatistic = () => {
	return (
		<div className='company-statistic'>
			<TrustedComp text_info={{
				head_is:"We Just keep growing with 6.3k Companies",
				body_is:"Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent"
			}}/>
			<div className="main-container">
				<div className='statistics row mx-0 d-flex align-items-center justify-content-between pb-5'>
					<div className="col-6 col-md-3 px-1 col-lg-2 mb-3">
						<IconText info={{
							img:User_icon,
							span1:"67.1k",
							span2:"Students"
						}}/>
					</div>
					<div className="col-6 col-md-3 col-lg-2 mb-3 px-1">
						<IconText info={{
							img:Note_icon,
							span1:"26k",
							span2:"Certified Instructor"
						}}/>
					</div>
					<div className="col-6 col-md-3 col-lg-2 mb-3 px-1">
						<IconText info={{
							img:Earth_icon,
							span1:"72",
							span2:"Country Language"
						}}/>
					</div>
					<div className="col-6 col-md-3 col-lg-2 mb-3 px-1" >
						<IconText info={{
							img:Gear_icon,
							span1:"99.9%",
							span2:"Success Rate"
						}}/>
					</div>
					<div className="col-6 col-md-3 col-lg-2 mb-3 px-1">
						<IconText info={{
							img:Stack_icon,
							span1:"57",
							span2:"Trusted Companies"
						}}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompaniesStatistic
