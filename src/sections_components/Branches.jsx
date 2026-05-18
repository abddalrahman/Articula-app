import React from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import Branche from '../bigComponents/Branche'

const Branches = () => {
	return (
		<div className='branches-content py-5'>
			<div className="main-container py-2">
				<HeadParaBtn all_content={{
					head_t:"Our branches all over the world.",
					para_t:"Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna, imperdiet id leo quis, luctus auctor nisi. ",
					important:"h3",
					btns:[]
				}}/>
				<div className="branches row mx-0 mx-sm-1">
					<div className='col-6 col-sm-6 col-lg-4 col-xl-3 mb-2 mb-sm-3 mb-xl-0 px-1 px-sm-2'>
						<Branche branche_info={{
							img:'/Articula-app/images/branches-1.jpg',
							title:'Damascus, Syria',
							text:'Lorem Ipsum doller Duis aute irure, No. 6548',
							more_info:'mAIN BRANCHE'
						}}/>
					</div>
					<div className='col-6 col-sm-6 col-lg-4 col-xl-3 mb-2 mb-sm-3 mb-xl-0 px-1 px-sm-2'>
						<Branche branche_info={{
							img:'/Articula-app/images/branches-2.jpg',
							title:'Amman, Jordan',
							text:'Lorem Ipsum doller Duis aute irure, No. 6548',
							more_info:'mAIN BRANCHE'
						}}/>
					</div>
					<div className='col-6 col-sm-6 col-lg-4 col-xl-3 mb-2 mb-sm-3 mb-xl-0 px-1 px-sm-2'>
						<Branche branche_info={{
							img:'/Articula-app/images/branches-3.jpg',
							title:'Istanbul, Turkey',
							text:'Lorem Ipsum doller Duis aute irure, No. 6548',
							more_info:'mAIN BRANCHE'
						}}/>
					</div>
					<div className='col-6 col-sm-6 col-lg-4 col-xl-3 mb-2 mb-sm-3 mb-xl-0 px-1 px-sm-2'>
						<Branche branche_info={{
							img:'/Articula-app/images/branches-4.jpg',
							title:'Dubai. UAE',
							text:'Lorem Ipsum doller Duis aute irure, No. 6548',
							more_info:'mAIN BRANCHE'
						}}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Branches
