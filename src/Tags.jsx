import React, { useContext, useEffect, useState } from 'react'
import { ChangeLangContext } from './App';
import ArticleCard from './bigComponents/ArticleCard';
import { Spinner } from 'react-bootstrap';
import Pagination from './bigComponents/Pagination';
import { NavLink } from 'react-router';

const Tags = () => {
	const params = new URLSearchParams(window.location.search);
	const idIs = params.get('id');

	const [allArticles, setAllArticles] = useState({
		error:"",
		articles: [],
		loading: false
	})
	const [tagName, setTagName] = useState({
		error:"",
		name: "",
	})
	const [pagination, setPagination] = useState({
		current_page: 0,
		items_per_page: 40,
		total_items: '',
		total_pages: ''
	});
	

	const {loginData} = useContext(ChangeLangContext)

	useEffect(()=>{
		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
		
		if(!loginData) return

		setAllArticles({
			...allArticles,
			loading: true
		})


		if(idIs && !isNaN(Number(idIs)) && idIs.trim() != ''){
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
						setTagName({
							name: '',
							error: 'Something Went Wrong!!'
						});
					});
				}else{
					return res.json();
				}
			})
			.then((data)=>{
				// console.log(data)
				let TagNameIS = ""
				data.map((tag)=>{
					if(tag.id == idIs){
						TagNameIS = tag.name
					}
				})
				setTagName({
					error: '',
					name: TagNameIS
				});
			})
			.catch(err => {
				console.log(err.message)
				setTagName({
					error: 'Something Went Wrong!!',
					name: '',
				});
			})
			// .finally(()=>{
			// })

			const {current_page: cp, items_per_page: ipp} = pagination

			fetch(`https://tamkeen-dev.com/api/blogs-api?items_per_page=${ipp}&page=${cp}&tag=${idIs}&sort_by=created_date&sort_order=DESC`, {
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
						setAllArticles({
							error: 'Something Went Wrong!!',
							articles : [],
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
					articles: data.rows,
					loading: false
				})
				setPagination({
					...pagination,
					total_items: data.pager.total_items,
					total_pages: data.pager.total_pages
				})
			})
			.catch(err => {
				console.log(err.message)
				setAllArticles({
					error: 'Something Went Wrong!!',
					articles : [],
					loading: false
				});
			})
			// .finally(() => {
			// });
		}
		
	}, [pagination.current_page, pagination.items_per_page])

	return (
		<div className='articles-by-tag py-5'>
			<div className='nav-container'>
				{
					loginData
					?
						idIs && !isNaN(Number(idIs)) && idIs.trim() != ''
						?
							allArticles.error ==''
							?
								<>
									{tagName.error == ''? <h1 className='mb-5 mt-3 text-center'>Tag: {tagName.name}</h1> : '' } 
									
									{
										allArticles.articles.length > 0 && !allArticles.loading
										?
											<>
												{/* <div className="cards gap-3 d-flex flex-wrap justify-content-center justify-content-md-start"> */}
												<div className="cards d-grid">
													{
														allArticles.articles.map((article)=>(
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
											allArticles.loading
											?
												<div className='d-flex align-items-center justify-content-center my-5 py-5'>
													<Spinner className='spinner' animation="border" role="status">
														<span className="visually-hidden">Loading...</span>
													</Spinner>
												</div>
											:
												<div className='alert alert-info'>
													There are No Articles for this Tag
												</div>
									}
									{
										<div className={allArticles.loading || allArticles.articles.length == 0
											? 
												'd-none'
											: 
												'd-flex align-items-center my-5 flex-wrap gap-4 '}
										>

											<Pagination page_info={{pages: pagination, pagesChange: setPagination, id: 'pagination2'}}/>
										</div>
									}
								</>
							:
								<div className='alert alert-danger'>
									{allArticles.error}
								</div>
								
						:
							<div className='alert alert-danger'>
								Something Want Wrong!!
							</div>
					:
						<div className=" alert alert-secondary main-container">
							<NavLink to={'/SignIn'}>Login</NavLink> to be able to show Articles
						</div>
				}
			</div>
		</div>
	)
}

export default Tags
