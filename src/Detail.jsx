import React, { useContext, useEffect, useState } from 'react'
import { data, NavLink, useParams } from 'react-router';
import MainHead from './components/MainHead';
import { Spinner } from 'react-bootstrap';
import profilePlaceholder from './assets/images/user_placeholder.png';
import './assets/css/details.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ChangeLangContext } from './App';
import MainBtn from './components/MainBtn';

const Detail = () => {
	const { aId } = useParams();

	const [thereError, setThereError] = useState('')
	const [arDetails, setArDetails] = useState(null)
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState([])
	const [relatedArticles, setRelatedArticles] = useState({
		errors: "",
		articlesList: []
	})
	const [allTags, setAllTags] = useState({
		errors: "",
		tags: []
	})

	const {loginData} = useContext(ChangeLangContext)

	useEffect(()=>{
		setLoading(true)
		setThereError('')
		setRelatedArticles({
			...relatedArticles,
			errors: ''
		})
		setAllTags({
			...allTags,
			errors: ''
		})

		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
		
		const checkLoged = loginData
		if(checkLoged){
			if(Number(aId)){
				fetch(`https://tamkeen-dev.com/api/node/${aId}?_format=json`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Basic ${checkLoged.passName}`
					}
				})
				.then((res) => {
					if (!res.ok) {
						return res.json().then(data => {
							const error_is = data.message || 'Unknown error';
							console.log(error_is)
							setThereError('Something Went Wrong!!');
							setLoading(false)
						});
					}else{
						return res.json();
					}
				})
				.then(data => {
					// console.log(data)
					setLoading(false)
					if(data && data!= ''){
						setArDetails(data)
						getAuthor(data.uid[0].target_id, checkLoged.passName)
						// console.log(data.field_category[0].target_id)
						getRelatedArticles(data.field_category[0]?.target_id)
						getAllTags()
					}else{
						setThereError('this Article is not Available')
					}
				})
				.catch(err => {
					console.log(err.message)
					setThereError('Something Went Wrong!!');
					setLoading(false)
				}) 
				// .finally(() => {
				// });
			}else{
				setThereError('No Article Available')
			}
		}else{
			setArDetails('not loged')
		}	
		
	},[aId])
	
	const getRelatedArticles = (catId)=>{
		fetch(`https://tamkeen-dev.com/api/blogs-api?items_per_page=5&category=${catId}&sort_by=created_date&sort_order=DESC`, {
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
					setRelatedArticles({
						errors: 'Something Went Wrong!!',
						articlesList: [],
					});
				});
			}else{
				return res.json();
			}
		})
		.then(data => {
			// console.log(data)
			setRelatedArticles({
				errors: '',
				articlesList: data.rows
			})
		})
		.catch(err => {
			setRelatedArticles({
				errors: err.message,
				articlesList: []
			});
		}) 
		// .finally(() => {
		// });
	}

	const getAuthor = (id, checkLoged)=>{
		fetch(`https://tamkeen-dev.com/api/user/${id}?_format=json`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${checkLoged}`
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setThereError('Something Went Wrong!!');
				});
			}
			return res.json();
		})
		.then(data => {
			// console.log(data)
			setUserData(data)
		})
		.catch(err => {
			console.log(err.message)
			setThereError('Something Went Wrong!!');
		})
		// .finally(() => {
			// });
	}

	const getAllTags = ()=>{
		fetch('https://tamkeen-dev.com/api/terms/tags', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setAllTags({
						error: 'Something Went Wrong!!',
						tags: [],
					});
				});
			}
			return res.json();
		})
		.then((data)=>{
			// console.log(data)
			setAllTags({
				errors: '',
				tags: data
			});
		})
		.catch(err => {
			console.log(err.message)
			setAllTags({
				error: 'Something Went Wrong!!',
				tags: [],
			});
		})
		// .finally(()=>{
		// })
	}

	return (
		<div className='article-details py-5'>
			<div className='nav-container'>
			<MainHead content="Article Details"/>
			{
				loginData
				?
					thereError == ''
					?
						arDetails !=null
						?
							arDetails =='not loged'
							?
								<div className=" alert alert-secondary">
									<NavLink to={'/SignIn'}>Login</NavLink> to be able to show article details
								</div>
							:
								<div className="row details">

									<div className="main-details col-12 col-lg-8 px-0 mb-5"
										data-aos="fade-right" data-aos-delay="100" data-aos-duration="500"
									>
										<div className='main-articles-img position-relative mb-5'>
											<img src={arDetails.field_image[0].url} alt={arDetails.title[0].value} />
											<h1>{arDetails.title[0].value}</h1>
										</div>
										<h3 className='sec-head'>Article Body</h3>
										{
											arDetails.body[0]
											?
												<p className='mb-5' dangerouslySetInnerHTML={{ __html: arDetails.body[0].value }}></p>
											:
												<p className='mb-5'>Articles Body is Empty..</p>
										}
										<h3 className='sec-head'>Article Tags</h3>
										{
											allTags.errors ==''
											?
												<div className=' d-flex align-items-center gap-4 flex-wrap mb-5'>
													{
														arDetails.field_tags.length > 0 && allTags.tags.length > 0
														?
															arDetails.field_tags.map((tag)=>(
																<MainBtn key={tag.target_id} link_info={{
																	link_classes:"main-btn",
																	link_to: '/Tags?id=' + tag.target_id,
																	content: allTags.tags.filter((tagIs)=> tagIs.id == tag.target_id)[0].name
																}}/>
															))
														:
															<div className='alert alert-info'>
																There is no Tags for this Article
															</div>
													}
												</div>
											:
												<div className='alert alert-info'>
													Can't Get Tags!
												</div>
										}

										<h3 className='sec-head'>Article Gallery</h3>
										{
											arDetails.field_gallery.length > 0
											?
												<div className='gallery-image-holder d-flex align-items-center gap-2 flex-wrap'>
													{arDetails.field_gallery.map((img) => (
														<div key={img.target_id}>
															<img src={img.url} alt={img.title != '' ? img.title : 'gallery image'}/>
														</div>
													))}
												</div>
											:
												<div className='alert alert-info'>
													There is no Gallery for this Article
												</div>
										}	
									</div>
									<div className="additional-info col-12 col-lg-4 px-0 ps-lg-5"
										data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
									>
										<div className='d-flex flex-column gap-4 pb-4'>
											<h3 className='sec-head light-head mb-4'>Additional Info</h3>
											<span className='d-flex gap-2'><span>Publication Date:</span> <span>{arDetails.created[0].value}</span></span>
											<span className='d-flex gap-2'><span>Latest Update:</span> <span>{arDetails.changed[0].value}</span></span>
											<span className='d-flex gap-2'><span>Article language:</span> <span>{arDetails.langcode[0].value}</span></span>
											<span className='d-flex gap-2'><span>Article ID:</span> <span>{arDetails.nid[0].value}</span></span>
											{
												userData != ''
												?
												<span className='d-flex'><span>Author:</span> 
														<div>
															<span className='me-3'>{userData.field_name[0].value + ' ' + userData.field_surname[0].value}</span>
															<img 
																className='rounded-circle' 
																src={userData.user_picture.length > 0 ? userData.user_picture[0].url : profilePlaceholder}
																alt="personal image" 
															/>
														</div>
													</span>
												:
													<span><span>Author:</span> <span>Unknown Author</span></span>
												}
										</div>
										<h3 className='sec-head light-head mb-5 pt-5 text-center text-sm-start'>Related Articles</h3>
										<div className='related-articles d-flex flex-row flex-lg-column gap-2 gap-lg-4 flex-wrap justify-content-center justify-content-sm-start'>
											{
												relatedArticles.articlesList.length > 0
												?
													relatedArticles.articlesList.map((oneArt)=>(
														oneArt.id != aId
														?
															<NavLink className=" d-flex flex-column" key={oneArt.id} to={'/Details/' + oneArt.id} 
																data-aos="zoom-in" data-aos-delay="100" data-aos-duration="500"
															>
																<div className='mb-3'>
																	<img src={"https://tamkeen-dev.com" + oneArt.field_image} alt={oneArt.title} />
																</div>
																<h5>{oneArt.title}</h5>
																<p>{oneArt.body.slice(0, 50)}</p>
															</NavLink>
														:
															''
													))
												:
													<div className=" alert alert-info">
														No Related Articles
													</div>
											}
										</div>
									</div>
									
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
								<div className=" alert alert-info">
									There is no Data to Display.
								</div>
					:
						<div className=" alert alert-danger">
							{thereError}
						</div>
				:
					<div className=" alert alert-secondary main-container">
						<NavLink to={'/SignIn'}>Login</NavLink> to be able to show article details
					</div>
			}
			</div>
		</div>
	)
}

export default Detail