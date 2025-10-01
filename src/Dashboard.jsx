import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import MainHead from './components/MainHead';
import Statistic from './components/Statistic';
import './assets/css/dashboard.css';
import HeadParaBtn from './components/HeadParaBtn';
import MainBtn from './components/MainBtn';
import GraphicalColumns from './bigComponents/GraphicalColumns';
import ArticleCard from './bigComponents/ArticleCard';
import TodayInfo from './components/TodayInfo';
import { ChangeLangContext } from './App';
import { Spinner } from 'react-bootstrap';

const Dashboard = () => {
	
	const noRerender1 = useRef(false)

	// const [loged, setLoged] = useState(false);
	const [activity, setActivity] = useState('users');
	const [maxVal, setMaxVal] = useState(0);
	const [dateToday, setDateToday] = useState('');
	const [getArticles, setGetArticles] = useState([]);
	const [items_per_page, setItems_per_page] = useState(10);
	const [articlesCount, setArticlesCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [allErrors, setAllErrors] = useState('');
	const [usersCount, setUsersCount] = useState({
		error: '',
		users: 0,
	});

	const {loginData} = useContext(ChangeLangContext)

	useEffect(()=>{
		if(!noRerender1.current){
			document.querySelector("header").classList.add('show');
			document.querySelector("footer").classList.add('show');
			const date = new Date()
			setDateToday(date.toDateString())
			getUsersCount()
			noRerender1.current = true
		}
	}, [])

	useEffect(()=>{

		// get Articles
		// const p_n = pass_name()============

		if(loginData){
			setLoading(true)
			
			// const itmeToShow = items_per_page > 50? items_per_page % 50 || 50 : items_per_page
			// const pageIs = Math.ceil(items_per_page/50) - 1
			const itmeToShow = items_per_page
			
			fetch(`https://tamkeen-dev.com/api/blogs-api?items_per_page=${itmeToShow}&page=0&sort_by=created_date&sort_order=DESC`, {
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
						setAllErrors('Something Went Wrong!!');
						setLoading(false)
					});
				}
				return res.json();
			})
			.then(data => { 
				setGetArticles(data.rows)
				setLoading(false)
				setArticlesCount(data.pager.total_items)
				setAllErrors('')
			})
			.catch(err => {
				console.log(err.message)
				setAllErrors('Something Went Wrong!!');
				setLoading(false)
			})
			// .finally(()=>{})
		}
	},[items_per_page])

	const getUsersCount = ()=>{
		fetch(`https://tamkeen-dev.com/api/users-list?_format=json&name=&field_name=&mail&field_gender=9&status=1&field_surname=`, {
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
						setUsersCount({
							error: 'Something Went Wrong!!',
							users: 0
						})
					});
				}else{
					return res.json();
				}
			})
			.then(data => {
				setUsersCount({
					error: '',
					users: data.pager.total_items,
				})
			})
			.catch(err => {
				console.log(err.message)
				setUsersCount({
					error: 'Something Went Wrong!!',
					users: 0
				})
			})
			// .finally(() => {
			// });

	}

	const handleOpenCleoseAside = useCallback((todo)=>{
		const aside = document.querySelector('aside.today-aside')
		todo == 'open'
		?
			aside.classList.add('show')
		:
			aside.classList.remove('show')
	}, [])


	const StatisticReq = useMemo(() => ({
    users: usersCount.error == '' ? usersCount.users: 'Error!',
    articles: articlesCount
	}), [usersCount, articlesCount])

	const asideReq = useMemo(() => ({
    open_close_func: handleOpenCleoseAside,
    dateIS: dateToday
	}), [handleOpenCleoseAside, dateToday])

	const activityReq = useMemo(() => ({
		maxIs: maxVal,
    changeMax: setMaxVal,
    act: activity,
    changeAct: setActivity
	}), [maxVal, activity])

	const articlesReq = useMemo(() => ({
		allArticles: getArticles,
		items: items_per_page,
		count: articlesCount,
		load: loading,
		changeItems: setItems_per_page
	}), [getArticles, items_per_page, articlesCount, loading])


	return (
		loginData
		?
			<div className='dashboard-content'>
				<span className='position-fixed  rounded-circle open-aside' onClick={()=> handleOpenCleoseAside('open')}>Today</span>
				<AsideDom req={asideReq}/>
				
				<div className="nav-container">
					<StatisticDom req={StatisticReq}/>
					<ManagementDom/>
					<ActivityDom req={activityReq}/>
					
					<div className='not-active-articles pb-5'>
						<MainHead content="Not Active Articles"/>	
						{
							allErrors !=''
							?
								<div className='alert alert-danger'>
									{allErrors}
								</div>
							:
								getArticles.length > 0
								?
									<ArticlesDom req={articlesReq}/>
									
								:	
									loading
									?
										<div className='d-flex align-items-center justify-content-center my-5 py-5'>
											<Spinner className='spinner' animation="border" role="status">
												<span className="visually-hidden">Loading...</span>
											</Spinner>
										</div>
									:
										<div className='alert alert-info'>
											No Articles To Display
										</div>
						}	
					</div>
				</div>
			</div>
		:
			<div className='nav-container my-5 py-5'>
				<div className='alert alert-danger'>
					You do not have permission to access this page.
				</div>
			</div>
	)
}

