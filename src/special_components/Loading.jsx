import React from 'react'
import '../assets/css/main-loading.css'
import MainLogo from '../assets/images/main-icon-2.png'

const Loading = () => {
	return (
		<div dir='ltr' className='main-loading'>
			<div>
				<img src={MainLogo} alt="" />
				<span>
					Articula
				</span>
			</div>
			<div className="loading-points py-5 mt-5">
        <div className="point1"></div>
        <div className="point2"></div>
        <div className="point3"></div>
    	</div>
		</div>
	)
}

export default Loading
