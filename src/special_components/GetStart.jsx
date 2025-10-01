import React, { useEffect, useRef, useState } from 'react'
import Start_1_img from '../assets/images/start-1.jpg'
import Start_2_img from '../assets/images/start-2.jpg'
import Start_3_img from '../assets/images/start-3.jpg'
import Hat_img from '../assets/images/hat-01.png'
import '../assets/css/getStatr.css'

const GetStart = () => {
	const noRerender = useRef(false)

	const [stepIs, setStepIS] = useState(1)
	const [stop, setStop] = useState(false)
	const [showTheComponent, setShowTheComponent] = useState(false)

	const allText = ['Create your account or log in if you already have an account.',
		'After logging in, you can now access articles, your profile, and write your own articles.',
		'You are now a member of the Articula family.'
	]

	useEffect(()=>{
		if(sessionStorage.getItem('show-get-start') == null){
			sessionStorage.setItem('show-get-start', 'show')
			setShowTheComponent(true)
		}else{
			setShowTheComponent(true)
		}
	}, [])

	useEffect(()=>{
		if(showTheComponent){
			if(! noRerender.current){
				setTimeout(()=>{
					const animat_spans = document.querySelectorAll(`.show-text-animat`);
					const animat_span = document.querySelector(`.step-${stepIs}-animat`);
					const main_text = document.querySelector(`.text-step-${stepIs}`);
					animat_spans.forEach((span)=>{
						span.classList.remove('show');
					})
					main_text.classList.remove('d-none')
					setTimeout(()=>{
						main_text.classList.add('show')
					}, 100)
					if(animat_span){
						animat_span.classList.add('show');
						animat_span.textContent=''
						const statment = allText[stepIs - 1];
						const statArray = statment.split('');
						statArray.map((charecter, index)=>{
							AddLetter(animat_span, charecter, index)
						});
					}
				}, 200)
				noRerender.current = true
			}

		}
	}, [stepIs, showTheComponent])
		


	const AddLetter = (ele, letter, num)=>{
		setTimeout(()=>{
			ele.textContent+=letter
		},10 * num)
	}

	const handleCloseGetStart = ()=>{
		localStorage.setItem('close-get-start', 'close')
		document.querySelector('.get-start').classList.add('d-none')
	}

	return (
		<div className={showTheComponent ? 'get-start show' : 'get-start'}>
			<div className='content d-flex gap-5 position-relative flex-column flex-md-row'>
				<span id='close-get-start' className='position-absolute d-flex align-items-center justify-content-center'
					onClick={handleCloseGetStart}
				>
					<i className="fas fa-times"></i>
				</span>
				<div className='images-and-btn d-flex flex-column justify-content-between'>
					<div className='all-images mb-4'>
						<div className={stepIs == 1 ? 'show' : ''}><img src={Start_1_img} alt="SignUp and SignIn" /></div>
						<div className={stepIs == 2 ? 'show' : ''}><img src={Start_2_img} alt="Articles and your Profile" /></div>
						<div className={stepIs == 3 ? 'show' : ''}><img src={Start_3_img} alt="New Member" /><span><span>+</span><span>1</span></span></div>
					</div>
					<div className='go-next d-flex justify-content-between align-items-center'>
						<div className=' d-flex align-items-center gap-2'>
							<span className={stepIs == 1 ? 'active' : ''} 
								onClick={()=>{
									if(!stop){
										noRerender.current = false
										setStepIS(1)
										setStop(true)
										setTimeout(() => {
											setStop(false)
										}, 500);
									}
								}}
							></span>
							<span className={stepIs == 2 ? 'active' : ''} 
								onClick={()=>{
									if(!stop){
										noRerender.current = false
										setStepIS(2)
										setStop(true)
										setTimeout(() => {
											setStop(false)
										}, 500);
									}
								}}
							></span>
							<span className={stepIs == 3 ? 'active' : ''} 
								onClick={()=>{
									if(!stop){
										noRerender.current = false
										setStepIS(3)
										setStop(true)
										setTimeout(() => {
											setStop(false)
										}, 500);
									}
								}}
							></span>
						</div>
						<button className='main-btn' disabled={stepIs == 3}
							onClick={()=>{
								if(!stop){
									setStepIS(stepIs + 1)
									noRerender.current = false
									setStop(true)
									setTimeout(() => {
										setStop(false)
									}, 500);
								}
							}}
						>Next</button>
					</div>
				</div>

				<div className='text-and-animation d-flex flex-column justify-content-between'>
					<div className='all-texts mb-5'>
						{
							stepIs == 1
							?
								<div className='text-step-1 d-none'>
									<span>Welcome to <b>Articula</b></span>
								</div>
							:
								stepIs == 2
								?
									<div className='text-step-2 d-none'>
										<span><b>Access</b> is now available</span>
									</div>
								:	
									<div className='text-step-3 d-none'>
										<span><b>Congratulations</b></span>
									</div>
					}
					</div>

					<div className='animation-text d-flex justify-content-end'>
						<div className='animation-img position-relative'>
							<span className='eyes-1'> <span></span></span>
							<span className='eyes-2'> <span></span></span>
							<span className='mouth'></span>
							<img src={Hat_img} alt="hat" />
							<span className='show-text-animat step-1-animat'></span>
							<span className='show-text-animat step-2-animat'></span>
							<span className='show-text-animat step-3-animat'></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GetStart
