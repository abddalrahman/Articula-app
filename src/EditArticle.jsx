import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router';
import Form_input from './components/Form_input';
import ShowPath from './sub_sec_components/ShowPath';
import { ChangeLangContext } from './App';
import CSRF_Token from './assets/js/CSRF_Token';

const EditArticle = () => {
	const noRerender1 = useRef(false)

	const [articleDetails, setArticleDetails] = useState('');
	const [theErrors, setTheErrors] = useState({
		getArticleE: "",
		uploadGallery: "",
		uploadArticle: ""
	});
	const [csrfToken, setCsrfToken] = useState({
		value: "",
		error: ""
	});
	const [newGallery, setNewGallery] = useState({
		gallery:[],
		error: "",
		fileToSend: ""
	})
	const [tags, setTags] = useState({
		error: "",
		allTags: []
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [processing, setProcessing] = useState({
		isProccess: false,
		percentage: 0
	});

	const {loginData} = useContext(ChangeLangContext)

	const { aId } = useParams();
	
	useEffect(()=>{
		if(! noRerender1.current){
			document.querySelector("header").classList.add('show');
			document.querySelector("footer").classList.add('show');
			noRerender1.current = true
		}
		
	}, [])
	
	useEffect(()=>{
		if(loginData){
			fetch(`https://tamkeen-dev.com/api/node/${aId}?_format=json`, {
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
						setTheErrors({
							...theErrors,
							getArticleE: 'failed to get articles'
						})
					});
				}else{
					return res.json();
				}
			})
			.then(data => {
				// console.log(data)
				const onlyTags = []
				const gallery_ids = []
				data.field_tags.map((tag)=>{
					onlyTags.push(tag.target_id)
				})
				data.field_gallery.map((gallery)=>{
					gallery_ids.push(gallery.target_id)
				})
				setArticleDetails({
					uid: data.uid[0].target_id,
					title: data.title[0].value,
					body: data.body[0].value,
					galleryIDs: gallery_ids,
					tags: onlyTags,
					title2: data.title[0].value,
					body2: data.body[0].value,
					galleryIDs2: gallery_ids,
					tags2: onlyTags
				})
			})
			.catch(err => {
				console.log(err.message)
				setTheErrors({
					...theErrors,
					getArticleE: 'failed to get articles'
				})
			}) 
			// .finally(() => {
			// });

			// get csrf----------------------------------------------------------------
			CSRF_Token({setFunc: setCsrfToken, vals: csrfToken})

			// get tags----------------------------------------------------------------
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
						setTags({
							error: 'Something Went Wrong!!',
							allTags: [],
						})
					});
				}
				return res.json();
			})
			.then(data => {
				setTags({
					error: '',
					allTags: data
				})
			})
			.catch(err => {
				console.log(err.message)
				setTags({
					error: 'Something Went Wrong!!',
					allTags: [],
				})	
			})
			// .finally(() => {
			// });

		}
	}, [loginData, aId, successMessage])

	const validationTest = ()=>{
		const {title2, body2} = articleDetails
		if(title2 && body2){
			if(title2.trim().length < 6 || body2.trim().length < 10){
				return false
			}else{return true}
		}else{
			return false
		}
	}

	const handleFileGalleryChange = useCallback((e)=>{
		setNewGallery({
			...newGallery,
			error:""
		})
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
						setNewGallery({
							...newGallery,
							error: 'File Type Must Be "image"'
						});
					}
				}
			}

		}else{
			fileName.textContent="No File Chosen"
		}
		setNewGallery({
			...newGallery,
			gallery: allGalleryImages,
			fileToSend: filesPassed
		})
	}, [])

	// handleTagChange----------------------------------------------------
	const handleTagChange = (e)=>{
		// e.target.classList.toggle('tag-selected')
		const tagID = Number(e.target.getAttribute('data-id'));
		let selectedTags = [...articleDetails.tags2]
		if(selectedTags.includes(tagID)){
			selectedTags = selectedTags.filter((itme)=> itme != tagID)
		}else{
			selectedTags.push(tagID)
		}
		// console.log(selectedTags)
		// console.log(articleDetails.tags2)
		setArticleDetails({
			...articleDetails,
			tags2: selectedTags
		})
	}

	const checkArraysIfEqual = (arr1, arr2)=>{
		if(arr1.length != arr2.length) return false
		const arr1Sort = arr1.sort((a, b) => a - b)
		const arr2Sort = arr2.sort((a, b) => a - b)

		let resultIs = true
		arr1Sort.map((item, index)=>{
			if (item != arr2Sort[index]){
				resultIs =false
			}
		})
		return resultIs
	}

	const uploadAllchanges = (passed_gallery = null)=>{
		const gallery_ids_array = passed_gallery != null ? passed_gallery : []
		const gallery_obj = []
		if(gallery_ids_array.length == 0){
			articleDetails.galleryIDs2.map((id)=>{
				gallery_obj.push({
					target_id: id
				})
			})
		}else{
			gallery_ids_array.map((id)=>{
				gallery_obj.push({
					target_id: id
				})
			})
		}
		const tags_obj = []
		articleDetails.tags2.map((id)=>{
			tags_obj.push({
				target_id: id
			})
		})
		// console.log(tags_obj)
		// console.log(gallery_obj)
		fetch(`https://tamkeen-dev.com/api/node/${aId}?_format=json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${loginData.passName}`,
				'X-CSRF-Token': csrfToken
			},
			body: JSON.stringify({
				"type": [{
					"target_id": "blog"
				}],
				"title": [{
					"value": articleDetails.title2,
				}],
				"body": [{
					"value": articleDetails.body2,
					"format": "full_html"
				}],
				"field_gallery":gallery_obj,
				"field_tags": tags_obj
			}) 
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setTheErrors({
						...theErrors,
						uploadArticle: 'failed to upload articles'
					});
					setProcessing({
						isProccess: false,
						processing: 0
					})
				});
			}else{
				return res.json();
			}
		})
		.then(data => {
			// console.log(data)
			setNewGallery({
				gallery:[],
				error: "",
				fileToSend: ""
			})
			const onlyTags = []
			const gallery_ids = []
			data.field_tags.map((tag)=>{
				onlyTags.push(tag.target_id)
			})
			data.field_gallery.map((gallery)=>{
				gallery_ids.push(gallery.target_id)
			})
			setArticleDetails({
				uid: data.uid[0].target_id,
				title: data.title[0].value,
				body: data.body[0].value,
				galleryIDs: gallery_ids,
				tags: onlyTags,
				title2: data.title[0].value,
				body2: data.body[0].value,
				galleryIDs2: gallery_ids,
				tags2: onlyTags
			})
			setSuccessMessage("Article Updated Successfuly")
			setProcessing({
				isProccess: false,
				processing: 0
			})
		})
		.catch(err => {
			console.log(err.message)
			setTheErrors({
				...theErrors,
				uploadArticle: 'failed to upload articles'
			});
			setProcessing({
				isProccess: false,
				processing: 0
			})
		})
		.finally(() => {
			document.querySelector('form input#uploadImg-imges').value = ''
			document.querySelector('form .show-img-title').textContent = 'No File Chosen'
		});
	}

	const handleEditSubmit = (e)=>{
		e.preventDefault()
		setSuccessMessage('')
		setProcessing({
			...processing,
			isProccess: true
		})
		const isValid = validationTest()
		if(!isValid || articleDetails.tags2.length == 0){
			setSuccessMessage('Enter This Data place [title: 6 or more letters, body 10 or more lettter, tags(one or more)]')
			setProcessing({
				...processing,
				isProccess: false
			})
			setArticleDetails({
				...articleDetails,
				tags2: [...articleDetails.tags]
			})
		}else{
			if(newGallery.gallery.length > 0){
				const galleryIds = []
				const uploadall = newGallery.fileToSend.map((file, index)=>{
					const file_name = file.name
					return fetch(`https://tamkeen-dev.com/api/file/upload/node/blog/field_gallery?_format=json`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/octet-stream',
							'Authorization': `Basic ${loginData.passName}`,
							'X-CSRF-Token': csrfToken,
							'Content-Disposition': `file; filename="${file_name}"`,
						},
						body: file
					})
					.then((res) => {
						if (!res.ok) {
							return res.json().then(data => {
								const error_is = data.message || 'Unknown error';
								console.log(error_is)
								setTheErrors({
									...theErrors,
									uploadGallery: 'failed to upload gallery'
								});
								setProcessing({
									...processing,
									isProccess: false
								})
							});
						}else{
							return res.json();
						}
					})
					.then(data => {
						// console.log(data)
						galleryIds.push(data.fid[0].value)
						setProcessing({
							isProccess: true,
							percentage: (100/newGallery.fileToSend.length * (index+1))
						})
					})
					.catch(err => {
						console.log(err.message)
						setTheErrors({
							...theErrors,
							uploadGallery: 'failed to upload gallery'
						});
						setProcessing({
							...processing,
							isProccess: false
						})
					})
					// .finally(() => {
					// });
				})
				Promise.all(uploadall).then(() => {
					setArticleDetails({
						...articleDetails,
						galleryIDs2: galleryIds
					});
					uploadAllchanges(galleryIds)
				});
			}else{
				uploadAllchanges()
			}
		}
	}

	return (
		<div className='edit-article-conent  pb-5'>
			<ShowPath path_info={{
				current:"Edit Article",
				path_series:[
					{
						page:"Home",
						pageLink:"/"
					},
					{
						page:"My Articles",
						pageLink:"/My_Articles"
					},
					{
						page:"Edit",
						pageLink:"/Edit"
					}
				]
			}}/>
			<div className={processing.isProccess ? 'cover-l position-fixed' : 'cover-l position-fixed d-none'}></div>
			<div className='nav-container py-5'>
				{
					loginData
					?
						theErrors.getArticleE != ''
						? 
							<div className='alert alert-danger'>
								{theErrors.getArticleE}
							</div>
						:
							articleDetails !=''
							?
								loginData.uId == articleDetails.uid
								?
									<>
										<h1>Edit Your Article</h1>
										{/* <h2 className='mb-3'>{articleDetails.title}</h2> */}
										{
											successMessage != ''
											?
												<div className=' alert alert-success'>
													{successMessage}
												</div>
											:	
												''
										}
										
									
										<form className='p-2 p-md-4'>
											<Form_input input_info={{
												label:"Title",
												inp_placeholder:"Title 'at least 6 characters'",
												inp_type:"y",
												inp_classes:"",
												all_date: articleDetails,
												path: "title2",
												value: articleDetails.title2,
												eventHandle: setArticleDetails,
												disabled: processing.isProccess
											}}/>
											<Form_input input_info={{
												label:"Body",
												inp_placeholder:"Body 'at least 10 characters'",
												inp_type:"text",
												inp_classes:"",
												all_date: articleDetails,
												path: "body2",
												value: articleDetails.body2,
												eventHandle: setArticleDetails,
												disabled: processing.isProccess
											}}/>
											<div className='choos-img gallery-imgs d-flex gap-3 mb-3 mt-1 align-items-center flex-column'>
												<div className='w-100 d-flex gap-2 flex-wrap'>
													{
														newGallery.gallery.length > 0
														?
														
															newGallery.gallery.map((img, index)=>(
																<img key={index} src={img} alt={`gallery image ${index}`}/>
															))
														:
															''
													}
												</div>
												{
													newGallery.error != ''
													?
														<div className=" alert alert-secondary">
															{newGallery.error}
														</div>
													:
														''
												}
												<div className='w-100 d-flex flex-column gap-1'>
													<p className='mb-0'>To not change the Gallery, leave this field blank.</p>
													<div className=' d-flex align-items-center p-2 rounded-1'>
														<label htmlFor="uploadImg-imges">Choose File</label>
														<span className='mx-4 file-name show-img-title'>No File Chosen</span>
														<input className=' d-none' id='uploadImg-imges' type="file" multiple disabled={processing.isProccess}
															onChange={(e)=> handleFileGalleryChange(e)}
														/>
													</div>
												</div>
											</div>

											<h3 className='mt-4 mb-3'>Select the Tags You Want</h3>
											<div className='select-tags d-flex align-items-center gap-4 flex-wrap'>
												{
													tags.allTags.length > 0
													?
														tags.allTags.map((tag)=>(
															<span key={tag.id} data-id={tag.id} className={articleDetails.tags2.includes(Number(tag.id)) ? 'tag-selected py-2 px-3': 'py-2 px-3'}
																onClick={(e)=> processing.isProccess ? '' : handleTagChange(e)}
															>
																#{tag.name}
															</span>
														))
													:
														''
												}
											</div>
											{
												newGallery.gallery.length > 0 || articleDetails.title != articleDetails.title2 || articleDetails.body != articleDetails.body2 || !checkArraysIfEqual(articleDetails.tags, articleDetails.tags2)
												?
													<button disabled={(!validationTest()) || processing.isProccess} 
													className='main-btn mb-4 mt-5 w-100' type='submit'
														onClick={(e)=>handleEditSubmit(e)}
													>
														Save Changes
													</button>
												:
													''
											}
										</form>
										
										{
											processing.isProccess
											?
												<div className='position-fixed processing-updaate p-4'>
													<div>
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
														<span><span style={{width:`${processing.percentage}%`}}></span></span>
													</div>
												</div>	

											:
												''
										}
									</>
								:
									<div className=' alert alert-danger'>
										You do not have permission to access this page.
									</div>
							:
							<div className='d-flex align-items-center justify-content-center my-5 py-5'>
								<Spinner className='spinner' animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							</div>
					:
						<div className='alert alert-danger'>
							<NavLink to={'/SignIn'}>Login</NavLink> to Access This Page.
						</div>
				}
			
			</div>
		</div>
	)
}

export default EditArticle
