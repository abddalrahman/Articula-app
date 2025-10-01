import React, { useContext, useEffect, useState } from 'react'
import mainImg from './assets/images/main-sign-up.png'
// import placeholderImg from './assets/images/placeholder_img.png'
import MainHead from './components/MainHead';
import './assets/css/sing-ip.css';
import Form_input from './components/Form_input';
import { NavLink } from 'react-router';
import MainBtn from './components/MainBtn';
import SignWithAccount from './bigComponents/SignWithAccount';
import { ChangeLangContext } from './App';

const SignUp = () => {

	const {languageIs, loginData} = useContext(ChangeLangContext)

	const [message, setMessage] = useState('');
	const [submitError, setSubmitError] = useState('');
	const [loading, setLoading] = useState(false);
	const [dateToSend, setDateToSend] = useState({
		username: "",
		f_name: "",
		l_name: "",
		mail: "",
		phone: "",
		gender: 9,
		pass: "",
		c_pass: "",
		agree:false
	})
	
	const regexRules = {
		stringsRegex: /^[A-Za-z]{3,}$/,
		usernameRegex: /^(?=(?:[^A-Za-z]*[A-Za-z]){3,})[A-Za-z0-9]+$/,
		phoneRegex: /^09\d{8}$/,
		emailRegex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
		passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
	}
	
	useEffect(()=>{
		document.querySelector("header").classList.add('show');
	},[])

	const handleCheckboxChange = (e)=>{
		e.target.classList.toggle("check_true")
		setDateToSend({
			...dateToSend,
			agree:!dateToSend.agree
		})
	}

	const validationForm = ()=>{
		const {username, f_name, l_name, mail, phone, pass, c_pass} = dateToSend
		const ob = [username, f_name, l_name, mail, phone, pass, c_pass]
		let there_null_value = false;

		ob.forEach(item =>{
			item.trim() == '' ? there_null_value = true : ''
		})

		if(!there_null_value){
			const stringsPassed = regexRules.stringsRegex.test(f_name) && regexRules.stringsRegex.test(l_name)
			const usernameRegex = regexRules.usernameRegex.test(username) 
			const mailPassed = regexRules.emailRegex.test(mail) 
			const phonePassed = regexRules.phoneRegex.test(phone)
			const passwordPassed = regexRules.passwordRegex.test(pass)

			if(stringsPassed && mailPassed && phonePassed && passwordPassed && usernameRegex){
				if(pass === c_pass){
					return true
				}else{
					setMessage('Password and Confirm Password are not match')
					return false
				}
			}else{
				let messageString = !stringsPassed ? 'first name, last name must contain 3 letters at less("Without numbers");' : '';
				!usernameRegex ? messageString+='username must contain 3 letters at less("Numbers are allowed"); ' : ''
				!mailPassed ? messageString+='Not Valid Email; ' : ''
				!phonePassed ? messageString+='Not Valid phone Number; ' : ''
				!passwordPassed ? messageString+='password Must Contain [number, uppercase Letter, lowercase letter] and 8 length at less; ' : ''

				setMessage(messageString)
				return false
			}
			
		}else{
			setMessage('Enter all data place')
			return false
		}
	}

	const sendFormDate = (e)=>{
		e.preventDefault();
		if(dateToSend.agree){
			const isValid = validationForm()
			if(isValid){
				setLoading(true)
				setMessage('')
				setSubmitError('')

				fetch('https://tamkeen-dev.com/api/user/registerpass?_format=json', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"name": {
								"value": dateToSend.username
						},
						"field_name": {
								"value": dateToSend.f_name
						},
						"field_surname": {
								"value": dateToSend.l_name
						},
						"mail": {
								"value": dateToSend.mail
						},
						"field_mobile": {
								"value": dateToSend.phone
						},
						"field_gender": {
								"target_id": dateToSend.gender
						},
						"pass": {
								"value": dateToSend.pass
						}
					})
				})
				.then((res)=>{
					if(!res.ok){
						return res.json().then(data => {
							const error_is = data.message || 'Unknown error';
							console.log(error_is)
							setSubmitError(error_is);
						})
					}else{
						setMessage('You have registered. Go to your email and activate the account.')
						return res.json()
					}
				})
				// .then(data => {
					// console.log(data)
				// })
				.catch(err => {
					console.log(err.message)
					setSubmitError('Something Went Wrong!!')
				})
				.finally(()=>{
					setLoading(false)
					// console.log('done')
				
				})
			}
		}else{
			setMessage('Agree to All the Terms & Conditions place')
		}
	}

	return (
		<div className='sign-up'>
			{
				loginData
				?
					<div className=' alert alert-info nav-container'>
						This Page is not Available Now. 
					</div>
				:
					<div className='sign-up-content d-flex justify-content-between flex-column-reverse flex-lg-row '>
						<div className=' d-none d-lg-block'>
							<img src={mainImg} alt="sign up" />
						</div>

						<div className='p-3 p-lg-0'>
							<MainHead content="Create your account"/>
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
							<form className='sign-up-form' onSubmit={(e)=>sendFormDate(e)}>
								<div className=' d-flex flex-wrap gap-3'>
									<Form_input input_info={{
										label:"First Name",
										inp_placeholder:"First Name..",
										inp_type:"y",
										inp_classes:"flex-inp",
										all_date: dateToSend,
										path: "f_name",
										eventHandle: setDateToSend,
										disabled: loading
									}}/>
									<Form_input input_info={{
										label:"Last name",
										inp_placeholder:"Last name..",
										inp_type:"y",
										inp_classes:"flex-inp",
										all_date: dateToSend,
										path: "l_name",
										eventHandle: setDateToSend,
										disabled: loading
									}}/>
								</div>
								<Form_input input_info={{
									label:"Mobile",
									inp_placeholder:"ex: 963 000 0000",
									inp_type:"y",
									inp_classes:"flex-inp",
									all_date: dateToSend,
									path: "phone",
									eventHandle: setDateToSend,
									disabled: loading
								}}/>
								<Form_input input_info={{
									label:"Username",
									inp_placeholder:"Username..",
									inp_type:"y",
									inp_classes:"flex-inp",
									all_date: dateToSend,
									path: "username",
									eventHandle: setDateToSend,
									disabled: loading
								}}/>
								<Form_input input_info={{
									label:"Email",
									inp_placeholder:"Email address",
									inp_type:"y",
									inp_classes:"flex-inp",
									all_date: dateToSend,
									path: "mail",
									eventHandle: setDateToSend,
									disabled: loading
								}}/>

								<div className=' d-flex flex-wrap gap-3'>
									<Form_input input_info={{
										label:"password",
										inp_placeholder:"Create password",
										inp_type:"p",
										inp_classes:"flex-inp",
										show_hide_pass: true,
										all_date: dateToSend,
										path: "pass",
										eventHandle: setDateToSend,
										disabled: loading
									}}/>
									<Form_input input_info={{
										label:"Confirm password",
										inp_placeholder:"Confirm password",
										inp_type:"p",
										inp_classes:"flex-inp",
										show_hide_pass: true,
										all_date: dateToSend,
										path: "c_pass",
										eventHandle: setDateToSend,
										disabled: loading
									}}/>
								</div>
									
								<div className='gender-is d-flex align-items-center my-3'>
									<label className='me-5'>Choose your Gender</label>
									<div className='d-flex align-items-center'>
										<input className='rounded-circle' type="radio" name='gender' id='male' checked={dateToSend.gender == 9 ? true : false} disabled={loading}
											onChange={()=>setDateToSend({
												...dateToSend,
												gender:9
											})}
										/>
										<label className='mx-2' htmlFor="male">Male</label>
									</div>
									<div className='mx-3 d-flex align-items-center'>
										<input className='rounded-circle' type="radio" name='gender' id='female' checked={dateToSend.gender == 10 ? true : false}
											disabled={loading}
											onChange={()=>setDateToSend({
												...dateToSend,
												gender:10
											})}
										/>
										<label className='mx-2' htmlFor="female">Female</label>
									</div>
								</div>

								<div className='agree-terms d-flex align-items-center justify-content-between w-100 mb-1 flex-wrap gap-3'>
									<div className=' d-flex align-items-center'>
										<input className='rounded-0' type="checkbox" id='agree-terms-inp' disabled={loading}
											onClick={(e)=>{handleCheckboxChange(e)}}
										/>
										<label className='mx-2' htmlFor="agree-terms-inp">
											I Agree to All the <NavLink to={'#'}>Terms & Conditions</NavLink>
										</label>
									</div>
									<MainBtn link_info={{
										btn_type:"btn",
										link_classes:"main-btn",
										link_to:"#",
										content: !loading ? "Create account" : "Loading...",
										icon_classes: !loading ? languageIs == 'en' ? "fa-solid fa-arrow-right ms-2" : 'fa-solid fa-arrow-left ms-2' : null,
										disabledIs: !loading ? false : true
									}}/>
								</div>
							</form>

							<SignWithAccount what_sign="Sign up with"/>
						</div>
					</div>
			}

		</div>
	)
}

export default SignUp
