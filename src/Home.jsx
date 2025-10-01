import React, { useContext, useEffect, useState } from 'react'
import "./assets/css/home.css"
import Hello from './sub_sec_components/Hello'
import BrowseCategory from './sub_sec_components/BrowseCategory'
import LatestArticles from './sections_components/LatestArticles'
import OurJob from './sections_components/OurJob'
import BeAuthor from './sub_sec_components/BeAuthor'
import Loading from './special_components/Loading'
import TopWriters from './sections_components/TopWriters'
import TrustedComp from './sub_sec_components/TrustedComp'
import GetStart from './special_components/GetStart'
import { ChangeLangContext } from './App'

const Home = () => {

	const [showGetStart, setShowGetStart]= useState({
		firstAnimationEnd: false,
		showComp: false
	})

	const {loginData} = useContext(ChangeLangContext)

	useEffect(() => {
		if (sessionStorage.getItem('main_loading') == null) {
			const loading_dom = document.querySelector('.main-loading');
			if (loading_dom){
				loading_dom.classList.add('active')
				setTimeout(()=>{
					loading_dom.classList.remove('active')
					document.querySelector(".home-page-content").classList.add('show');
					document.querySelector("header").classList.add('show');
					document.querySelector("footer").classList.add('show');
					sessionStorage.setItem('main_loading', 'appeared')
					setTimeout(()=>{
						loading_dom.innerHTML='';
						loading_dom.classList.add('down')
						setShowGetStart({
							...showGetStart,
							firstAnimationEnd: true
						})
					},100);
				}, 5500)
			}
		}else{
			document.querySelector(".home-page-content").classList.add('show');
			document.querySelector("header").classList.add('show');
			document.querySelector("footer").classList.add('show');
			setShowGetStart({
				...showGetStart,
				firstAnimationEnd: true
			})
		}
	}, []);

	useEffect(()=>{
		if(!loginData && showGetStart.firstAnimationEnd && localStorage.getItem('close-get-start')==null){
			setTimeout(()=>{
				setShowGetStart({
					...showGetStart,
					showComp:true
				})
			}, 1000)
		}
	}, [showGetStart.firstAnimationEnd])


	return (
		<>
			{
				sessionStorage.getItem('main_loading') == null
				?
					<Loading/>
				:
					''
			}
			{
				showGetStart.showComp && <GetStart/>
			}
			<div className='home-page-content'>
				<Hello/>	
				<BrowseCategory/>
				<LatestArticles/>
				<OurJob/>
				<BeAuthor/>
				<TopWriters/>
				<TrustedComp text_info={{
					head_is:"6.3k trusted companies",
					body_is:"Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
				}}/>
			</div>
		</>
	)
}

export default Home
