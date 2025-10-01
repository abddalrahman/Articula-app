import React from 'react'
import MainHead from '../components/MainHead'
import ForkKnife from '../assets/images/fork-knife.svg'
import ForkKnife2 from '../assets/images/fork-knife-2.svg'
import Card from '../assets/images/CreditCard.svg'
import Hands from '../assets/images/hands-2.svg'
import Sofa from '../assets/images/sofa.svg'
import ColumnsP from '../assets/images/column-pointer.svg'
import Gift from '../assets/images/gift.svg'
import Cup from '../assets/images//cup.svg'
import ImageHeadPara from '../components/ImageHeadPara'

const ParksBenefits = () => {
	return (
		<div className='parke-benefits pb-5'>
			<div className="main-container">
				<MainHead content="Our Perks & Benefits"/>
				<div className='row mx-0'
					data-aos="fade-down" data-aos-delay="100" data-aos-duration="500"
				>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:ForkKnife2,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"gr"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:ColumnsP,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"bl"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:Sofa,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"yl"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:Gift,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"yl"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:Card,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"yl"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:Hands,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"gr"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:Cup,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"bl-gry"
						}}/>
					</div>
					<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
						<ImageHeadPara box_data={{
							img:ForkKnife,
							head:"Healthy Food & Snacks",
							text:"",
							color_info:"bl"
						}}/>
					</div>
				</div>

			</div>
		</div>
	)
}

export default ParksBenefits
