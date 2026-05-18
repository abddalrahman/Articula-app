import React from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import CommonLink from '../components/CommonLink'
import JobCard from '../bigComponents/JobCard'

const OurJob = () => {
	return (
		<section className="our-job position-relative pb-5">
			<div className="sec-container">
				<div className="our-jon-content p-xxl-5 p-4 pb-3">
					<div className="title d-flex align-items-sm-center justify-content-between mb-3 gap-2 flex-column flex-sm-row">
						<HeadParaBtn all_content={{
							head_t:"Our Job Opprtunities",
							para_t:"Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec varius purus et eleifend porta.",
							important:"h3",
							btns:[]
						}}/>
					</div>
					<div className="jobs gap-3 d-flex flex-wrap">
						<JobCard job_info={{
							main_img:"/images/articles-3.png",
							j_tag:"Featured",
							salary:"300",
							salary_in:"Month",
							head:"System Analysis",
							text:"2 Years of experience",
							level:"Sinor",
							time:"Part Time"
						}}/>
						<JobCard job_info={{
							main_img:"/images/articles-5.png",
							j_tag:"Urgent",
							salary:"400~900",
							salary_in:"Month",
							head:"Frontend Developer (React / Nextjs)",
							text:"+5 Years of experience",
							level:"Sinor",
							time:"Full Time"
						}}/>
						<JobCard job_info={{
							main_img:"/images/articles-2.png",
							j_tag:"Featured",
							salary:"300~500",
							salary_in:"Month",
							head:"UI/UX Designer",
							text:"2 Years of experience",
							level:"Sinor",
							time:"Part Time"
						}}/>
						<JobCard job_info={{
							main_img:"/images/articles-8.png",
							j_tag:"",
							salary:"450",
							salary_in:"Month",
							head:"ASP Backend Developer",
							text:"+3 Years of experience",
							level:"Sinor",
							time:"Full Time"
						}}/>
					</div>
					<CommonLink link_detailes={{
						text:"We have more category & subcategory.",
						to_:"/Jobs",
						to_text:"Browse All"
					}}/>
				</div>
			</div>
		</section>
	)
}

export default OurJob