const AsideDom = memo(({req})=>{
	// console.log('aside')
	const {open_close_func, dateIS} = req
	return <aside className='position-fixed today-aside p-4 overflow-auto'>
		<span className=' d-flex align-items-center justify-content-center close-aside' onClick={()=> open_close_func('close')}>
			<i className="fa fa-close"></i>
		</span>

		<p>Today {dateIS}</p>
		<div className='today-info'>
			<TodayInfo info={{title:"Users", count:"127"}}/>
			<TodayInfo info={{title:"Writer", count:"-1"}}/>
			<TodayInfo info={{title:"Messages", count:"0"}}/>
			<TodayInfo info={{title:"Articles", count:"43"}}/>
			<TodayInfo info={{title:"Visits", count:"1538"}}/>
		</div>

		<MainBtn link_info={{
			btn_type:"btn",
			link_classes:"main-btn w-100 mt-5",
			content:"Update",
			icon_classes:"fa fa-refresh ms-2",
		}}/>

		<MainBtn link_info={{
			link_classes:"main-btn w-100 mt-4",
			content:"Daily report",
			link_to:"#",
			icon_classes:"fas fa-file ms-2",
		}}/>
	</aside>
})

const StatisticDom = memo(({req})=>{
	const {users, articles} = req
	// console.log('ddd')
	return <div className='statistics mb-4'>
		<MainHead content="Statistics"/>
		<div className=' d-flex align-items-center gap-4 flex-wrap'>
			<Statistic info={{
				title:"Users",
				count: users,
				icon_classes:"fa-solid fa-user",
				box_classes:"orange",
				link_to:"#"
			}}/>
			<Statistic info={{
				title:"Writers",
				count: Math.floor(articles/7) + 10,
				icon_classes:"fa-solid fa-pen-nib",
				box_classes:"blue",
				link_to:"#"
			}}/>
			<Statistic info={{
				title:"Messages",
				count: (users * 13) + 44,
				icon_classes:"fa-solid fa-envelope",
				box_classes:"green",
				link_to:"#"
			}}/>
			<Statistic info={{
				title:"Visits",
				count: (users * 1999) + 177,
				icon_classes:"fa-solid fa-eye",
				box_classes:"gray",
				link_to:"#"
			}}/>
			<Statistic info={{
				title:"Articles",
				count: articles,
				icon_classes:"fa-solid fa-newspaper",
				box_classes:"red",
				link_to:"#"
			}}/>
		</div>
	</div>
})

