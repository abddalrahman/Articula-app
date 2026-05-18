import React, { useContext, useEffect, useState } from 'react'
// import profilePlaceholder from './assets/images/user_placeholder.png'
import placeholderImg from './assets/images/placeholder_img.png'
import HeadParaBtn from './components/HeadParaBtn';
import Form_input from './components/Form_input';
import './assets/css/profile.css';
import { Spinner } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router';
import { ChangeLangContext } from './App';
import CSRF_Token from './assets/js/CSRF_Token';
import Confirm from './special_components/Confirm';

const Profile = () => {
	const navigate = useNavigate()

	const [csrfToken, setCsrfToken] = useState({
		value: "",
		error: ""
	});
	const [getInfoError, setGetInfoError] = useState('');
	const [userData, setUserData] = useState('');
	const [showMessage, setShowMessage] = useState('');
	const [UploadImage, setUploadImage] = useState({
		error: "",
		fileUpload: ''
	});
	const [uploadEditInfo, setUploadEditInfo] = useState({
		error: "",
		message: ''
	});
	const [validatMessage, setValidatMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [showConfirm, setSshowConfirm] = useState({
		id: 0,
		show: false
	})
	
	const regexRules = {
		stringsRegex: /^[A-Za-z]{3,}$/,
		passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
	}


	const {loginData, changeLogin, changeProfile, setChangeProfile} = useContext(ChangeLangContext)

	useEffect(()=>{
		setCsrfToken({
			value: '',
			error: ''
		})
		
		document.querySelector("header")?.classList.add('show');
		document.querySelector("footer")?.classList.add('show');

		// get csrf Token
		CSRF_Token({setFunc: setCsrfToken, vals: csrfToken})
	},[])

	useEffect(()=>{
		if (!loginData) return;
		
		const passAndName = loginData.passName;
		setGetInfoError('');

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
					setGetInfoError('Something Went Wrong!!');
				});
			}else{
				return res.json();
			}
		})
		.then(data => { 
			// console.log(data)
			if(data && data!= ''){
				setUserData({
					img: data.user_picture.length > 0 ? data.user_picture[0].url : '',
					imgID: data.user_picture.length > 0 ? data.user_picture[0].target_id : '',
					username: data.name[0].value,
					f_name: data.field_name[0].value,
					l_name: data.field_surname[0].value,
					phone: data.field_mobile[0].value,
					email: data.mail[0].value,
					pass: '',
					id: data.uid[0].value,
					img2: data.user_picture.length > 0 ? data.user_picture[0].url : '',
					f_name2: data.field_name[0].value,
					l_name2: data.field_surname[0].value,
					email2: data.mail[0].value,
					pass2: '',
				});
			}
		})
		.catch(err => {
			console.log(err.message)
			setGetInfoError('Something Went Wrong!!');
		})
		// .finally(() => {
		// });
	},[loginData])

	const validationForm = ()=>{
		const {f_name, f_name2, l_name, l_name2, pass, pass2} = userData
		const toCheckEmpty = [f_name2, l_name2]
		let there_null_value = false;
		toCheckEmpty.forEach(item =>{
			item.trim() == '' ? there_null_value = true : ''
		})
		if(!there_null_value){
			const stringsPassed = (f_name==f_name2 ? true : regexRules.stringsRegex.test(f_name2.trim())) && (l_name==l_name2 ? true: regexRules.stringsRegex.test(l_name2.trim()))
			const passwordPassed = pass==pass2 ? true: regexRules.passwordRegex.test(pass2.trim())
			if(stringsPassed && passwordPassed){
				return true
			}else{
				let messageString = !stringsPassed ? 'first name, last name must contain 3 letters at less; ' : '';				
				!passwordPassed ? messageString+='password Must Contain [number, uppercase Letter, lowercase letter] and 8 length at less; ' : ''

				setValidatMessage(messageString)
				return false
			}
		}else{
			setValidatMessage('Some Values is Empty!')
			return false
		}
	}


	// file change handling
	const handleFileChange = (e)=>{
		setShowMessage('')
		const fileName = document.querySelector('.choos-img span.file-name') 
		const file = e.target.files[0]
		if(file == null){
			setUserData({
				...userData,
				img2: userData.img,
			})
			setUploadImage({
				...UploadImage,
				fileUpload: ''
			})
			fileName.textContent="No File Chosen"
			return
		}
		const fileType = file.type
		if(fileType.startsWith('image/')){
			const imageURL = URL.createObjectURL(file);
			setUserData({
				...userData,
				img2: imageURL,
			})
			setUploadImage({
				...UploadImage,
				fileUpload: file
			})
			fileName.textContent=file.name
		}else{
			setShowMessage('File Type Must Be "image"');
		}
	}


	// submitting handling
	const handleSubmitUserEdit = (e)=>{
		e.preventDefault()
		if(csrfToken.error !=''){
			setShowMessage(csrfToken.error)
		}else{
			setShowMessage('')
			setUploadEditInfo({
				error: '',
				message: ''
			})
			setValidatMessage('')
			const isValid = validationForm()
			if(isValid){
				setUploadEditInfo({
					error: "",
					message: ''
				})
				setLoading(true)
				
				const passAndName = loginData.passName;
				
				if(userData.img == userData.img2){
					uploadChanges(userData.imgID, passAndName)
				}else{
					const fileIs = UploadImage.fileUpload
					// console.log(fileIs)
					const file_name = UploadImage.fileUpload.name;
					fetch(`https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/octet-stream',
							'Authorization': `Basic ${passAndName}`,
							'X-CSRF-Token': csrfToken.value,
							'Content-Disposition': `file; filename="${file_name}"`,
						},
						body: fileIs
					})
					.then((res) => {
						if (!res.ok) {
							return res.json().then(data => {
								const error_is = data.message || 'Unknown error';
								console.log(error_is)
								setLoading(false)
								setUploadImage({
									...UploadImage,
									error: 'failed to upload image'
								});
								setUserData({
									...userData,
									img2: userData.img,
								}) 
							});
						}else{
							return res.json();
						}
					})
					.then(data => {
						// console.log(data)
						setUploadImage({
							error: "",
							fileUpload: ''
						})
						data ? uploadChanges(data.fid[0].value, passAndName): ''
						setChangeProfile(!changeProfile)
					})
					.catch(err => {
						console.log(err.message)
						setLoading(false)
						setUploadImage({
							...UploadImage,
							error: 'failed to upload image'
						}); 
						setUserData({
							...userData,
							img2: userData.img,
						})
					})
					// .finally(() => {
						// });
				}
			}
		}
			
	}

	// upload Edited user info------------------------
	const uploadChanges = (img_id, p_n)=>{
		let bodyObj = {}
		if(userData.pass.trim() == ''){
			bodyObj = {
				"field_name": [
					{
						"value": userData.f_name2
					}
				],
				"field_surname": [
					{
						"value": userData.l_name2
					}
				],
				"user_picture": [
					{
						"target_id":  img_id
					}
				]
			}
		}else{
			bodyObj = {
				"field_name": [
					{
						"value": userData.f_name2
					}
				],
				"field_surname": [
					{
						"value": userData.l_name2
					}
				],
				"user_picture": [
					{
						"target_id": img_id
					}
				],
				"pass": [
					{
						"existing": userData.pass,
						"value": userData.pass2
					}
				]
			}
		}
		// console.log(bodyObj)

		// user_pi
		fetch(`https://tamkeen-dev.com/api/user/${loginData.uId}?_format=json`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Basic ${p_n}`,
				'X-CSRF-Token': csrfToken.value
			},
			body: JSON.stringify(bodyObj)
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setLoading(false)
					setUploadEditInfo({
						error: error_is,
						message: '',
					});
					document.querySelector('.choos-img span.file-name').textContent='No File Chosen'
				});
			}else{
				return res.json();
			}
		})
		.then(data => { 
			// console.log(data)
			if(data && data!= ''){
				document.querySelector('.choos-img span.file-name').textContent='No File Chosen'
				if(userData.pass !=''){
					const newPassAndName = btoa(userData.username + ":" +userData.pass2)
					const newLoginData = {...loginData}
					newLoginData.passName = newPassAndName
					if(localStorage.getItem('login_obj_info')){
						localStorage.setItem('login_obj_info', JSON.stringify(newLoginData))
					}else{
						sessionStorage.setItem('login_obj_info', JSON.stringify(newLoginData))
					}
					changeLogin(newLoginData)
				}
				setUserData({
					img: data.user_picture.length > 0 ? data.user_picture[0].url : '',
					imgID: data.user_picture.length > 0 ? data.user_picture[0].target_id : '',
					username: data.name[0].value,
					f_name: data.field_name[0].value,
					l_name: data.field_surname[0].value,
					phone: data.field_mobile[0].value,
					email: data.mail[0].value,
					pass: '',
					id: data.uid[0].value,
					img2: data.user_picture.length > 0 ? data.user_picture[0].url : '',
					f_name2: data.field_name[0].value,
					l_name2: data.field_surname[0].value,
					email2: data.mail[0].value,
					pass2: '',
				});
				setUploadEditInfo({
					error: '',
					message: "Data Updated Successfully"
				})
			}
			setLoading(false)
		})
		.catch(err => {
			document.querySelector('.choos-img span.file-name').textContent='No File Chosen'
			console.log(err.message)
			setUploadEditInfo({
				error: 'failed to upload new info',
				message:'',
			});
		})
		// .finally(() => {
		// });
	}

	const deleteUserFunc = (type)=>{
		setShowMessage('')

		const passName = loginData.passName;
		const user_id = showConfirm.id
		if(type == 'y'){
			if(csrfToken.value != ''){
				// console.log(csrfToken.value)
				const csrf = csrfToken.value
				fetch(`https://tamkeen-dev.com/api/user/${user_id}?_format=json`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Basic ${passName}`,
						'X-CSRF-Token': csrf
					}
				})
				.then((res) => {
					if (!res.ok) {
						return res.json().then(data => {
							const error_is = data.message || 'Unknown error';
							console.log(error_is)
							setShowMessage('Something want wrong!!')
						});
					}else{
						if(localStorage.getItem('login_obj_info')){
							localStorage.removeItem('login_obj_info')
						}else if(sessionStorage.getItem('login_obj_info')){
							sessionStorage.removeItem('login_obj_info')
						}
						changeLogin(false)
						navigate('/')
					}
				})
				.catch(err => {
					console.log(err.message)
					
				})
				.finally(() => {
					setSshowConfirm({
						id: 0,
						show: false
					})	
				});
			}else{
				console.log('missing requirement')
				setShowMessage('Something want wrong!!')
			}
		}else{
			setSshowConfirm({
				id: 0,
				show: false
			})
		}

	}

	return (
		loginData
		?
			getInfoError == ''
			?
				userData != ''
				?
					<div className='profile-content py-5 '>
						{
							showConfirm.show && <Confirm c_info={{
								title:'Delete Your Account', body: `Are You Shur you want to Delete Your Account. You won't be able to get it back.`, 
								deleteFunc: deleteUserFunc
							}}/>
						}
						<div className='nav-container d-flex gap-5 flex-wrap pb-5'>
							<div
								data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
							>
								<HeadParaBtn all_content={{
									head_t:"Profile",
									para_t:`Here you can view your basic information. You can also edit your account information (image, name, last name, password). 
									Leave what you don't want to change as is. Do not enter your password unless you want to change it.`,
									important:"h2",
									btns:[]
								}}/>
								<ul className='px-0 mb-0'>
									<li className='p-3'><span>UserName:</span>{userData.username}</li>
									<li className='p-3'><span>Phone Number:</span>{userData.phone}</li>
									<li className='p-3'><span>ID:</span>{userData.id}</li>
									<li className='p-3'><span>Email:</span>{userData.email}</li>
								</ul>
								<button className='main-btn mt-4' onClick={()=>setSshowConfirm({id: loginData.uId, show: true})}>Delete My Account</button>
							</div>

							<div
								data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
							>
								<h2 className='mb-4 pb-2'>Edit Your Profile</h2>
								{
									showMessage != ''
									?
										<div className='alert alert-info'>
											{showMessage}
										</div>
									:
										''
								}
								{
									uploadEditInfo.error != ''
									?
										<div className=' alert alert-danger'>
											{uploadEditInfo.error}
										</div>
									:
										''
								}
								{
									uploadEditInfo.message != ''
									?
										<div className=' alert alert-info'>
											{uploadEditInfo.message}
										</div>
									:
										''
								}
								<form className='p-3' onSubmit={(e)=> handleSubmitUserEdit(e)}>
									{
										UploadImage.error != ''
										?
											<div className=' alert alert-danger'>
												{UploadImage.error}
											</div>
										:
											''
									}
									{
										validatMessage == ''
										?
											''
										:
											<div className=' alert alert-danger'>
												{validatMessage}
											</div>
									}
									<div className='choos-img d-flex gap-3 mb-3 mt-1 align-items-center flex-wrap'>
										<img src={userData.img2 != '' ? userData.img2 : placeholderImg} alt="placeholder img" />
										<div className=' d-flex flex-column gap-1'>
											<p className='mb-0'>Please upload square image, size less than 800 kb</p>
											<div className=' d-flex align-items-center p-2 rounded-1'>
												<label htmlFor="uploadImg-imp">Choose File</label>
												<span className='mx-4 file-name show-img-title'>No File Chosen</span>
												<input className=' d-none' id='uploadImg-imp' type="file" disabled={loading}
													onChange={(e)=> handleFileChange(e)}
												/>
											</div>
										</div>
									</div>	
								
									<Form_input input_info={{
										label:"First Name",
										inp_placeholder:"First Name",
										inp_type:"y",
										inp_classes:"",
										all_date: userData,
										path: "f_name2",
										value: userData.f_name2,
										eventHandle: setUserData,
										disabled: loading
									}}/>
									<Form_input input_info={{
										label:"Last Name",
										inp_placeholder:"Last Name",
										inp_type:"y",
										inp_classes:"",
										all_date: userData,
										path: "l_name2",
										value: userData.l_name2,
										eventHandle: setUserData,
										disabled: loading
									}}/>
									
									<Form_input input_info={{
										label:"Password",
										inp_placeholder:"Current Password",
										inp_type:"p",
										inp_classes:"",
										all_date: userData,
										path: "pass",
										value: userData.pass,
										eventHandle: setUserData,
										disabled: loading
									}}/>
									{
										userData.pass != ''
										?
											<Form_input input_info={{
												label:"New Password",
												inp_placeholder:"New Password",
												inp_type:"p",
												inp_classes:"",
												all_date: userData,
												path: "pass2",
												value: userData.pass2,
												eventHandle: setUserData,
												disabled: loading
											}}/>
										:
											''
									}
										
									{
										(userData.f_name != userData.f_name2 || userData.l_name != userData.l_name2 || userData.img != userData.img2 || (userData.pass.trim() !='' && userData.pass2.trim() !=''))  && userData.img2 !=''
										?
											<button disabled={loading} className='main-btn w-100 mt-4' type='submit'>
												{loading? "Loading..." : 'Save Changes'}
											</button>
										:
											''
									}
								</form>
							</div>

						</div>
					</div>
				:
					<div className='d-flex align-items-center justify-content-center my-5 py-5'>
						<Spinner className='spinner' animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</div>
			: 
				<div className='alert alert-danger main-container'>
					{getInfoError}
				</div>
		:
			<div className='alert alert-danger main-container'>
				<NavLink to={'/SignIn'}>Login</NavLink> data is messing !
			</div>
	)
}

export default Profile