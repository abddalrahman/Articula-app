import React, { useContext, useEffect, useState } from 'react'
import mainImg from './assets/images/signIn-main.png'
import MainHead from './components/MainHead';
import './assets/css/sing-ip.css';
import Form_input from './components/Form_input';
import { NavLink, useNavigate } from 'react-router';
import MainBtn from './components/MainBtn';
import SignWithAccount from './bigComponents/SignWithAccount';
import { ChangeLangContext } from './App';

const SignIn = () => {
	const navigationTo = useNavigate()

	const {languageIs, loginData} = useContext(ChangeLangContext)

	const [message, setMessage] = useState('');
	const [submitError, setSubmitError] = useState('');
	const [loading, setLoading] = useState(false);
	const [loginInfo, setLoginInfo] = useState({
		username: "",
		pass: "",
		remember : false
	})

	const {changeLogin} = useContext(ChangeLangContext)

	useEffect(()=>{
		document.querySelector("header").classList.add('show');
	},[])

	const handleCheckboxChange = (e)=>{
		e.target.classList.toggle("check_true")
		setLoginInfo({
			...loginInfo,
			remember: !loginInfo.remember
		})
	}

	const loginHandle = (e)=>{
		e.preventDefault();
		const {username, pass}= loginInfo;
		setMessage('')
		setSubmitError('')
		if(username.trim() != '' && pass.trim() != ''){
			setLoading(true)
			const passNameToStorge = btoa(loginInfo.username + ":" +loginInfo.pass)
			fetch('https://tamkeen-dev.com/api/user/login?_format=json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"name": loginInfo.username,
					"pass": loginInfo.pass
				})
			})
			.then((res)=>{
				if(!res.ok){
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						// console.log(error_is)
						setSubmitError(error_is);
					})
				}else{
					setMessage('Done Successfully')
					return res.json()
				}
			})
			.then(data => {
				// console.log(data)
				if(data){
					const userId = data.current_user.uid
					const csrf = data.csrf_token
					const logOutT = data.logout_token
					const logInObj = {
						passName: passNameToStorge,
						uId: userId,
						csrfToken: csrf,
						outToken:logOutT
					}
					if(loginInfo.remember){
						localStorage.setItem('login_obj_info', JSON.stringify(logInObj))
					}else{
						sessionStorage.setItem('login_obj_info', JSON.stringify(logInObj))
					}
					changeLogin(logInObj)
					navigationTo('/')
				}
			})
			.catch(err => {
				console.log(err.message)
					setSubmitError('Something Went Wrong!!')
			})
			.finally(()=>{
				setLoading(false)
			})
		}else{
			setMessage('Enter All Date place')
		}
	}

	return (
		<div className='sign-in'>
			{
				loginData
				?
					<div className=' alert alert-info nav-container'>
						This Page is not Available Now. 
					</div>
				:
					<div className='sign-in-content d-flex justify-content-between  align-items-center'>
						<div className=' d-none d-lg-block'>
							<img src={mainImg} alt="sign up" />
						</div>

						<div className='p-3 p-lg-0'>
							<MainHead content="Sign in to your account"/>

							{
								message !=''
								?
									<div className='alert alert-info'>
										{message}
									</div>
								:
									''
							}
							{
								submitError !=''
								?
									<div className='alert alert-danger'>
										{submitError}
									</div>
								:
									''
							}

							<form className='sign-in-form' onSubmit={loginHandle}>
								<Form_input input_info={{
									label:"Username",
									inp_placeholder:"Enter your Username",
									inp_type:"y",
									inp_classes:"flex-inp",
									all_date: loginInfo,
									path: "username",
									eventHandle: setLoginInfo,
									disabled: loading
								}}/>
								<Form_input input_info={{
									label:"password",
									inp_placeholder:"Your password",
									inp_type:"p",
									inp_classes:"flex-inp",
									show_hide_pass: true,
									all_date: loginInfo,
									path: "pass",
									eventHandle: setLoginInfo,
									disabled: loading
								}}/>
						
								<div className='remeber-me d-flex align-items-center justify-content-between w-100 mt-2 mb-5'>
									<div className=' d-flex align-items-center'>
										<input className='rounded-0' type="checkbox" id='remember-me-inp' disabled={loading}
											onClick={(e)=>{handleCheckboxChange(e)}}
										/>
										<label className='mx-2' htmlFor="remember-me-inp">Remember me</label>
									</div>
									<MainBtn link_info={{
										btn_type:"btn",
										link_classes:"main-btn",
										link_to:"#",
										content: !loading ? "Sign In" : "Loading...",
										icon_classes: !loading ? languageIs == 'en' ? "fa-solid fa-arrow-right ms-2" : 'fa-solid fa-arrow-left ms-2' : null,
										disabledIs: !loading ? false : true
									}}/>
								</div>
							</form>

							<SignWithAccount what_sign="Sign in with"/>
						</div>
					</div>
			}

		</div>
	)
}

export default SignIn
