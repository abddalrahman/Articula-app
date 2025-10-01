import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import MainHead from '../components/MainHead'
import ArticleCard from '../bigComponents/ArticleCard'
import { ChangeLangContext } from '../App'
import { Spinner } from 'react-bootstrap'

const LatestArticles = () => {

	const noRerender = useRef(false)

	const [lastArticles, setLastArticles] = useState({
		error: "",
		theList: [],
		loading: false
	});


	useEffect(()=>{
		setLastArticles({
			...lastArticles,
			loading: true
		})

		if(! noRerender.current){
			const passwordName = btoa("tamkeen"+":"+"123456")
			fetch(`https://tamkeen-dev.com/api/blogs-api?items_per_page=10&page=0&sort_by=created_date&sort_order=DESC`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${passwordName}`
				}
			})
			.then((res) => {
				if (!res.ok) {
					return res.json().then(data => {
						const error_is = data.message || 'Unknown error';
						console.log(error_is)
						setLastArticles({
							error:"Something Went Wrong!!",
							theList: [],
							loading: false
						});
					});
				}else{
					return res.json();
				}
			})
			.then(data => { 
				if(data){
					setLastArticles({
						error: "",
						theList: data.rows,
						loading: false
					})
				}
			})
			.catch(err => {
				console.log(err.message)
				setLastArticles({
					error:"Something Went Wrong!!",
					theList: [],
					loading: false
				});
			})
			// .finally(() => {
			// });

			noRerender.current = true
		}
	},[])


	const latestArticlesReq = useMemo(() => ({
		allArticles: lastArticles.theList
	}), [lastArticles.theList])

	return (
		<section className="latest-articles pb-5">
        <div className="main-container pb-5">
          <MainHead content="Latest Articles"/>
					{
						lastArticles.error != ''
						?
							<div className=' alert alert-danger'>
								{lastArticles.error}
							</div>
						:
							// <div className="cards gap-3 d-flex flex-wrap justify-content-center justify-content-md-start">
							<>
								{
									lastArticles.loading
									?
										<div className='d-flex align-items-center justify-content-center my-5 py-5'>
											<Spinner className='spinner' animation="border" role="status">
												<span className="visually-hidden">Loading...</span>
											</Spinner>
										</div>
									:
										lastArticles.theList.length > 0
										?
											<div className="cards d-grid">
												<ShowLatestArticles req={latestArticlesReq}/>
											</div>
										:
											<div className=' alert alert-info'>
												There is no Articles Available
											</div>
								}
							</>
					}
          
        </div>
      </section>
	)
}

const ShowLatestArticles = memo(({req})=>{
	// console.log('aaaaaa')
	return req.allArticles.map((article)=>(
		<ArticleCard key={article.id} card_data={{
			img: article.field_image,
			tag: article.field_tags,
			main_text: article.title,
			Author: article.author,
			date: article.created,
			to_article: `/Details/${article.id}` 
		}}/>
	))
})

export default LatestArticles