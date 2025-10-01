import React, { useEffect } from 'react'
import ShowPath from './sub_sec_components/ShowPath'
import ContactHello from './sub_sec_components/ContactHello'
import Branches from './sections_components/Branches'
import SendContMessage from './sections_components/SendContMessage'
import OurMap from './assets/images/mab.png'

const ContactUs = () => {
	useEffect(()=>{
		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
	},[])
	return (
		<>
			<ShowPath path_info={{
				current:"Contact",
				path_series:[
					{
						page:"Home",
						pageLink:"/"
					},
					{
						page:"Contact",
						pageLink:"/Contact"
					}
				]
			}}/>
			<ContactHello/>
			<Branches/>
			<SendContMessage/>
			<div className='map'>
				<img src={OurMap} alt="map" />
			</div>
		</>
	)
}

export default ContactUs
