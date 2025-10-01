import React, { useEffect } from 'react'

const GraphicalColumns = (props) => {
	const {resetNum, info} = props
	const biger_number = info.reduce((acc, cur)=>{
		return acc > cur.count ? acc : cur.count
	}, 0)

	useEffect(()=>{
		resetNum(biger_number+ biger_number*0.1)
	}, [biger_number, resetNum])
	
	
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const currentMonth = new Date().getMonth();
	return (
		info.map((item, index)=>(
			<div key={index} style={{height:(Number(item.count) * 100)  / Number(biger_number + biger_number*0.1)+ "%"}} className='position-absolute column-ele'>
				<span>{item.count}</span>		
				
				<span>
					{
						item.month == '1'
						?
							monthNames[currentMonth]
						:
							item.month == '2'
							?
								monthNames[currentMonth - 1]
							:
								monthNames[currentMonth - 2]
					}	
				</span>		
			</div>
		))
	)
}

export default GraphicalColumns
