import React, { useContext, useEffect, useRef, useState } from 'react'
import ArticleCard from './bigComponents/ArticleCard';
import { NavLink } from 'react-router';
import { Spinner } from 'react-bootstrap';
import ShowPath from './sub_sec_components/ShowPath';
import { ChangeLangContext } from './App';
import Pagination from './bigComponents/Pagination';

// css for this file in app.css

const Articles = () => {
	const noRerender = useRef(false)

	const [categories, setCategories] = useState({
		error: "",
		allCategories: []
	});
	const [tags, setTags] = useState({
		error: "",
		allTags: []
	});
	const [filter_cat_tag, setFilter_cat_tag] = useState({
		cat: '',
		tag: '',
		text:""
	});
	const [allArticles, setAllArticles] = useState({
		error: "",
		rows: [],
		loading: false
	});
	const [pagination, setPagination] = useState({
		current_page: 0,
		items_per_page: 15,
		total_items: '',
		total_pages: ''
	});

	const {loginData} = useContext(ChangeLangContext)

	// get categories and tags
	useEffect(()=>{
		if(! noRerender.current){
			document.querySelector("header").classList.add('show');
			document.querySelector("footer").classList.add('show');
	
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
					error: '',
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
			
			noRerender.current = true
		}
	}, [])

	useEffect(()=>{

		const passwordName = loginData
		const {items_per_page : items, current_page : page} = pagination
		const {cat, tag, text} = filter_cat_tag
		setAllArticles({
			...allArticles,
			loading: true
		})
		
		if(passwordName){
			fetch(`https://tamkeen-dev.com/api/blogs-api?items_per_page=${items}&search=${text}&page=${page}${cat}${tag}&sort_by=created_date&
				sort_order=DESC`, {
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
							rows: [],
							error: 'Something Went Wrong!!',
							loading: false
						});
					});
				}else{
					return res.json();
				}
			})
			.then(data => { 
				// console.log(data)
				setAllArticles({
					error: '',
					rows: data.rows,
					loading: false
				})
				setPagination({
					...pagination,
					total_items: data.pager.total_items,
					total_pages: data.pager.total_pages
				})
				// mack_pagination()
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
		
	},[pagination.current_page, pagination.items_per_page, filter_cat_tag])


	const handleTagOrCatChange = (type, value)=>{
		if(type == 'cat'){
			if(value != -1){
				setFilter_cat_tag({
					...filter_cat_tag,
					cat: "&category=" + value.toString()
				})
			}else{
				setFilter_cat_tag({
					...filter_cat_tag,
					cat: ""
				})
			}
		}else{
			if(value != -1){
				setFilter_cat_tag({
					...filter_cat_tag,
					tag: "&tag=" + value.toString()
				})
			}else{
				setFilter_cat_tag({
					...filter_cat_tag,
					tag: ""
				})
			}
		}
		setPagination({
			...pagination,
			current_page: 0
		})
	}

	const handleSearchTextChange = (e)=>{
		setFilter_cat_tag({
			...filter_cat_tag,
			text: e.currentTarget.value
		})
		setPagination({
			...pagination,
			current_page: 0
		})
	}

	return (
		allArticles != 'not loged'
		?
			<div className="articles-section pb-5">
				<ShowPath path_info={{
					current:"Articles",
					path_series:[
						{
							page:"Home",
							pageLink:"/"
						},
						{
							page:"Articles",
							pageLink:"/Articles"
						}
					]
				}}/>
				<div className="nav-container py-5">
					{
						allArticles.error != ''
						?
							<div className=' alert alert-danger'>
								{allArticles.error}
							</div>
						:
							<>
								<div className='align-items-center my-5 row mx-0 p-3 pb-4 filter-articles-sec mb-5'>
									<h2 className='my-4'>Filter Articles</h2>
									<div className='position-relative serach-section d-flex align-items-center col-12 col-lg-4 mb-3 mb-lg-0'>
										<i className="fa-solid fa-magnifying-glass position-absolute"></i>
										<input className='ps-5' type="text" placeholder='Start Searching..'
											onInput={(e)=>handleSearchTextChange(e)}
											/>
									</div>
									<div className=' d-flex justify-content-between align-items-sm-center flex-wrap gap-3 col-12 col-lg-8 flex-column flex-sm-row'>
										<div className=' d-flex align-items-center'>
											<select id="" className='p-3 my-select-custom mb-0 w-100' 
												onChange={(e)=> handleTagOrCatChange('cat', e.target.value)}
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
												onChange={(e)=> handleTagOrCatChange('tag', e.target.value)}
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
								{
									allArticles.loading
									?
										<div className='d-flex align-items-center justify-content-center my-5 py-5'>
											<Spinner className='spinner' animation="border" role="status">
												<span className="visually-hidden">Loading...</span>
											</Spinner>
										</div>
									:
										allArticles.rows.length > 0
										?
											<>
												{/* <div className="cards gap-3 d-flex flex-wrap justify-content-center justify-content-md-start"> */}
												<div className="cards d-grid">
													{
														allArticles.rows.map((article)=>(
															<ArticleCard key={article.id} card_data={{
																img: article.field_image,
																tag: article.field_tags,
																main_text: article.title,
																Author: article.author,
																date: article.created,
																to_article: `/Details/${article.id}` 
															}}/>
														))
													}
												</div>

											</>
										:
											<div className='alert alert-info'>
												There are No Articles to Display
											</div>
										
								}
								<div className={allArticles.loading || allArticles.rows.length == 0
									? 
										'd-none'
									: 
										'd-flex align-items-center justify-content-md-between my-5 flex-wrap gap-4 justify-content-start'}
								>

									<Pagination page_info={{pages: pagination, pagesChange: setPagination, id: 'pagination1'}}/>
									<select id="itmes-per-page" defaultValue={pagination.items_per_page} className='my-select-custom item-count-select px-3 mb-0'
										onChange={(e)=>{
												setPagination({
													...pagination,
													items_per_page: Number(e.target.value),
													current_page:0
												})
											}
										}
									>
										<option value="15">15 items Per Page</option>
										<option value="30">30 items Per Page</option>
										<option value="40">40 items Per Page</option>
									</select>
								</div>
								
							</>
							
								
							
					}
					
				</div>
			</div>
		:
			<div className=" alert alert-secondary main-container">
				<NavLink to={'/SignIn'}>Login</NavLink> to be able to show articles
			</div>
	)
}


export default Articles