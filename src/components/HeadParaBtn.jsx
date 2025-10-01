import React from 'react'
import { NavLink } from 'react-router';

const HeadParaBtn = ({all_content}) => {

	const btns_array = all_content.btns;
	let padding_is ='';
	const render_head= (important_is)=>{
		if(important_is == "h2"){
			padding_is = "py-2 py-lg-3 py-xl-4 mb-0";
			return <h2>{all_content.head_t}</h2>
		}else if(important_is == "h3"){
			padding_is = "py-2 mb-0";
			return <h3>{all_content.head_t}</h3>
		}
	}

	return (
		<>
			{render_head(all_content.important)}
			<p className={padding_is}>{all_content.para_t}</p>
			
			{
				btns_array.length > 0
				?
					<div className="d-flex align-items-center gap-3">
						{
							btns_array.map((btn, index)=>(
								! btn.icon_is
								?
									<NavLink onClick={btn.event_func? btn.event_func :''} key={index} className={btn.classes} to={btn.h_ref}>
										{btn.content}
									</NavLink>
								:
									<NavLink onClick={btn.event_func? btn.event_func :''} key={index} className={btn.classes + ' d-flex gap-2 align-items-center'} to={btn.h_ref}>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M21 5.25L12 13.5L3 5.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M10.3638 12L3.23145 18.538" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M20.7687 18.5381L13.6362 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>

										<span>{btn.content}</span>
									</NavLink>
							))
						}
					</div>
				:
				""
			}
		</>
	)
}

export default HeadParaBtn
