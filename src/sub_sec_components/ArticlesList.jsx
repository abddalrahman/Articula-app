import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Spinner, Toast } from 'react-bootstrap';
import { NavLink } from 'react-router';
import ShowPath from './ShowPath';
import { ChangeLangContext } from '../App';
import CSRF_Token from '../assets/js/CSRF_Token';
import Confirm from '../special_components/Confirm';

const ArticlesList = () => {

	const noRerender = useRef(false)
	const noRerender2 = useRef(false)

	const [allArticles, setAllArticles] = useState({
		error: "",
		rows: [],
		loading: false
	});
	const [csrfToken, setCsrfToken] = useState({
		value: "",
		error: ""
	});
	const [deletedID, setDeletedID] = useState('');
	const [deleteArticle, setDeleteArticle] = useState({
		error: "",
		success: "",
		failedDeleteID: ""
	});
	const [searchParams, setSearchParams] = useState({
		text: "",
		cat: "",
		tag: ""
	});
	const [categories, setCategories] = useState({
		error: "",
		allCategories: []
	});
	const [tags, setTags] = useState({
		error: "",
		allTags: []
	});
	const [showConfirm, setSshowConfirm] = useState({
		id: 0,
		show: false
	})

	const {loginData} = useContext(ChangeLangContext)	

	useEffect(()=>{
		if(!noRerender.current){
			document.querySelector("header").classList.add('show');
			document.querySelector("footer").classList.add('show');
			
			// get csrf Token
			CSRF_Token({setFunc: setCsrfToken, vals: csrfToken})
			
			noRerender.current = true
		}
	}, [])

	// get categories and tags
	useEffect(()=>{
		if(! noRerender2.current){
	
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
						setCategories({
							error: 'Something Went Wrong!!',
							allCategories: [],
						})
					});
				}
				return res.json();
			})
			.then(data => {
				setCategories({
					error: "",
					allCategories: data
				})
			})
			.catch(err => {
				console.log(err.message)
				setCategories({
					error: 'Something Went Wrong!!',
					allCategories: [],
				})
			})
			// .finally(() => {
			// });
			
			// get tags
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
					error: "",
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
			
			noRerender2.current = true
		}
	}, [])

	useEffect(()=>{
				
		const passwordName = loginData
		if(passwordName){

			setAllArticles({
				...allArticles,
				loading: true
			})

			const {text: tx, cat: c, tag: tg } = searchParams
			fetch(`https://tamkeen-dev.com/api/blogs-api?items_per_page=50&search=${tx}&page=0${c}${tg}&sort_by=created_date&sort_order=DESC`, {
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
						setAllArticles({
							error: 'Something Went Wrong!!',
							rows: [],
							loading: false
						});
					});
				}
				return res.json();
			})
			.then(data => { 
				// console.log(data)
				setAllArticles({
					error: "",
					rows: data.rows,
					loading: false
				})
			})
			.catch(err => {
				console.log(err.message)
				setAllArticles({
					error: 'Something Went Wrong!!',
					rows: [],
					loading: false
				});
			})
			// .finally(() => {
			// });
		}else{
		setAllArticles('not loged')
		}

	},[deletedID, searchParams])

	const deleteArticleFunc = (type)=>{
		setDeleteArticle({
			error: "",
			success: "",
			failedDeleteID: ''
		})
		const articleID = showConfirm.id
		const passName = loginData
		
		if(type == 'y'){
			fetch(`https://tamkeen-dev.com/api/node/${articleID}?_format=json`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${passName.passName}`,
					'X-CSRF-Token': csrfToken.value
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						// console.log(data)
						setDeleteArticle({
							error: "Delete Failed",
							success: '',
							failedDeleteID: articleID
						});
					});
				}else{
					setDeleteArticle({
						...deleteArticle,
						error: '',
						success: "Delete Article Successfuly",
					});
					setDeletedID(articleID)
				}
			})
			.catch(err => {
				console.log(err.message)
				setDeleteArticle({
					error: "Delete Failed",
					success: '',
					failedDeleteID: articleID
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

	const closeToast = ()=>{
		setDeleteArticle({
			error: "",
			success: "",
			failedDeleteID: ""
		})
	}


	const handleSearchTextChange = (e)=>{
		setSearchParams({
			...searchParams,
			text: e.currentTarget.value
		})
	}

	const handleTagOrCatChange = (type, value)=>{
		if(type == 'cat'){
			if(value != -1){
				setSearchParams({
					...searchParams,
					cat: "&category=" + value.toString()
				})
			}else{
				setSearchParams({
					...searchParams,
					cat: ""
				})
			}
		}else{
			if(value != -1){
				setSearchParams({
					...searchParams,
					tag: "&tag=" + value.toString()
				})
			}else{
				setSearchParams({
					...searchParams,
					tag: ""
				})
			}
		}
	}

	return (
		<div className='articles-list-content'>
			{
				showConfirm.show && <Confirm c_info={{
					title:'Delete Article', body: `Are You Shur you want to Delete Article ${showConfirm.id}`, deleteFunc: deleteArticleFunc
				}}/>
			}
			<ShowPath path_info={{
				current:"Articles List",
				path_series:[
					{
						page:"Dashboard",
						pageLink:"/Dashboard"
					},
					{
						page:"ArticlesList",
						pageLink:"/ArticlesList"
					}
				]
			}}/>
			<div className='nav-container py-5'>
				{
					allArticles =='not loged'
					?
						<div className='alert alert-danger '>
							<NavLink to={'/SignIn'}>Login</NavLink> Why are you Here?. !!
						</div>
					:
						<>
							<h1 className='text-center mb-5 pt-5'>Articles List</h1>
							<div className='align-items-center my-5 row mx-0 p-3 pb-4 filtering-sec'>
								<h2 className='my-4'>Filter Articles</h2>
								<div className='position-relative serach-section d-flex align-items-center col-12 col-lg-4 mb-3 mb-lg-0'>
									<i className="fa-solid fa-magnifying-glass position-absolute"></i>
									<input className='ps-5' type="text" placeholder='Start Searching..'
										onInput={(e)=>handleSearchTextChange(e)}
										/>
								</div>
								<div className='d-flex flex-column filter-articles-sec col-12 col-lg-8'>
									<div className=' d-flex justify-content-between align-items-sm-center flex-wrap flex-column flex-sm-row gap-3'>
										<div className=' d-flex align-items-center'>
											<select id="" className='p-3 my-select-custom mb-0 w-100' 
												onChange={(e)=> handleTagOrCatChange('cat', e.currentTarget.value)}
											>
												<option value="-1">All Categories</option>
												{
													categories.allCategories.map((category)=>(
														<option key={category.id} value={category.id}>{category.name}</option>
													))
												}	
											</select>	
										</div>
										<div className='d-flex align-items-center'>
											<select id="" className='p-3 my-select-custom mb-0 w-100' 
												onChange={(e)=> handleTagOrCatChange('tag', e.currentTarget.value)}
											>
												<option value="-1">All Tags</option>
												{
													tags.allTags.map((tag)=>(
														<option key={tag.id} value={tag.id}>{tag.name}</option>
													))
												}	
											</select>	
										</div>
									</div>
								</div>
							</div>
							{
								allArticles.error != ''
								?
									<div className=' alert alert-danger'>
										{allArticles.error}
									</div>
								:
									allArticles.rows.length > 0
									?
										<div>
											<ul className='ps-0 articles-list-ul'>
												<li className='show-article list-head d-none d-md-flex'>
													<span className='img-span'>image</span><span className='title-span'>Title</span><span className='author-span'>Author</span>
													<span className='id-span'>ID</span><span className='date-span'>Create Date</span><span>Actions</span>
												</li>
												{
													allArticles.rows.map((article)=>{
														return <li key={article.id} className='show-article mb-4 mb-sm-0 flex-wrap flex-md-nowrap'>
															<span className='img-span'>
																<img className="rounded-circle" src={"https://tamkeen-dev.com" + article.field_image } alt={article.title} />
															</span>
															<span className='title-span'>
																<i className="fa-solid fa-heading d-inline-block d-md-none me-3"></i>
																{article.title.length > 20 ? article.title.slice(0,20)+ ".." : article.title}
															</span>
															<span className='author-span'><i className="fa-solid fa-pen-nib d-inline-block d-md-none me-3"></i>{article.author}</span>
															<span className='id-span'><i className="fa-solid fa-fingerprint d-inline-block d-md-none me-3"></i>{article.id}</span>
															<span className='date-span'><i className="fa-solid fa-calendar d-inline-block d-md-none me-3"></i>{article.created}</span>
															
															<span className='justify-content-between justify-content-md-evenly'>
																<button data-id={article.id} className='main-btn action-btns'
																	onClick={()=>setSshowConfirm({id: article.id, show: true})}
																	>Delete</button>
																<NavLink className='main-btn light-o action-btns' to={'#'}>Edit</NavLink>
															</span>
														</li>
													})
												}
											</ul> 
										</div>
									:
										allArticles.loading
										?
											<div className='d-flex align-items-center justify-content-center my-5 py-5'>
												<Spinner className='spinner' animation="border" role="status">
													<span className="visually-hidden">Loading...</span>
												</Spinner>
											</div>
										:
											<div className=' alert alert-info '>
												There are No Articles To Display
											</div>
							}
						</>
					
				}
			</div>
			{
				deleteArticle.success !='' || deleteArticle.error !=''
				?
					<Toast className=' position-fixed toast-delete-user' onClose={closeToast}>
						<Toast.Header>
							<span>{deleteArticle.success !=''? '✅' : '❗' }</span>
							<strong className="me-auto">{deleteArticle.success !=''? 'Success' : 'Failed' }</strong>
							<small>{deleteArticle.success !=''? 'Deletion succeeded' : 'Deletion failed'}</small>
						</Toast.Header>
						<Toast.Body>Article {deleteArticle.success !=''? "'" + deletedID + "'" + 'Deleted Successfuly' : "'" + deleteArticle.failedDeleteID + "'" + ' Failed To Delete'} </Toast.Body>
					</Toast>
				:
					''
			}
		</div>
	)
}


export default ArticlesList