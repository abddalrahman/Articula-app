import React, { useContext } from 'react'
import HeadParaBtn from '../components/HeadParaBtn'
import { NavLink } from 'react-router'
import MainBtn from '../components/MainBtn'
import Author from '../assets/images/auther.png'
import Step from '../components/Step'
import { ChangeLangContext } from '../App'

const BeAuthor = () => {

	const {languageIs} = useContext(ChangeLangContext)

	return (
		<section className="auther py-5">
			<div className="main-container">
				<div className="be-auther d-flex flex-wrap gap-3 flex-column flex-xl-row">
					<div className="auther-info d-flex px-4 justify-content-between align-items-end">
						<div className="d-flex flex-column pt-3 pb-5 ">
							<HeadParaBtn all_content={{
								head_t:"Become an Author",
								para_t:`Authors from around the world teach millions of students on Udemy. We provide the tools and skills to 
								teach what you love.`,
								important:"h3",
								btns:[]
							}}
							/>
							<MainBtn link_info={{
								link_classes:"main-btn light-btn",
								link_to:"/My_Articles",
								content:"Start Writing",
								icon_classes: languageIs == 'en' ? "fa-solid fa-arrow-right ms-2": "fa-solid fa-arrow-left ms-2"
							}}/>
						</div>
						<div className="pt-3 d-none d-sm-inline-block">
							<img src={Author} alt="author"/>
						</div>
					</div>

					<div className="auther-steps py-5 px-4 d-flex flex-column justify-content-between">
						<h3>Your teaching & earning steps</h3>
						<div className="steps d-flex gap-3 flex-wrap">
							<Step info={{
								num:"1",
								text:"Apply to become author",
								color_info:"bl c-bl"
							}}/>
							<Step info={{
								num:"2",
								text:"Build & edit your profile",
								color_info:"pi c-or"
							}}/>
							<Step info={{
								num:"3",
								text:"Create your new article",
								color_info:"pi c-red"
							}}/>
							<Step info={{
								num:"4",
								text:"Start teaching & earning",
								color_info:"gr c-gr"
							}}/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BeAuthor
