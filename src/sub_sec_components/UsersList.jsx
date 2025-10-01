import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router';
import placeHolder from '../assets/images/user_placeholder.png';
import { Spinner, Toast } from 'react-bootstrap';
import ShowPath from './ShowPath';
import { ChangeLangContext } from '../App';
import CSRF_Token from '../assets/js/CSRF_Token';
import Confirm from '../special_components/Confirm';
// css for this file in app.css--------------------------


const UsersList = () => {

	const [csrfToken, setCsrfToken] = useState({
		value:"",
		error:""
	});
	const [theError, setTheError] = useState('');
	const [users, setUsers] = useState('');
	const [deletedID, setDeletedID] = useState('');
	const [deleteUser, setDeleteUser] = useState({
		error: "",
		success: "",
		failedDeleteID: ""
	});
	const [searchParams, setSearchParams] = useState({
		username: "",
		f_name: "",
		l_name: "",
		email: ""
	});
	const [showConfirm, setSshowConfirm] = useState({
		id: 0,
		show: false
	})
	const [loading, setLoading] = useState(false)


	const {loginData} = useContext(ChangeLangContext)
	
	useEffect(()=>{
		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
	
		CSRF_Token({setFunc: setCsrfToken, vals: csrfToken})
		
	}, [])


	useEffect(()=>{
		if(loginData){
			setLoading(true)

			const {username: uName, f_name: fName, l_name: lName, email: email} = searchParams
			fetch(`https://tamkeen-dev.com/api/users-list?_format=json&name=${uName}&field_name=${fName}&mail=${email}&field_surname=${lName}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${loginData.passName}`
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						console.log(error_is)
						setTheError('Something Went Wrong!!')
						setLoading(false)
					});
				}else{
					return res.json();
				}
			})
			.then(data => {
				setUsers(data)
				setLoading(false)
			})
			.catch(err => {
				console.log(err.message)
				setTheError('Something Went Wrong!!');
				setLoading(false)
			})
			// .finally(() => {
			// });

		}
	},[deletedID, searchParams])


	const getImageSrc = useCallback((imageText)=>{
		if(imageText.trim() != ''){
			const div_ = document.createElement('div')
			div_.innerHTML = imageText
			const img_ = div_.querySelector('img')
			const imgSrc = img_.getAttribute('src')
			return 'https://tamkeen-dev.com' + imgSrc.toString()
		}
	}, [])

	const deleteUserFunc = (type)=>{
		setDeleteUser({
			error: "",
			success: "",
			failedDeleteID: ""
		})
		const passName = loginData.passName;
		const currentUserId = loginData.uId;
		const user_id = showConfirm.id
		if(type == 'y'){
			if(csrfToken.value != '' && user_id == currentUserId){
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
							setDeleteUser({
								error: 'Something Went Wrong!!',
								success: "",
								failedDeleteID: user_id
							})
						});
					}else{
						setDeleteUser({
							...deleteUser,
							success: "User Deleted Successfuly."
						})
						setDeletedID(user_id)
					}
				})
				.catch(err => {
					console.log(err.message)
					setDeleteUser({
						error: 'Something Went Wrong!!',
						success: "",
						failedDeleteID: user_id
					})
				})
				.finally(() => {
					setSshowConfirm({
						id: 0,
						show: false
					})	
				});
			}else{
				setSshowConfirm({
					id: 0,
					show: false
				})
				if(csrfToken.value == ''){
					console.log('missing requirement')
					setDeleteUser({
						error:"missing requirement",
						success: "",
						failedDeleteID: user_id
					})
				}else{
					console.log("You can't Delete This User")
					setDeleteUser({
						error:"You can't Delete This User",
						success: "",
						failedDeleteID: user_id
					})
				}
			}
		}else{
			setSshowConfirm({
				id: 0,
				show: false
			})
		}

	}
	
	const closeToast = ()=>{
		setDeleteUser({
			error: "",
			success: "",
			failedDeleteID: ""
		})
	}

	
	const handleSearchTextChange = (e)=>{
		const searchText = e.currentTarget.value
		const changeWhat = e.currentTarget.getAttribute('data-change')
		setSearchParams({
			...searchParams,
			[changeWhat]: searchText  
		});
	}
	
	const handleFocusAndBlurOnInput = (e, eventType, fatherDiv)=>{
		const targetEle = document.querySelector(`.serach-section > div#${fatherDiv}`)
		if(targetEle){
			if(eventType == 'f'){
				targetEle.classList.contains('focus-in') ? '' : targetEle.classList.add('focus-in')
			}else{
				if(e.currentTarget.value == ''){
					targetEle.classList.remove('focus-in')
				}
			}
		}
	}

	return (
		<div className='all-users  pb-5'>
			{
				showConfirm.show && <Confirm c_info={{
					title:'Delete User', body: `Are You Shur you want to Delete User ${showConfirm.id}`, deleteFunc: deleteUserFunc
				}}/>
			}
			<ShowPath path_info={{
				current:"Users List",
				path_series:[
					{
						page:"Dashboard",
						pageLink:"/Dashboard"
					},
					{
						page:"UsersList",
						pageLink:"/UsersList"
					}
				]
			}}/>
			<div className='nav-container mb-5 py-5'>
				{
					loginData
					?
						<>
							<h1 className='text-center mb-5 pt-5'>All Users</h1>

							<div className='serach-section  align-items-center my-5 row mx-0 p-3 pb-4'>
								<h3 className='col-12 my-4'>Filter Users</h3>
								<div id='username-search' className="col-12 col-xl-3 col-md-6 position-relative mb-2">
									<input className='w-100 p-3' type="text" data-change="username"
										onInput={(e)=>handleSearchTextChange(e)}
										onFocus={(e)=>handleFocusAndBlurOnInput(e, 'f', 'username-search')}
										onBlur={(e)=>handleFocusAndBlurOnInput(e, 'b', 'username-search')}
										/>
									<i className="fa-solid fa-magnifying-glass position-absolute"></i>
								</div>
								<div id="f-name-search" className="col-12 col-xl-3 col-md-6 position-relative mb-2">
									<input className='w-100 p-3' type="text" data-change="f_name"
										onInput={(e)=>handleSearchTextChange(e)}
										onFocus={(e)=>handleFocusAndBlurOnInput(e, 'f', 'f-name-search')}
										onBlur={(e)=>handleFocusAndBlurOnInput(e, 'b', 'f-name-search')}
										/>
									<i className="fa-solid fa-magnifying-glass position-absolute"></i>
								</div>
								<div id='l-name-search' className="col-12 col-xl-3 col-md-6 position-relative mb-2" >
									<input className='w-100 p-3' type="text" data-change="l_name"
										onInput={(e)=>handleSearchTextChange(e)}
										onFocus={(e)=>handleFocusAndBlurOnInput(e, 'f', 'l-name-search')}
										onBlur={(e)=>handleFocusAndBlurOnInput(e, 'b', 'l-name-search')}
										/>
									<i className="fa-solid fa-magnifying-glass position-absolute"></i>
								</div>
								<div id='email-search' className="col-12 col-xl-3 col-md-6 position-relative mb-2">
									<input className='w-100 p-3' type="text" data-change="email"
										onInput={(e)=>handleSearchTextChange(e)}
										onFocus={(e)=>handleFocusAndBlurOnInput(e, 'f', 'email-search')}
										onBlur={(e)=>handleFocusAndBlurOnInput(e, 'b', 'email-search')}
									/>
									<i className="fa-solid fa-magnifying-glass position-absolute"></i>
								</div>
							</div>

							{
								theError != ''
								?
									<div className='  alert alert-info'>
										{theError}
									</div>
								:
									users != '' && users.rows.length > 0 
									?
										<div>
		
											<ul className='ps-0 users-list-ul'>
												<li className='show-user list-head d-none d-md-flex'>
													<span className='img-span'>image</span><span className='name-span'>UserName</span><span className='id-span'>ID</span>
													<span className='email-span'>Email</span><span className='phone-span'>Phone</span><span>Actions</span>
												</li>
												{
													users.rows.map((user)=>{
														return <li key={user.uid} className='show-user mb-4 mb-sm-0 flex-wrap flex-md-nowrap'>
															<span className='img-span'>
																<img className='rounded-circle' src={user.user_picture !=''? getImageSrc(user.user_picture): placeHolder} alt={user.name} />
															</span>
															<span className='name-span'><i className="fa-solid fa-circle-user d-inline-block d-md-none me-3"></i>{user.name}</span>
															<span className='id-span'><i className="fa-solid fa-fingerprint d-inline-block d-md-none me-3"></i>{user.uid}</span>
															<span className='email-span'><i className="fa-solid fa-at d-inline-block d-md-none me-3"></i>{user.mail}</span>
															<span className='phone-span'><i className="fa-solid fa-phone d-inline-block d-md-none me-3"></i>{user.field_mobile}</span>
															<span className='justify-content-between justify-content-md-evenly'>
																<button data-user={user.uid} className='main-btn action-btns'
																	onClick={()=>setSshowConfirm({id: user.uid, show: true})}
																>Delete</button>
																<NavLink className='main-btn light-o action-btns' to={'#'}>Edit</NavLink>
															</span>
														</li>
													})
												}
											</ul>
											
										</div>
									:
										loading
										?
											<div className='d-flex align-items-center justify-content-center my-5 py-5'>
												<Spinner className='spinner' animation="border" role="status">
													<span className="visually-hidden">Loading...</span>
												</Spinner>
											</div>
										:
											<div className='  alert alert-info'>
												There are No Users To Display
											</div>
										
							}
						</>

							
					:
						<div className='  alert alert-info'>
							<NavLink to={'SignIn'}>Login</NavLink> Why are you Here?. !!
						</div>
				}
			</div>
			{

			}
			{
				deleteUser.success !='' || deleteUser.error !=''
				?
					<Toast className=' position-fixed toast-delete-user' onClose={closeToast}>
						<Toast.Header>
							<span>{deleteUser.success !=''? '✅' : '❗' }</span>
							<strong className="me-auto">{deleteUser.success !=''? 'Success' : 'Failed' }</strong>
							<small>{deleteUser.success !=''? 'Deletion succeeded' : 'Deletion failed'}</small>
						</Toast.Header>
						<Toast.Body>User {deleteUser.success !=''? "'" + deletedID + "'" + 'Deleted Successfuly' : "'" + deleteUser.failedDeleteID + "'" + ' Failed To Delete'} </Toast.Body>
					</Toast>
				:
					''
			}
		</div>
	)
}

export default UsersList