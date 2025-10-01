import React, { useEffect } from 'react'
import './assets/css/jobs.css'
import JobsHello from './sub_sec_components/JobsHello'
import ShowPath from './sub_sec_components/ShowPath'
import WhyJoin from './sections_components/WhyJoin'
import ParksBenefits from './sub_sec_components/ParksBenefits'
import OurJob from './sections_components/OurJob'
import OurJobJops from './sections_components/OurJobJops'

const Jobs = () => {
	useEffect(()=>{
		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
	},[])
	return (
		<>
			<ShowPath path_info={{
				current:"Jobs",
				path_series:[
					{
						page:"Home",
						pageLink:"/"
					},
					{
						page:"Jobs",
						pageLink:"/Jobs"
					}
				]
			}}/>
			<JobsHello/>
			<WhyJoin/>
			<ParksBenefits/>
			<OurJobJops/>
		</>
	)
}

export default Jobs
