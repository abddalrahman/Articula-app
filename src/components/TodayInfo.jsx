import React from 'react'

const TodayInfo = ({info}) => {
	const handleValue = (for_ele, number)=>{
		let to_return = [];
		if(number > 0){
			to_return = ['fa-solid fa-arrow-up', '+']
		}else if(number < 0){
			to_return = ['fa-solid fa-arrow-down', '-']
		}else{
			to_return = ['fa-solid fa-equals', '+']
		}

		if(for_ele == 'i'){
			return to_return[0]
		}else{
			return to_return[1]
		}
	}

	return (
		<div className='info-box d-flex align-items-center gap-4 mb-3'>
			<span className=' d-flex align-items-center justify-content-center rounded-2'>
				<i className={handleValue('i', info.count)}></i>
			</span>
			<div className=' d-flex flex-column gap-1'>
				<h5 className='mb-0'>{info.title}</h5>
				<span>{handleValue('span', info.count)}{Math.abs(info.count)}</span>
			</div>
		</div>
	)
}

export default TodayInfo
