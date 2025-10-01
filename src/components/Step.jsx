import React from 'react'

const Step = ({info}) => {
	return (
		<div className='step d-flex align-items-center'>
			<span className={info.color_info}>{info.num}</span>
			<span>{info.text}</span>
		</div>
	)
}

export default Step
