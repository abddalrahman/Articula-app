import React, { useEffect } from 'react'
import "./assets/css/about.css"
import ShowPath from './sub_sec_components/ShowPath';
import AboutIntro from './sub_sec_components/AboutIntro';
import CompaniesStatistic from './sections_components/CompaniesStatistic';
import OurMission from './sub_sec_components/OurMission';
import Gallery from './sections_components/Gallery';
import Testimonials from './sub_sec_components/Testimonials';

const About = () => {

	useEffect(()=>{
		document.querySelector("header").classList.add('show');
		document.querySelector("footer").classList.add('show');
	},[])
	return (
		<>
			<ShowPath path_info={{
				current:"About",
				path_series:[
					{
						page:"Home",
						pageLink:"/"
					},
					{
						page:"About",
						pageLink:"/About"
					}
				]
			}}/>
			<AboutIntro/>
			<CompaniesStatistic/>
			<OurMission/>
			<Gallery/>
			<Testimonials/>
		</>
	)
}

export default About
