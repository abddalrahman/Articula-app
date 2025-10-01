import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ArticleCard from './bigComponents/ArticleCard';
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router';
import Form_input from './components/Form_input';
import placeholderImg from './assets/images/placeholder_img.png';
import './assets/css/my-artilcles.css';
import CompaniesStatistic from './sections_components/CompaniesStatistic';
import { ChangeLangContext } from './App';
import CSRF_Token from './assets/js/CSRF_Token';
import Confirm from './special_components/Confirm';

const My_Articles = () => {
	const [thereError, setThereError] = useState({
		userArticles: "",
		getCategories: "",
		getTags: "",
		csrfT: "",
		uploadMainImage: "",
		UploadGallery: "",
		uploadArticle: "",
	});
	const [loading, setLoading] = useState(false);
	const [myArticles, setMyArticles] = useState({
		list: [],
		loading: false
	});
	const [categories, setCategories] = useState([]);
	const [tagsList, setTagsList] = useState([]);
	const [csrfToken, setCsrfToken] = useState({
		value: "",
		error: ""
	});
	const [showMessage, setShowMessage] = useState('');
	const [showImgMessage, setShowImgMessage] = useState([]);
	const [enterAllDataMessage, setEnterAllDataMessage] = useState('');
	const [showGalleryMessage, setShowGalleryMessage] = useState([]);
	const [galleryImagesID, setGalleryImagesID] = useState([])
	const [finish, setFinish] = useState({
		isFinish: false,
		percentage: 2
	})
	const [newArticle, setNewArticle] = useState({
		title:"",
		body:"",
		img:"",
		gallery:[],
		tags:[],
		catId: '',
		mainImageToSend: '',
		galleryToSend: [],
		imgId:"",
	});
	const [deleteArticle, setDeleteArticle] = useState({
		error: "",
		success: ""
	})
	const [reGetArticles, setReGetArticles] = useState(false)
	const [showConfirm, setSshowConfirm] = useState({
		id: 0,
		show: false
	})
	
	const {loginData} = useContext(ChangeLangContext)
	
	useEffect(()=>{
		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');

		setMyArticles({
			...myArticles,
			loading: true
		})

		const passwordName = loginData

		// get user articles----------------------------------------------------
		if(passwordName){
			fetch(`https://tamkeen-dev.com/api/blogs-api-current-user`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${passwordName.passName}`
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						console.log(error_is)
						setThereError({
							...thereError,
							userArticles:	'Something Went Wrong!!'
						});
						setMyArticles({
							...myArticles,
							loading: false
						})
					});
				}
				return res.json();
			})
			.then(data => { 
				// console.log(data)
				setMyArticles({
					list: data.rows,
					loading: false
				})
				setThereError({
					...thereError,
					userArticles:	''
				});
			})
			.catch(err => {
				console.log(err.message)
				setThereError({
					...thereError,
					userArticles: 'Something Went Wrong!!'
				});
				setMyArticles({
					...myArticles,
					loading: false
				})
			})
			// .finally(() => {
			// });
		}else{
			setMyArticles('not loged')
		}

		// get csrf
		CSRF_Token({setFunc: setCsrfToken, vals: csrfToken})
		
	},[deleteArticle.success, reGetArticles])

	useEffect(()=>{
			const passwordName = loginData

		// get catefories----------------------------------------------------
		if(passwordName){
			fetch(`https://tamkeen-dev.com/api/terms/category`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						console.log(error_is)
						setThereError({
							...thereError,
							getCategories: 'Something Went Wrong!!'
						});
					});
				}
				return res.json();
			})
			.then(data => {
				setCategories(data)
				setThereError({
					...thereError,
					getCategories: ''
				});
			})
			.catch(err => {
				console.log(err.message)
				setThereError({
					...thereError,
					getCategories: 'Something Went Wrong!!'
				});
			})
			// .finally(() => {
			// });

			// get tas----------------------------------------------------
			fetch(`https://tamkeen-dev.com/api/terms/tags`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						console.log(error_is)
						setThereError({
							...thereError,
							userArticles: 'Something Went Wrong!!'
						});
					});
				}
				return res.json();
			})
			.then(data => {
				setTagsList(data)
				setThereError({
					...thereError,
					userArticles: ''
				});
			})
			.catch(err => {
				console.log(err.message)
				setThereError({
					...thereError,
					userArticles: 'Something Went Wrong!!'
				});
			})
			// .finally(() => {
			// });

		}
	}, [])


	// file change handling----------------------------------------------------
	const handleFileChange = (e)=>{
		setShowImgMessage('')
		const fileName = document.querySelector('.main-img span.file-name')
		const file = e.target.files[0]
		if(file == null){
			setNewArticle({
				...newArticle,
				img: '',
				mainImageToSend: ''
			})
			fileName.textContent="No File Chosen"
			return
		}
		const fileType = file.type
		if(fileType.startsWith('image/')){
			const imageURL = URL.createObjectURL(file);
			setNewArticle({
				...newArticle,
				img: imageURL,
				mainImageToSend: file
			})
			fileName.textContent=file.name
		}else{
			setShowImgMessage('File Type Must Be "image"');
		}
	}


	// file change handling----------------------------------------------------
	const handleFileGalleryChange = (e)=>{
		setShowGalleryMessage('')
		const fileName = document.querySelector('.gallery-imgs span.file-name') 
		fileName.textContent='' 
		const files = e.target.files
		const allFiles = Object.keys(files)
		let allGalleryImages = [];
		let filesPassed = [];
		if(allFiles.length > 0){
			for(let i=0; i<allFiles.length; i++){
				const file = files[allFiles[i]];
				if(file == null){
					allGalleryImages =[]
					filesPassed =[]
					fileName.textContent="No File Chosen"
					break;
				}else{
					const fileType = file.type
					if(fileType.startsWith('image/')){
						const imageURL = URL.createObjectURL(file);
						allGalleryImages.push(imageURL)
						filesPassed.push(file)
						fileName.textContent += `${file.name}  ${i== allFiles.length -1 ? '' : ', '}`
					}else{
						setShowGalleryMessage('File Type Must Be "image"');
					}
				}
			}

		}else{
			fileName.textContent="No File Chosen"
		}
		setNewArticle({
			...newArticle,
			gallery: allGalleryImages,
			galleryToSend: filesPassed
		})
	}


	// handleSelectChange----------------------------------------------------
	const handleSelectChange = (e)=>{
		const catID = e.target.value;
		setNewArticle({
			...newArticle,
			catId: catID
		})
	}
	
	// handleTagChange----------------------------------------------------
	const handleTagChange = (e)=>{
		e.target.classList.toggle('tag-selected')
		const tagID = e.target.getAttribute('data-id');
		let selectedTags = newArticle.tags
		if(selectedTags.includes(tagID)){
			selectedTags = selectedTags.filter((itme)=> itme != tagID)
		}else{
			selectedTags.push(tagID)
		}
		setNewArticle({
			...newArticle,
			tags: selectedTags
		})
	}
	
	// create article handle----------------------------------------------------
	const createArticleHandle = (e)=>{
		e.preventDefault()
		setShowMessage('')
		setLoading(true)
		setThereError({
			userArticles: "",
			getCategories: "",
			getTags: "",
			csrfT: "",
			uploadMainImage: "",
			UploadGallery: "",
		});
		const {title, body, img, tags, catId} = newArticle;
		if(title.trim().length < 6 || body.trim().length < 10 || img =='' || tags.length == 0 || catId =='' || catId ==-1){
			setEnterAllDataMessage('Enter All Data place [title: 6 or more letters, body 10 or more lettter, main image, category, tags]')
		}else{
			fetch(`https://tamkeen-dev.com/api/session/token?_format=json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						console.log(error_is)
						setThereError({
							...thereError,
							csrfT: 'Something Went Wrong!!'
						});
						setLoading(false)
					});
				}
				return res.text();
			})
			.then(data => {
				// console.log(data)
				setCsrfToken({
					error: '',
					value: data
				})
				uploadMainImages(data)
			})
			.catch(err => {
				console.log(err.message)
				setThereError({
					...thereError,
					csrfT: 'Something Went Wrong!!'
				});
				setLoading(false)
			})
			// .finally(() => {
			// });
		}
	}
	
	const uploadMainImages = (csrf_token)=>{

		setEnterAllDataMessage('')
		setThereError({
			...thereError,
			uploadMainImage: "",
			UploadGallery: "",
		})
		const passAndName = loginData
		const file_name = newArticle.mainImageToSend.name;
		// const formData = new FormData();
		// formData.append('field_image', newArticle.mainImageToSend, file_name);
		const file = newArticle.mainImageToSend;
		fetch(`https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/octet-stream',
				'Authorization': `Basic ${passAndName.passName}`,
				'X-CSRF-Token': csrf_token,
				'Content-Disposition': `file; filename="${file_name}"`,
			},
			body: file
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setThereError({
						...thereError,
						uploadMainImage: 'failed to upload main image'
					});
					setLoading(false)
				});
			}
			return res.json();
		})
		.then(data => {
			// console.log(data)
			setNewArticle({
				...newArticle,
				imgId:data.fid[0].value
			})
			uploadGalleryImage(passAndName.passName, csrf_token)
			setFinish({
				...finish,
				percentage: finish.percentage+(100/newArticle.galleryToSend.length+1)
			})
		})
		.catch(err => {
			console.log(err.message)
			setThereError({
				...thereError,
				uploadMainImage: 'failed to upload main image'
			});
			setLoading(false)
		})
		// .finally(() => {
		// });

	}

	const uploadGalleryImage = (pass_Name, csrft)=>{
		if(newArticle.gallery.length > 0){
			const galleryIds = []
			const uploadall = newArticle.galleryToSend.map((file, index)=>{
				const file_name2 = file.name
				return fetch(`https://tamkeen-dev.com/api/file/upload/node/blog/field_gallery?_format=json`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/octet-stream',
						'Authorization': `Basic ${pass_Name}`,
						'X-CSRF-Token': csrft,
						'Content-Disposition': `file; filename="${file_name2}"`,
					},
					body: file
				})
				.then((res) => {
					if (!res.ok) {
						return res.json().then(data => {
							const error_is = data.message || 'Unknown error';
							console.log(error_is)
							setThereError({
								...thereError,
								UploadGallery: 'failed to upload gallery'
							});
							setLoading(false)
						});
					}
					return res.json();
				})
				.then(data => {
					// console.log(data)
					galleryIds.push(data.fid[0].value)
					setFinish({
						...finish,
						percentage: (100/newArticle.galleryToSend.length+1)+(100/newArticle.galleryToSend.length+1 * (index+1))
					})
				})
				.catch(err => {
					console.log(err.message)
					setThereError({
						...thereError,
						UploadGallery: 'failed to upload gallery'
					});
					setLoading(false)
				})
				// .finally(() => {
				// });
			})
			Promise.all(uploadall).then(() => {
				setGalleryImagesID(galleryIds);
				setFinish({
					isFinish: true,
					percentage: 100
				})
			});
			
		}else{
			setFinish({
				isFinish: true,
				percentage: 100
			})
		}
	}

	const uploadArticle = ()=>{
		const pn = loginData
		const gallery_obj = []
		galleryImagesID.map((id)=>{
			gallery_obj.push({
				target_id: id
			})
		})
		const tags_obj = []
		newArticle.tags.map((id)=>{
			tags_obj.push({
				target_id: id
			})
		})
		
		const oo = {
			"type": [{
				"target_id": "blog"
			}],
			"title": [{
				"value":  newArticle.title
			}],
			"body": [{
				"value":   newArticle.body,
				"format": "basic_html"
			}],
			"field_image": [{
				"target_id":  newArticle.imgId
			}],
			"field_gallery": gallery_obj,
			"field_tags": tags_obj,
			"field_category": [{
				"target_id":  newArticle.catId
			}]
		}
		fetch(`https://tamkeen-dev.com/api/node?_format=json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${pn.passName}`,
				'X-CSRF-Token': csrfToken.value
			},
			body: JSON.stringify(oo)

		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setThereError({
						...thereError,
						uploadArticle: 'failed to upload to articles'
					});
					setLoading(false)
				});
			}
			return res.json();
		})
		.then(data => {
			// console.log(data)
			setShowMessage('Article Uploaded Successfuly')
			setLoading(false)
			setNewArticle({
				title:"",
				body:"",
				img:"",
				gallery:[],
				tags:[],
				catId: '',
				mainImageToSend: '',
				galleryToSend: [],
				imgId:"",
			})
			setReGetArticles(!reGetArticles)
			const tags_spans = document.querySelectorAll('.select-tags span')
			// console.log(tags_spans)
			tags_spans.forEach((tag)=>{
				tag.classList.remove('tag-selected')
			})
		})
		.catch(err => {
			console.log(err.message)
			setThereError({
				...thereError,
				uploadArticle: 'failed to upload article'
			});
			setLoading(false)
		})
		.finally(() => {
			setFinish({
				...finish,
				percentage: 0
			})
			document.querySelector('.main-img span.file-name').textContent='No File Chosen'
			document.querySelector('.gallery-imgs span.file-name').textContent='No File Chosen'
			document.querySelector('.main-img input#uploadImg-imp').value=''
			document.querySelector('.gallery-imgs input#uploadImg-imges').value=''
			document.querySelector('form select option[value="-1"]').selected = true;
		});
	}


	const deleteArticleFunc = (type)=>{
		setDeleteArticle({
			error: "",
			success: ""
		})
		const pass_Name = loginData
		if(type == 'y'){
			const id = showConfirm.id
			fetch(`https://tamkeen-dev.com/api/node/${id}?_format=json`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${pass_Name.passName}`,
					'X-CSRF-Token': csrfToken.value
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						console.log(data)
						setDeleteArticle({
							error: "Delete Failed",
							success: '',
						});
					});
				}else{
					setDeleteArticle({
						error: '',
						success: "Delete Article Successfuly",
					});
				}
			})
			.catch(err => {
				console.log(err.message)
				setDeleteArticle({
					error: "Delete Failed",
					success: '',
				});
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
		}
	}


	const MyArticlesReq = useMemo(() => ({
		allMyArticles: myArticles.list,
		showConfirmToDelete: setSshowConfirm
	}), [myArticles.list, setSshowConfirm])

	return (
		myArticles != 'not loged'
		?
			<div className="my-articles py-5 position-relative ">
				{
					showConfirm.show && <Confirm c_info={{
						title:'Delete Article', body: `Are You Shur you want to Delete Article ${showConfirm.id}`, deleteFunc: deleteArticleFunc
					}}/>
				}
				<div className={loading? 'cover-l position-fixed' : 'cover-l position-fixed d-none'}></div>
				<div className="nav-container">
					{
						thereError.getCategories != '' || thereError.getTags !='' || thereError.userArticles !=''
						?
							<div className=' alert alert-danger w-100'>
								{thereError.userArticles !='' ? thereError.userArticles + "\n" : ''}
								{thereError.getCategories !='' ? thereError.getCategories + "\n" : ''}
								{thereError.getTags !='' ? thereError.getTags + "\n" : ''}
							</div>
						:
							<>
							
								{
									categories.length > 0 && tagsList.length > 0
									?
										<div>
											<h2 className='mt-5 mb-4'>Create Article</h2>
											<i className='my-2 d-block req-note'>Fields marked with * are required.</i>
											{
												loading
												?
													<div className='final-processing d-flex p-4'>
														<div className=''>
															{
																<>
																	<h3 className='my-0'>processing</h3>
																	<ul className='ps-3 my-3'>
																		<li>
																			The article files are now being uploaded.
																		</li>
																		<li>
																			Do not leave the page until the entire process is complete.
																		</li>
																		<li>
																			This takes approximately 10 to 30 seconds.
																		</li>
																	</ul>
																	{
																		newArticle.imgId !='' && finish.isFinish && finish.percentage >= 100
																		?
																			<span className='main-btn light-btn finish-btn' onClick={uploadArticle}>
																				finish
																			</span>
																		
																		:
																			<span><span style={{width:`${finish.percentage}%`}}></span></span>
																	}
																</>	
																
															}
														</div>
													</div>
												:
													''
											}
											{
												enterAllDataMessage != ''
												?
													<div className='alert alert-info'>
														{enterAllDataMessage}
													</div>
												:
													''
											}
											<form className='p-2 p-md-4' onSubmit={(e)=>createArticleHandle(e)}>
												<Form_input input_info={{
													label:"Title *",
													inp_placeholder:"Title 'at least 6 characters'",
													inp_type:"y",
													inp_classes:"",
													all_date: newArticle,
													path: "title",
													value: newArticle.title,
													eventHandle: setNewArticle,
													disabled: loading
												}}/>
												<Form_input input_info={{
													label:"Body *",
													inp_placeholder:"Body 'at least 10 characters'",
													inp_type:"text",
													inp_classes:"",
													all_date: newArticle,
													path: "body",
													value: newArticle.body,
													eventHandle: setNewArticle,
													disabled: loading
												}}/>
												{
													showImgMessage != ''
													?
														<div className=" alert alert-secondary">
															{showImgMessage}
														</div>
													:
														''
												}
												<div className='choos-img main-img d-flex gap-3 mb-3 mt-1 align-items-md-center flex-column flex-md-row w-100'>
													<img src={newArticle.img != '' ? newArticle.img : placeholderImg} alt="placeholder img" />
													<div className=' d-flex flex-column gap-1'>
														<p className='mb-0'>Upload main Article image *</p>
														<div className=' d-flex align-items-center p-2 rounded-1'>
															<label className='show-img-title' htmlFor="uploadImg-imp">Choose File</label>
															<span className='mx-4 file-name show-img-title'>No File Chosen</span>
															<input className=' d-none' id='uploadImg-imp' type="file" disabled={loading} 
																onChange={(e)=> handleFileChange(e)}
															/>
														</div>
													</div>
												</div>	
												
												<div className='choos-img gallery-imgs d-flex gap-3 mb-3 mt-1 align-items-center flex-column'>
													<div className='w-100 d-flex gap-2 flex-wrap'>
														{
															newArticle.gallery.length > 0
															?
															
																newArticle.gallery.map((img, index)=>(
																	<img key={index} src={img} alt={`gallery image ${index}`}/>
																))
															:
																''
														}
													</div>
													{
														showGalleryMessage != ''
														?
															<div className=" alert alert-secondary">
																{showGalleryMessage}
															</div>
														:
															''
													}
													<div className='w-100 d-flex flex-column gap-1'>
														<p className='mb-0'>Upload Gallery imags for your Article</p>
														<div className=' d-flex align-items-center p-2 rounded-1'>
															<label htmlFor="uploadImg-imges">Choose File</label>
															<span className='mx-4 file-name show-img-title'>No File Chosen</span>
															<input className=' d-none' id='uploadImg-imges' type="file" multiple disabled={loading}
																onChange={(e)=> handleFileGalleryChange(e)}
															/>
														</div>
													</div>
												</div>

												<select id="" className='p-3 w-100 my-4' disabled={loading}
													onChange={(e)=> handleSelectChange(e)}
												>
													<option value="-1">Select Category *</option>
													{
														categories.map((category)=>(
															<option key={category.id} value={category.id}>{category.name}</option>
														))
													}	
												</select>	

												<h3 className='mt-4 mb-3'>Select the Tags You Want *</h3>
												<div className='select-tags d-flex align-items-center gap-4 flex-wrap'>
													{
														tagsList.map((tag)=>(
															<span key={tag.id} data-id={tag.id} className='py-2 px-3'
																onClick={(e)=> loading ? '' : handleTagChange(e)}
															>
																#{tag.name}
															</span>
														))
													}
												</div>

												{
													thereError.csrfT && thereError.csrfT !=''
													?
														<div className=" alert alert-danger">
															{thereError.csrfT}
														</div> 
													:
														''
												}
												{
													enterAllDataMessage && enterAllDataMessage !=''
													?
														<div className=" alert alert-info mt-4">
															{enterAllDataMessage}
														</div>
													:
														''
												}

												{
													thereError.uploadMainImage && thereError.uploadMainImage !=''
													?
														<div className=" alert alert-info mt-4">
															{thereError.uploadMainImage}
														</div>
													:
														''
												}
												{
													thereError.UploadGallery && thereError.UploadGallery !=''
													?
														<div className=" alert alert-info mt-4">
															{thereError.UploadGallery}
														</div>
													:
														''
												}
												{
													thereError.uploadArticle && thereError.uploadArticle !=''
													?
														<div className=" alert alert-info mt-4">
															{thereError.uploadArticle}
														</div>
													:
														''
												}
												{
													showMessage && showMessage !=''
													?
														<div className=" alert alert-info mt-4">
															{showMessage}
														</div>
													:
														''
												}
												<button 
													disabled={loading || newArticle.title.trim().length < 6 || newArticle.body.trim().length < 10 || newArticle.img =='' || 
														newArticle.tags.length == 0 || newArticle.catId =='' || newArticle.catId ==-1} 
													className='main-btn mb-4 mt-5 w-100' type='submit'
												>Upload the Article</button>
													
											</form>
											
										</div>

									:
										<div className='d-flex align-items-center justify-content-center my-5 py-5'>
											<Spinner className='spinner' animation="border" role="status">
												<span className="visually-hidden">Loading...</span>
											</Spinner>
										</div>
								}
								<h2 className=' mt-5 pt-4'>My Articles</h2>
								{
									deleteArticle.success !=''
									?
										<div className=' alert alert-success'>
											{deleteArticle.success}
										</div>
									:
										deleteArticle.error !=''
										?
											<div className=' alert alert-success'>
												{deleteArticle.error}
											</div>
										:
											''
								}
								{/* <div className="cards gap-3 d-flex flex-wrap justify-content-center justify-content-md-start my-4"> */}
								<div className={loading? "cards d-none my-4" : "cards d-grid my-4"}>
									{
										myArticles.list.length > 0
										?
										<FetchArticles req={MyArticlesReq}/>
										:
											myArticles.loading
											?
												<div className='d-flex align-items-center justify-content-center my-5 py-5'>
													<Spinner className='spinner' animation="border" role="status">
														<span className="visually-hidden">Loading...</span>
													</Spinner>
												</div>
											:
												<div className=' alert alert-info'>
													You have no any Articles. Create Your First One
												</div>
									}
								</div>
							</>
					}
					
				</div>
			</div>
		:
			<div className=" alert alert-secondary main-container">
				<NavLink to={'/SignIn'}>Login</NavLink> to be able to show article details
			</div>
	)
}

const FetchArticles = memo(({req})=>{
	// console.log('dddd')
	const {allMyArticles, showConfirmToDelete} = req
	return allMyArticles.map((article)=>(
		<ArticleCard key={article.id} card_data={{
			img: article.field_image,
			tag: article.field_tags,
			main_text: article.title,
			Author: article.author,
			to_article: `/Details/${article.id}`,
			to_edit: `/Edit/${article.id}`,
			fromProfile: true,
			deleteFunc: showConfirmToDelete,
			ID: article.id 
		}}/>
	))
})

export default My_Articles