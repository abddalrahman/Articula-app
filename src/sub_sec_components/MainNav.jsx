import React, { useContext, useEffect, useRef } from 'react'
import LiLinks from '../components/LiLinks'
import MainBtn from '../components/MainBtn'
import { ChangeLangContext } from '../App'

const MainNav = () => {

	const noRerender = useRef(false)

	const {color, changeColor} = useContext(ChangeLangContext)
	
	useEffect(()=>{
		document.querySelector('.main-nav aside.nav-aside') ? document.querySelector('.main-nav aside.nav-aside').classList.remove('open'):''
		// close aside when change path by click on link
		const main_nav_links = document.querySelectorAll('aside ul.main-links-ul li a')
		if(main_nav_links.length > 0 && !noRerender.current){
			main_nav_links.forEach((link_btn)=>{
				link_btn.addEventListener('click', function(){
					document.querySelector('.main-nav aside.nav-aside').classList.remove('open')
				})
			})
			noRerender.current = true
		}

		// check color mode
		const colorMode = localStorage.getItem('color-mode')
		if(colorMode){
			if(colorMode == 'light'){
				document.querySelector('.color-mode i:first-of-type').classList.add('active')
				document.querySelector('.color-mode i:last-of-type').classList.remove('active')
			}else{
				document.querySelector('.color-mode i:first-of-type').classList.remove('active')
				document.querySelector('.color-mode i:last-of-type').classList.add('active')
			}
		}
	})
	
	const handleOpenCloseNavAside = (todo)=>{
		const aside = document.querySelector('.main-nav aside.nav-aside')
		todo == 'open'
		?
			aside.classList.add('open')
		:
			aside.classList.remove('open')
	}

	const changeColorMode = (e)=>{
		const color_mode = e.target.getAttribute('data-mode')
		if(color_mode == 'light'){
			document.documentElement.classList.remove('dark-mode')
			localStorage.setItem('color-mode', 'light')
			changeColor('light')
		}else{
			document.documentElement.classList.add('dark-mode')
			localStorage.setItem('color-mode', 'dark')
			changeColor('dark')
		}
	}

	return (
		<nav className="main-nav">
			<aside className='position-fixed nav-aside d-md-none p-4  overflow-auto'>
				<span className=' d-flex align-items-center justify-content-center close-aside ms-auto' onClick={()=> handleOpenCloseNavAside('close')}>
					<i className="fa fa-close"></i>
				</span>
				<ul className='px-0 mb-0 main-links-ul'>
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"py-3 d-block",
						to_path:"/",
						contene:"Home"
					}}/>
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"py-3 d-block",
						to_path:"/Articles",
						contene:"Articles"
					}}/>
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"py-3 d-block",
						to_path:"/Jobs",
						contene:"Vacancies"
					}}/>
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"py-3 d-block",
						to_path:"/About",
						contene:"About"
					}}/>
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"py-3 d-block",
						to_path:"/Contact",
						contene:"Contact"
					}}/>
					{
						localStorage.getItem('login_obj_info')==null && sessionStorage.getItem('login_obj_info') ==null
						?
							''
						:
							<LiLinks link_info={{
								li_classes:"",
								a_classes:"py-3 d-block",
								to_path:"/Dashboard",
								contene:"Dashboard"
							}}/>
					}
				</ul>
				{
					localStorage.getItem('login_obj_info')==null && sessionStorage.getItem('login_obj_info') ==null
					?
						<>
							<MainBtn link_info={{link_classes:"main-btn mt-5 w-100", link_to:"/SignUp", content:"Create Account"}}/>
							<MainBtn link_info={{link_classes:"main-btn mt-3 w-100", link_to:"/SignIn", content:"Sign In"}}/>
						</>	
					:
						<>
							<MainBtn link_info={{link_classes:"main-btn mt-5 w-100", link_to:"/Profile", content:"My Account"}}/>
							<MainBtn link_info={{link_classes:"main-btn mt-3 w-100", link_to:"/My_Articles", content:"My Articles"}}/>
						</>	
				}


				<ul className="d-flex align-items-center mb-0 px-0 social-icons justify-content-around mt-4">
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"",
						to_path:"#",
						contene:"",
						content_type:"icon",
						content_classes:"fa-brands fa-facebook-f"
					}}/>
					<LiLinks link_info={{
						li_classes:"mx-3",
						a_classes:"",
						to_path:"#",
						contene:"",
						content_type:"icon",
						content_classes:"fa-brands fa-instagram"
					}}/>
					<LiLinks link_info={{
						li_classes:"",
						a_classes:"",
						to_path:"#",
						contene:"",
						content_type:"icon",
						content_classes:"fa-brands fa-linkedin-in"
					}}/>
					<LiLinks link_info={{
						li_classes:"mx-3",
						a_classes:"",
						to_path:"#",
						contene:"",
						content_type:"icon",
						content_classes:"fa-brands fa-twitter"
					}}/>
				</ul>
			</aside>

      <div className="nav-container overflow-hidden ">
				<div className='d-flex align-items-center justify-content-between gap-4'>
					<i className="fa-solid fa-bars d-md-none my-3 menu-icon" onClick={()=>handleOpenCloseNavAside('open')}></i>
					<ul className="d-none d-md-flex align-items-center mb-0 px-0 main-nav-links">
						<LiLinks link_info={{
							li_classes:"",
							a_classes:"py-3 px-2 d-inline-block",
							to_path:"/",
							contene:"Home",
							content_type:"text",
							content_classes:""
						}}/>
						<LiLinks link_info={{
							li_classes:"",
							a_classes:"py-3 mx-2 px-2 d-inline-block",
							to_path:"/Articles",
							contene:"Articles",
							content_type:"text",
							content_classes:""
						}}/>
						<LiLinks link_info={{
							li_classes:"",
							a_classes:"py-3 px-2 d-inline-block",
							to_path:"/Jobs",
							contene:"Vacancies",
							content_type:"text",
							content_classes:""
						}}/>
						<LiLinks link_info={{
							li_classes:"",
							a_classes:"py-3 mx-2 px-2 d-inline-block",
							to_path:"/About",
							contene:"About Us",
							content_type:"text",
							content_classes:""
						}}/>
						<LiLinks link_info={{
							li_classes:"",
							a_classes:"py-3 px-2 d-inline-block",
							to_path:"/Contact",
							contene:"Contact",
							content_type:"text",
							content_classes:""
						}}/>
						{
							localStorage.getItem('login_obj_info')==null && sessionStorage.getItem('login_obj_info') ==null
							?
								''
							:
								<LiLinks link_info={{
									li_classes:"",
									a_classes:"py-3 px-2 d-inline-block",
									to_path:"/Dashboard",
									contene:"Dashboard",
									content_type:"text",
									content_classes:""
								}}/>
						}
					</ul>
					<div className=' d-flex align-items-center gap-4 gap-lg-5'>
						<div className='color-mode'>
							{
								color == 'dark'
								?
									<i data-mode="light" className="fa-solid fa-sun"
										onClick={(e)=>changeColorMode(e)}
									></i>
								:
									<i data-mode="dark" className="fa-solid fa-moon"
										onClick={(e)=>changeColorMode(e)}
									></i>
							}
						</div>
						<ul className="d-none d-md-flex align-items-center mb-0 px-0 social-icons">
							<LiLinks link_info={{
								li_classes:"",
								a_classes:"",
								to_path:"#",
								contene:"",
								content_type:"icon",
								content_classes:"fa-brands fa-facebook-f"
							}}/>
							<LiLinks link_info={{
								li_classes:"mx-3",
								a_classes:"",
								to_path:"#",
								contene:"",
								content_type:"icon",
								content_classes:"fa-brands fa-instagram"
							}}/>
							<LiLinks link_info={{
								li_classes:"",
								a_classes:"",
								to_path:"#",
								contene:"",
								content_type:"icon",
								content_classes:"fa-brands fa-linkedin-in"
							}}/>
							<LiLinks link_info={{
								li_classes:"mx-3",
								a_classes:"",
								to_path:"#",
								contene:"",
								content_type:"icon",
								content_classes:"fa-brands fa-twitter"
							}}/>
						</ul>
					</div>
				</div>
      </div>
    </nav>
	)
}

export default MainNav
