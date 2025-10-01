import React from 'react'
import MainHead from '../components/MainHead'
import CommonLink from '../components/CommonLink'
import WritersSwiper from '../special_components/WritersSwiper'

const TopWriters = () => {
	return (
		<section className='top-writers position-relative py-5'>
			<div className="sec-container">
				<div className='top-writers-content py-3 px-4'>
					<MainHead content="Top Writers"/>
					<WritersSwiper/>
					<CommonLink link_detailes={{
						text:"Thousands of users waiting for a Articles. Start writing & earning now!.",
						to_:"/My_Articles",
						to_text:"Become an Author"
					}}/>
				</div>
			</div>
		</section>
	)
}

export default TopWriters
