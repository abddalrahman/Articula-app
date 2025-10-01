import React from 'react'
import User from '../assets/images/user.svg'
import { NavLink } from 'react-router'

const ArticleCard = ({card_data}) => {
	const art_text = card_data.main_text


	const formatDate = (dateIs)=>{
		const date = new Date(dateIs);
		
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'short' });
		const year = date.getFullYear();

		return `${day} ${month}, ${year}`;
	}

	const openControle = (e, action)=>{
		if(action == "show"){
			const idIs = e.currentTarget.getAttribute('data-id')
			document.querySelector(`.card .article-controles[data-id="${idIs}"]`)?.classList.add('show')
		}else if(action == "hide"){
			const idIs = e.currentTarget.getAttribute('data-id')
			document.querySelector(`.card .article-controles[data-id="${idIs}"]`)?.classList.remove('show')
		}
	}

	return (
		<>
			{	
					card_data.fromProfile
					?
						<div  className="card position-relative overflow-hidden">
							<i className="fa-solid fa-ellipsis position-absolute aticle-menu" data-id={card_data.ID} 
								onClick={(e)=>openControle(e, 'show')}
							></i>
							<div className='position-absolute article-controles d-flex flex-column justify-content-around align-items-center overflow-hidden' 
								data-id={card_data.ID}
							> 
								<span className='position-absolute d-flex align-items-center' data-id={card_data.ID}
									onClick={(e)=>openControle(e, 'hide')}
								>
									<i className="fa-solid fa-angle-left"></i>
								</span>
								<NavLink className='main-btn py-2' to={card_data.to_article}>Details</NavLink>
								<button onClick={()=> card_data.deleteFunc({id:card_data.ID, show:true})} className='main-btn dark-btn py-2'>Delete</button>
								<NavLink className='main-btn py-2' to={card_data.to_edit}>Edit</NavLink>
							</div>
							<div className='img-holder'>
								<img className='w-100' src={"https://tamkeen-dev.com/"+ card_data.img} alt={card_data.main_text}/>
							</div>
							<div className="card-text p-3 ">
								{
									card_data.tag.length > 0 
									?
									<span className="py-1 px-2 mb-2 d-inline-block light-link">{card_data.tag[0]}</span>
									:
									''
								}
								<p>{art_text.length > 45 ?  art_text.toString().slice(0, 45) + '...' : art_text}</p>
							</div>
							<div className="card-footer p-3 ">
								<span><img src={User} alt="user"/> <span className="mx-2">{card_data.Author}</span></span>
							</div>
						</div>
						
					:
						<NavLink to={card_data.to_article} className="card position-relative">
							<div className='position-absolute card-date-info d-flex align-items-center justify-content-center p-1'>
								<i className="fa-regular fa-calendar-days me-2"></i>
								<span>{formatDate(card_data.date)}</span>
							</div>
							<div className='img-holder'>
								<img className='w-100' src={"https://tamkeen-dev.com/"+ card_data.img} alt={card_data.main_text}/>
							</div>
							<div className="card-text p-3 ">
							{
								card_data.tag.length > 0 
								?
								<span className="py-1 px-2 mb-2 d-inline-block light-link">{card_data.tag[0]}</span>
								:
								''
							}
							<p>{art_text.length > 45 ?  art_text.toString().slice(0, 45) + '...' : art_text}</p>
							</div>
							<div className="card-footer px-3 py-2 py-md-3 ">
							<span><img src={User} alt="user"/> <span className="mx-2">{card_data.Author}</span></span>
							</div>
						</NavLink>
			}
		</>
	)
}

export default ArticleCard