const ManagementDom = memo(()=>{
	// console.log('mmm')
	return <div className='management pb-4'>
		<MainHead content="Management"/>
		<div className='manage-units d-flex flex-column gap-4 align-items-center'>
			<div className="manage-unit d-flex justify-content-between align-items-end p-3 gap-3">
				<div>
					<HeadParaBtn all_content={{
						head_t:"User",
						para_t:"Control users. You can delete and add a user or modify a user's permissions.",
						important:"h3",
						btns:[]
					}}/>
				</div>

				<MainBtn link_info={{link_classes:"main-btn dark-btn", link_to:"/Dashboard/UsersList", content:"Manage"}}/>
			</div>
			<div className="manage-unit d-flex justify-content-between align-items-end p-3 gap-3">
				<div>
					<HeadParaBtn all_content={{
						head_t:"Writers",
						para_t:"Control Writers. You can delete and add a Writer or modify a Writer's permissions.",
						important:"h3",
						btns:[]
					}}/>
				</div>

				<MainBtn link_info={{link_classes:"main-btn dark-btn", link_to:"#", content:"Manage"}}/>
			</div>
			<div className="manage-unit d-flex justify-content-between align-items-end p-3 gap-3">
				<div>
					<HeadParaBtn all_content={{
						head_t:"Messages",
						para_t:"Control Messages. You can delete a  messages or reply to it.",
						important:"h3",
						btns:[]
					}}/>
				</div>

				<MainBtn link_info={{link_classes:"main-btn dark-btn", link_to:"#", content:"Manage"}}/>
			</div>
			<div className="manage-unit d-flex justify-content-between align-items-end p-3 gap-3">
				<div>
					<HeadParaBtn all_content={{
						head_t:"Articles",
						para_t:"Control Articles. You can delete and add an articles or Edit activation of articles.",
						important:"h3",
						btns:[]
					}}/>
				</div>

				<MainBtn link_info={{link_classes:"main-btn dark-btn", link_to:"/Dashboard/ArticlesList", content:"Manage"}}/>
			</div>
		</div>
	</div>
})

const ActivityDom = memo(({req})=>{
	// console.log('act')
	const {maxIs, changeMax, act, changeAct} = req
	return <div className='activity-overview mb-4'>
		<MainHead content="Activity Overview"/>
		<div className="graphical-table d-flex flex-column px-4 pt-2 pb-3 mb-3 overflow-hidden">
			<div className='table-top py-4 px-1 px-lg-3  d-flex align-items-center justify-content-between gap-3'>
				<h4>Users/Visits Overview</h4>
				<div className='d-flex align-items-center gap-3'>
					<div className=' d-flex align-items-center'>
						<input name='activity' type="radio" id='users-table' className={act == 'users' ? 'active mx-1' : "mx-1"} 
							onChange={()=> changeAct('users')} checked={act=='users'}
						/>
						<label htmlFor="users-table" className={act == 'users' ? 'active' : ""}>Users</label>
					</div>
					<div className=' d-flex align-items-center'>
						<input name='activity' type="radio" id='visits-table' className={act == 'visits' ? 'active mx-1' : "mx-1"}
							onChange={()=> changeAct('visits')}
						/>
						<label htmlFor="visits-table" className={act == 'visits' ? 'active' : ""}>Visits</label>
					</div>
				</div>
			</div>

			<div className="table-body my-5 mx-2 mx-lg-5">
				<span>{Math.floor(maxIs)}</span>
				<span>{Math.floor(maxIs / 2)}</span>
				<span>0</span>
				{
					act == 'users'
					?
						// must be api
						<GraphicalColumns resetNum={changeMax} info={[
							{
								count: 1230,
								month:"1",
							},
							{
								count: 1410,
								month:"2",
							},
							{
								count: 1355,
								month:"3",
							}
						]}/>
					:
						// must be api
						<GraphicalColumns resetNum={changeMax} info={[
							{
								count: 41022,
								month:"1",
							},
							{
								count: 32540,
								month:"2",
							},
							{
								count: 38755,
								month:"3",
							} 
						]}/>
				}
			</div>
		</div>
	</div>
})

const ArticlesDom = memo(({req})=>{
	// console.log('article')
	const {allArticles, items, count, load, changeItems} = req
	return <>
		<div className="cards d-grid">
			{
				allArticles.map((article)=>(
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
		{
			!load
			?
				<button className={items < count ? 'main-btn mx-auto mt-4 get-more': 'main-btn mx-auto mt-4 get-more stop'} 
					onClick={()=>{
						items < count
						?
							changeItems(items < 50 ? items + 10 : 10 )
						:
							''
						}
					}
				>
					{
						items < 50 ? 'Show More': 'Show Less'
					}
				</button>

			:
				''
		}
	</>
})

export default Dashboard