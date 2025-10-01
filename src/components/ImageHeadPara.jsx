import React from 'react'

const ImageHeadPara = ({box_data}) => {
	const color_is = box_data.color_info ? box_data.color_info : ''
	const is_align = box_data.img_align ? '' : 'align-items-center'
	return (
		<>
			{
				box_data.text !='' 
					?
						<div className={ "boxed-img-title-text d-flex " + color_is +" "+ is_align}>
							<div className={"img-div d-flex justify-content-center " + is_align}>
								<img src={box_data.img} alt={box_data.head}/>
							</div>
							<div className="d-flex flex-column">
								<h5 className="mb-2">{box_data.head}</h5>
								<span>{box_data.text}</span>
							</div>
						</div>
					:
					<div className={ "parks d-flex flex-column p-4 " + color_is}>
						<div className={"img-div d-flex justify-content-center align-items-center"}>
							<img src={box_data.img} alt={box_data.head}/>
						</div>
						<div className="d-flex flex-column">
							<h5 className="mt-4 mb-1">{box_data.head}</h5>
						</div>
					</div>
			}
		</>
	)
}

export default ImageHeadPara
