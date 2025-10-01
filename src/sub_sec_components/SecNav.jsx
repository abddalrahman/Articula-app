import React, { useContext, useEffect, useState } from 'react'
import Logo from "../assets/images/LOGO.svg"
import Logo2 from "../assets/images/logo-2.png"
import { NavLink, useNavigate } from 'react-router'
import MainBtn from '../components/MainBtn'
import placeholder from '../assets/images/user_placeholder.png'
import LiLinks from '../components/LiLinks'
import { ChangeLangContext } from '../App'

const SecNav = ({sign}) => {
	const navigate = useNavigate()
	
	const [userData, setUserData] = useState({
		error: "",
		data: ''
	});

	const {loginData, changeLogin, changeProfile, color} = useContext(ChangeLangContext)
	// get user date for profile
	useEffect(() => {
		if (!loginData) return;
		
		const passAndName = loginData.passName;
		// setGetInfoError('');

		fetch(`https://tamkeen-dev.com/api/user/${loginData.uId}?_format=json`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${passAndName}`
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setUserData({
						error: 'Something Went Wrong!!',
						data: ""
					});
				});
			}else{
				return res.json();
			}
		})
		.then(data => { 
			setUserData({
				error: '',
				data: data
			});
		})
		.catch(err => {
			console.log(err.message)
			setUserData({
				error: 'Something Went Wrong!!',
				data: ""
			});
		})
		// .finally(() => {
		// });
	}, [loginData, changeProfile]);

	// show and hide profile list
	const handleProfileShow = (eventType)=>{
		const ul_list = document.querySelector('.profile-in-nav ul');
		
		if(eventType == 'click'){
			ul_list.classList.remove('d-none') 
			setTimeout(() => {
				ul_list.classList.add('show') 
			}, 100);
		}else{ 
			ul_list.classList.remove('show')
			setTimeout(() => {
				ul_list.classList.add('d-none') 
			}, 200);
		}
	}

	// remove storage
	const removeStorage= ()=>{
		if(localStorage.getItem('login_obj_info')){
			localStorage.removeItem('login_obj_info')
		}else if(sessionStorage.getItem('login_obj_info')){
			sessionStorage.removeItem('login_obj_info')
		}
		changeLogin(false)
		navigate('/')
	}

	return (
		<nav className="sec-nav">
			<div className="nav-container d-flex align-items-center justify-content-between py-2 py-md-4 gap-2">
				<NavLink className="logo-img" to={'/'}>
					<img src={color == 'dark' ? Logo2: Logo} alt="logo"/>
				</NavLink>
				<div className="d-flex align-items-center gap-3">
					{
						!loginData
						?
							sign !=''
							?
								sign == 'SignUp'
								?
									<>
										<NavLink className='quic-link' to={'/SignIn'}>Already have an account?</NavLink>
										<MainBtn link_info={{link_classes:"main-btn", link_to:"SignIn", content:"Sign In"}}/>
									</>
								:
									<>
										<NavLink className='quic-link' to={'/SignUp'}>Don’t have account?</NavLink>
										<MainBtn link_info={{link_classes:"main-btn light-o", link_to:"SignUp", content:"Create Account"}}/>
									</>
							:
							<>						
								<MainBtn link_info={{link_classes:"main-btn light-o", link_to:"SignUp", content:"Create Account"}}/>
								<MainBtn link_info={{link_classes:"main-btn", link_to:"SignIn", content:"Sign In"}}/>
							</>
						:
							userData.data && userData.data !=''
							?
								userData.error !=''
								?
									<span className='alert alert-danger'>{userData.error}</span>
								:
									<div className='profile-in-nav position-relative' >
										<div className='d-flex align-items-center'
											tabIndex='0'
											onClick={()=>handleProfileShow('click')}
											onBlur={()=> handleProfileShow('blur')}
										>
											<h4 className='mx-3'>{userData.data.field_name[0].value + " " + userData.data.field_surname[0].value }</h4>
											<img className='rounded-circle' src={userData.data.user_picture.length > 0 ? userData.data.user_picture[0].url : placeholder} alt="profile image" />
										</div>
										<ul className='d-none position-absolute mb-0 px-3 py-2'>
											<LiLinks link_info={{
												li_classes:"",
												a_classes:"py-3 d-block",
												to_path:"/Profile",
												contene:"My Account"
											}}/>
											<LiLinks link_info={{
												li_classes:"",
												a_classes:"py-3 d-block",
												to_path:"/My_Articles",
												contene:"My Articles"
											}}/>
											<li className='py-3' onClick={removeStorage}>Logout</li>
										</ul>
									</div>
							:
								<span className={userData.error !=''? "alert alert-danger": ""}>
									{userData.error!="" ? userData.error : <span className='user-info-loading'>Loading...</span>}
								</span>
					}
				</div>
			</div>
    </nav>
	)
}

export default SecNav
