import React from 'react'

const Confirm = ({c_info}) => {
	const{title, body, deleteFunc} = c_info
	return (
		<div className='my-confirm position-fixed d-flex align-items-center justify-content-center'>
			<div>
				<h3 className='mb-0'>{title}</h3>
				<p className='mb-0'>{body}</p>
				<div className=' d-flex justify-content-between align-items-center'>
					<button className='main-btn' onClick={()=>deleteFunc('y')}>Delete</button>
					<button className='main-btn dark-btn' onClick={()=>deleteFunc('n')}>Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default Confirm
