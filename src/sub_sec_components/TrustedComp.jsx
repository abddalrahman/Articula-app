import React from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import CompanyLogo from '../components/CompanyLogo'

const TrustedComp = ({text_info}) => {
	return (
		<section className='trusted-comp py-5'>
			<div className="main-container">
				<div className="trusted-comp-content row align-items-center justify-content-between mx-0">
					<div className='col-12 col-lg-4 ps-0 mb-3 mb-lg-0'>
						<HeadParaBtn all_content={{
							head_t: text_info.head_is,
							para_t: text_info.body_is,
							important:"h3",
							btns:[]
						}}/>
					</div>
					<div className='col-12 col-lg-8 col-xl-7 px-0 d-flex gap-2 gap-xxl-3 flex-wrap justify-content-start justify-content-lg-end'>
						<CompanyLogo info={{img:"/images/comp-1.png", name:"company name", animat:"up"}}/>
						<CompanyLogo info={{img:"/images/comp-2.png", name:"company name", animat:"down"}}/>
						<CompanyLogo info={{img:"/images/comp-3.png", name:"company name", animat:"left"}}/>
						<CompanyLogo info={{img:"/images/comp-4.png", name:"company name", animat:"right"}}/>
						<CompanyLogo info={{img:"/images/comp-5.png", name:"company name", animat:"left"}}/>
						<CompanyLogo info={{img:"/images/comp-6.png", name:"company name", animat:"down"}}/>
						<CompanyLogo info={{img:"/images/comp-7.png", name:"company name", animat:"up"}}/>
						<CompanyLogo info={{img:"/images/comp-8.png", name:"company name", animat:"right"}}/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TrustedComp
