import React from 'react'
import IconText from '../components/IconText'

const FooterTop = () => {
	return (
		<div className='py-5 footer-top'>
			<div className="main-container  py-3 ">
				<div className='row mx-0 justify-content-between'>
					<h2 className='col-12 col-sm-5 px-0'>Start writing with 7.2k users around <span>the world</span>.</h2>
					<div className='main-statistics d-flex px-0 gap-2 col-12 col-sm-6 mt-3 mt-sm-0 mx-0 align-items-center justify-content-between'>
						<IconText info={{
							img:"",
							span1:"6.3k",
							span2:"Online articles"
						}}/>
						<IconText info={{
							img:"",
							span1:"26k",
							span2:"Certified authors"
						}}/>
						<IconText info={{
							img:"",
							span1:"99.9%",
							span2:"Sucess Rate"
						}}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FooterTop
