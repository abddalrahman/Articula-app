import React from 'react'
import { NavLink } from 'react-router'
import J_time from '../assets/images/job-v-1.svg'
import J_level from '../assets/images/job-v-2.svg'
import Watch from '../assets/images/job-v-3.svg'
import IconText from '../components/IconText'

const JobCard = ({job_info}) => {
	return (
		<NavLink to={'#'} className="job d-flex flex-column flex-sm-row">
			<div>
				<img src={job_info.main_img} alt={job_info.head}/>
			</div>
			<div className="py-3 d-flex flex-column justify-content-between">
				<div className="d-flex px-4 align-items-center justify-content-between">
					<span className={job_info.j_tag !=""? "light-link" : ""}>{job_info.j_tag}</span>
					<div className="price d-flex align-items-center">
						<span>${job_info.salary}</span><span>/{job_info.salary_in}</span>
					</div>
				</div>
				<div className="px-4 job-title py-2">
					<h5>{job_info.head}</h5>
					<span>{job_info.text}</span>
				</div>
				<div className="d-flex px-4 job-time align-items-center pt-3 justify-content-between">
					<IconText info={{
						img:J_time,
						span1:job_info.time,
						span2:""
					}}/>
					<IconText info={{
						img:J_level,
						span1:job_info.level,
						span2:""
					}}/>
					<IconText info={{
						img:Watch,
						span1:"Fulls Time",
						span2:""
					}}/>
				</div>
			</div>
		</NavLink>
	)
}

export default JobCard
