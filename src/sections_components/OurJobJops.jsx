import React from 'react'
import JobCard from '../bigComponents/JobCard'
import MainHead from '../components/MainHead'

const OurJobJops = () => {
	return (
		<div>
			<section className="our-job-jobs py-5">
				<div className="main-container pb-5">
					<MainHead content="Our all open positions (04)"/>
					<div className="jobs gap-3 d-flex flex-wrap pb-5">
						<JobCard job_info={{
							main_img:"../images/articles-3.png",
							j_tag:"Featured",
							salary:"300",
							salary_in:"Month",
							head:"System Analysis",
							text:"2 Years of experience",
							level:"Sinor",
							time:"Part Time"
						}}/>
						<JobCard job_info={{
							main_img:"../images/articles-5.png",
							j_tag:"Urgent",
							salary:"400~900",
							salary_in:"Month",
							head:"Frontend Developer (React / Nextjs)",
							text:"+5 Years of experience",
							level:"Sinor",
							time:"Full Time"
						}}/>
						<JobCard job_info={{
							main_img:"../images/articles-2.png",
							j_tag:"Featured",
							salary:"300~500",
							salary_in:"Month",
							head:"UI/UX Designer",
							text:"2 Years of experience",
							level:"Sinor",
							time:"Part Time"
						}}/>
						<JobCard job_info={{
							main_img:"../images/articles-8.png",
							j_tag:"",
							salary:"450",
							salary_in:"Month",
							head:"ASP Backend Developer",
							text:"+3 Years of experience",
							level:"Sinor",
							time:"Full Time"
						}}/>
					</div>
				</div>
			</section>
		</div>
	)
}

export default OurJobJops
