import React from 'react'
import OurMissionImage from '../assets/images/about-mission.png'
import HeadParaBtn from '../components/HeadParaBtn'

const OurMission = () => {
	return (
		<div className='our-mission l-or'>
			<div className='main-container'>
				<div className='row mx-0 w-100 justify-content-between align-items-center flex-column-reverse flex-lg-row'>
					<div className='col-12 px-0 col-lg-6 position-relative  align-self-end mt-auto'>
						<img src={OurMissionImage} alt="our mission" />
					</div>
					<div className='col-12 col-lg-5 px-0 py-3 mb-4 mb-lg-0'>
						<span>OUR ONE BILLION MISSION</span>
						<HeadParaBtn all_content={{
							head_t:"Our one billion mission sounds bold, We agree.",
							para_t:`"We cannot solve our problems with the same thinking we used when we created them."—Albert Einstein. Institutions are slow to change. Committees are where good ideas and innovative thinking go to die. Choose agility over dogma. Embrace and drive change. We need to wipe the slate clean and begin with bold, radical thinking.`,
							important:"h3",
							btns:[]
						}}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OurMission
