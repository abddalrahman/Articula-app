import React from 'react'
import { NavLink } from 'react-router'

const Statistic = ({info}) => {
	const num = Number(info.count);
	const custom_num = (number)=>{
		if (number > 1000000){
			let result = Math.floor((number / 1000000) * 10) / 10; 
			return result.toString() + "m"; // return just one number after decimal point
		}else if(number > 1000){
			let result = Math.floor((number / 1000) * 10) / 10; 
			return result.toString() + "k";
		}else{
			return number;
		}
	}
	return (
		<NavLink to={info.link_to} className={info.box_classes + ' statistic d-flex flex-column align-items-center p-3'}>
			<i className={info.icon_classes}></i>
			<span className='my-3'>+{custom_num(num)}</span>
			<span>{info.title}</span>
		</NavLink>
	)
}

export default Statistic
