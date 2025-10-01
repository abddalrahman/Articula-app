import React, { useEffect, useRef } from 'react'
import E404 from '../assets/images/404.png'
import HeadParaBtn from '../components/HeadParaBtn'

const ErrorPath = () => {
	function AddLetter(ele, letter, num){
		setTimeout(()=>{
			ele.textContent+=letter
		},50 * num)
	}

	const hasRun = useRef(false);
	useEffect(()=>{
		if (hasRun.current) return;
		hasRun.current = true;

		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
		setTimeout(()=>{
			const animat_span = document.querySelector(".animat-content");
			if(animat_span){
				animat_span.classList.add('show');
				animat_span.textContent=''
				const statment = "I can't find the page.";
				const statArray = statment.split('');
				statArray.map((charecter, index)=>{
					AddLetter(animat_span, charecter, index)
				});
				setTimeout(()=>{
					animat_span.classList.remove('show');
				},2000)
			}
		}, 500)

		setTimeout(()=>{
			const animat_span = document.querySelector(".animat-content2");
			if(animat_span != null){
				animat_span.classList.add('show');
				animat_span.textContent=''
				const statment = 'click on "Go Back" Button.';
				const statArray = statment.split('');
				statArray.map((charecter, index)=>{
					AddLetter(animat_span, charecter, index)
				});
			}
		}, 2500)
	},[])

	function GoBack(){
		window.history.back();
	}

	return (
		<div className='error-show'>
			<div className='main-container py-5'>
				<div className='row mx-0 w-100 justify-content-between align-items-center flex-column-reverse flex-lg-row'>
					<div className='col-12 col-lg-5 px-0'>
						<h2>Error 404</h2>
						<HeadParaBtn all_content={{
							head_t:"Oops! page not found",
							para_t:"Something went wrong. It’s look that your requested could not be found. It's look like the link is broken or the page is removed.",
							important:"h3",
							btns:[
								{
									classes:"main-btn",
									h_ref:"#",
									content:"Go Back",
									event_func:GoBack
								}
							]
						}}/>
					</div>
					<div className='col-12 px-0 col-lg-6 position-relative mb-4 mb-lg-0 '>
						<span className='animat-content'></span>
						<span className='animat-content2'></span>
						<img src={E404} alt="error" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ErrorPath
