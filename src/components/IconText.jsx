import React from 'react'

const IconText = ({info}) => {
	return (
		<div className={info.span2 !="" ? "d-flex" : "d-flex align-items-center"}>
			{info.img !="" ? <img src={info.img} alt={info.span1}/>:""}
			{
				info.span2 !=""
				?
					<div className={info.img !="" ? "ms-2 d-flex justify-content-between flex-column" : "d-flex justify-content-between flex-column"}>
						<span>{info.span1}</span>
						<span>{info.span2}</span>
					</div>
				:
					<div className='ms-2'>
						<span>{info.span1}</span>
					</div>
			}
		</div>
	)
}

export default IconText
