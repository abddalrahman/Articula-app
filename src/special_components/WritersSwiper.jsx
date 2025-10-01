import React, {useContext, useEffect, useState } from 'react'
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperWriterCard from '../bigComponents/SwiperWriterCard';
import { Spinner } from 'react-bootstrap';
import { ChangeLangContext } from '../App';

const WritersSwiper = () => {
	const {languageIs} = useContext(ChangeLangContext)

	const jobs = ['Finance Expert', 'Digital Product', 'UI/UX Designer', 'Managment', 'Lead Developer']
	const [getWriters, setGetWriters] = useState({
		error: "",
		writers: []
	})

	useEffect(()=>{
		fetch('https://tamkeen-dev.com/api/testimonials', {
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
					setGetWriters({
						error: 'Something Went Wrong!!', 
						writers: [],
					});
				});
			}
			return res.json();
		})
		.then((data)=>{
			// console.log(data)
			setGetWriters({
				error: '',
				writers: data
			})
		})
		.catch(err => {
			console.log(err.message)
			setGetWriters({
				error: 'Something Went Wrong!!', 
				writers: [],
			});
		})
	}, [])

	return (
		getWriters.error ==''
		?
			getWriters.writers.length > 0
			?
				<Swiper
					modules={[Navigation, A11y]}
					spaceBetween={35}
					slidesPerView={5}
					navigation
					dir={languageIs == 'ar' ? 'rtl' : 'ltr'}
  				key={languageIs} // key to make swiper rebuild itself --> when key change
					breakpoints={{
						0: {
							slidesPerView: 1,
						},
						650: {
							slidesPerView: 2,
						},
						991: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 4,
						},
						1460: {
							slidesPerView: 5,
						}
					}}
				>
					{
						getWriters.writers.map((writer, index)=>(
							<SwiperSlide key={index} ><SwiperWriterCard info={{
								img:"https://tamkeen-dev.com"+ writer.image,
								name:writer.full_name,
								job:jobs[Math.floor(Math.random() * 5)],
								rate:writer.rating,
								art_num:(Math.floor(Math.random() * 39)) + 7,
							}}/> </SwiperSlide>
						))
					}
				</Swiper>
			:
				<div className='d-flex align-items-center justify-content-center my-5 py-5'>
					<Spinner className='spinner' animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
		:
			<div className='alert alert-danger'>
				{getWriters.error}
			</div>
	)
}

export default WritersSwiper