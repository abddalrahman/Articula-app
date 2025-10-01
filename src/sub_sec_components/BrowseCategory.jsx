import React, { useEffect, useState } from 'react'
import MainHead from '../components/MainHead'
import ImageHeadPara from '../components/ImageHeadPara'
import Cpu from '../assets/images/Cpu.svg'
import Bug from '../assets/images/BugDroid.svg'
import Cam from '../assets/images/Camera.svg'
import BarsHoriz from '../assets/images/ChartBarHorizontal.svg'
import C_Card from '../assets/images/CreditCard.svg'
import Hand from '../assets/images/Handshake.svg'
import Microphone from '../assets/images/MegaphoneSimple.svg'
import Receipt from '../assets/images/Receipt.svg'
import { NavLink } from 'react-router'
import CommonLink from '../components/CommonLink'
import { Spinner } from 'react-bootstrap'

const BrowseCategory = () => {

	const imagesArray = [Cpu, Cam, BarsHoriz, C_Card, Hand, Microphone, Receipt]
	const colorArray = ['bl-gry', 'bl', 'bl-gry', 'pi', 'yl', 'gr', 'bl']

	const [catIds, setCatIds] = useState({
		error: "",
		cats: [],
		loading: false
	})
	const [faqIds, setFaqIds] = useState({
		error: "",
		faqs: [],
		loading: false
	})

	useEffect(()=>{
		setCatIds({
			...catIds,
			loading: true
		})
		setFaqIds({
			...faqIds,
			loading: true
		})
		fetch('https://tamkeen-dev.com/api/terms/category', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setCatIds({
						error: 'Something Went Wrong!!',
						cats: [],
						loading: false
					});
				});
			}
			return res.json();
		})
		.then((data)=>{
			setCatIds({
				error: "",
				cats: data,
				loading: false
			});
		})
		.catch(err => {
			console.log(err.message)
			setCatIds({
				error: 'Soemthing Went Wrong!!',
				cats: [],
				loading: false
			});
		})
		// .finally(()=>{
		// })
	
		// get faqs categoris
		fetch('https://tamkeen-dev.com/api/terms/faq-category', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setFaqIds({
						error: 'Soemthing Went Wrong!!',
						faqs: [],
						loading: false
					});
				});
			}
			return res.json();
		})
		.then((data)=>{
			setFaqIds({
				error: '',
				faqs: data,
				loading: false
			});
		})
		.catch(err => {
			console.log(err.message)
			setFaqIds({
				error: 'Soemthing Went Wrong!!',
				faqs: [],
				loading: false
			});
		})
		// .finally(()=>{
		// })
	}, [])
	
	return (
		<section className="top-category pb-5">
			<div className="main-container">
				<MainHead content="Browse top category"/>
				<div className="categories row mb-5">
					{
						catIds.error == "" && faqIds.error ==''
						?
							<>
								{
									catIds.loading
									?
										<div className='d-flex align-items-center justify-content-center my-5 py-5'>
											<Spinner className='spinner' animation="border" role="status">
												<span className="visually-hidden">Loading...</span>
											</Spinner>
										</div>
									:
										catIds.cats.length > 0
										?
											<>
												{
													catIds.cats.map((cat)=>(
														<NavLink key={cat.id} to={"/Category?id="+ cat.id} className=" col-12 col-sm-6 col-md-4 col-xl-3"
															data-aos="fade-right" data-aos-delay="100" data-aos-duration="600"
														>
															<ImageHeadPara box_data={{
																img: imagesArray[Math.floor(Math.random()*7)],
																head: cat.name,
																text: (Math.floor(Math.random()* 60000 + 999)).toString() + " Courses",
																color_info: colorArray[Math.floor(Math.random()*7)]
															}}/>
														</NavLink>
													))
												}										
											</>
										:
											<div className='alert alert-info'>
												There is no Categories to display
											</div>
								}
								
								{
									faqIds.loading
									?
										<div className='d-flex align-items-center justify-content-center my-5 py-5'>
											<Spinner className='spinner' animation="border" role="status">
												<span className="visually-hidden">Loading...</span>
											</Spinner>
										</div>
									:
										faqIds.faqs.length > 0
										?
											<>
												{
													faqIds.faqs.map((fCat)=>(
														<NavLink key={fCat.id} to={"/FAQs?id="+ fCat.id} className="col-12 col-sm-6 col-md-4 col-xl-3"
															data-aos="fade-left" data-aos-delay="100" data-aos-duration="600"
														>
															<ImageHeadPara box_data={{
																img: imagesArray[Math.floor(Math.random()*7)],
																head: fCat.name,
																text: (Math.floor(Math.random()* 600 + 19)).toString() + " Questions",
																color_info: colorArray[Math.floor(Math.random()*7)]
															}}/>
														</NavLink>
													))
												}			
											</>
										:
											<div className='alert alert-info'>
												There is no FAQs categories to display
											</div>
								}
							</>
						:
							<div className='alert alert-danger'>
								{catIds.error !='' ? catIds.error : faqIds.error}
							</div>
					}
				</div>
				<CommonLink link_detailes={{
					text:"We have more category & subcategory.",
					to_:"/Articles",
					to_text:"Browse All"
				}}/>
			</div>
		</section>
	)
}

export default BrowseCategory


