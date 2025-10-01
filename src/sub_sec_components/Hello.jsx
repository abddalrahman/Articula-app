import React from 'react'
import MainImage from '../assets/images/main.jpg'
import HeadParaBtn from '../components/HeadParaBtn'
// import HelloAnimation from '../special_components/HelloAnimation'

const Hello = () => {
	return (
		<div className="hello-sec d-flex align-items-center position-relative flex-column-reverse flex-md-row ">
			<div className="hello-text py-4 py-md-0" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500">
     	 	<HeadParaBtn all_content={{
					head_t:"Learn with expert anytime anywhere",
					para_t:"Our mission is to help people to find the best source online and learn with expert anytime, anywhere.",
					important:"h2",
					btns:
						localStorage.getItem('login_obj_info') == null && sessionStorage.getItem('login_obj_info') == null
						?
							[{
								classes:"main-btn dark-btn",
								h_ref:"/Articles",
								content:"Start Reading"
							},
							{
								classes:"main-btn",
								h_ref:"signUp",
								content:"Create Account"
							}]
						:
							[{
								classes:"main-btn dark-btn",
								h_ref:"/Articles",
								content:"Start Reading"
							}]
							
				}}/>
			</div>
			{/* <HelloAnimation/> */}
      <div className="position-relative overflow-hidden">
        <img src={MainImage} alt="people"/>
      </div>
    </div>
	)
}

export default Hello
