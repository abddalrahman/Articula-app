import React, { useEffect, useRef, useState } from 'react'
import ShowPath from './sub_sec_components/ShowPath';
import MyAccordionItem from './bigComponents/MyAccordionItem';
import Q_filtering from './components/Q_filtering';
import HeadParaBtn from './components/HeadParaBtn';
import Form_input from './components/Form_input';
import MainBtn from './components/MainBtn';
import MainHead from './components/MainHead';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Spinner } from 'react-bootstrap';
import './assets/css/faqs.css'
import AOS from 'aos';

const FAQs = () => {

	const params = new URLSearchParams(window.location.search);
	const idIs = params.get('id');

	const noRerender = useRef(false)
	
	const [thereError, setThereError] = useState('');
	const [cat, setCat] = useState([]);
	const [qus, setQus] = useState([]);

	
	useEffect(()=>{
		if(! noRerender.current){
			document.querySelector("header").classList.add('show');
			document.querySelector("footer").classList.add('show');
			getQusCatg()
			getAllQus()
			noRerender.current= true
		}
	},[])
	
	// filter question from url params
	useEffect(()=>{
		if(qus.length > 0 && idIs && !isNaN(Number(idIs)) && idIs.trim() != ''){
			const qusetionsFromParams = ()=>{
				const questionsAll = document.querySelectorAll('.questions .one-item')
				if(qus.length == questionsAll.length){
					// console.log('compleate')
					const allFilters = document.querySelectorAll('.q-filtering ul li')
					allFilters.forEach((filter)=>{
						filter.getAttribute('data-id') == idIs
						?
							filter.classList.add('active-filter')
						:	
							filter.classList.remove('active-filter')
					})
					const allQus = document.querySelectorAll('.questions .one-item')
					allQus.forEach((item)=>{
						if(item.getAttribute('data-cat') == idIs){
							item.classList.remove('d-none')
						}else{
							item.classList.add('d-none')
						}
					})
					
					AOS.refreshHard()
				}else{
					console.log('waiting...')
					setTimeout(qusetionsFromParams, 100);
				}
			}
			qusetionsFromParams()
		}
	}, [qus])


	const getQusCatg = ()=>{
		fetch('https://tamkeen-dev.com/api/terms/faq-category', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setThereError('Something Went Wrong!!');
				});
			}
			return res.json();
		})
		.then((data)=>{
			setCat(data)
		})
		.catch(err => {
			console.log(err.message)
			setThereError('Something Went Wrong!!');
		})
		// .finally(()=>{
			// })
	}
	
	const getAllQus = ()=>{
		fetch('https://tamkeen-dev.com/api/faq-list', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (!res.ok) {
				return res.json().then(data => {
					const error_is = data.message || 'Unknown error';
					console.log(error_is)
					setThereError('Something Went Wrong!!');
				});
			}
			return res.json();
		})
		.then((data)=>{
			// console.log(data)
			setQus(data)
		})
		.catch(err => {
			console.log(err.message)
			setThereError('Something Went Wrong!!');
		})
		// .finally(()=>{
		// })
	}

	// handleFiltering----------------
	const handleFiltering = (e)=>{
		const id = e.currentTarget.getAttribute('data-id')
		const allFilters = document.querySelectorAll('.q-filtering ul li')
		allFilters.forEach((filter)=>{
			filter.classList.remove('active-filter')
		})
		e.currentTarget.classList.add('active-filter')
		const allQus = document.querySelectorAll('.questions .one-item')
		allQus.forEach((item)=>{
			if(Number(id) == -1){
				item.classList.remove('d-none')
			}else{
				if(item.getAttribute('data-cat') == id){
					item.classList.remove('d-none')
				}else{
					item.classList.add('d-none')
				}
			}
		})
		AOS.refreshHard()
	}	


	return (
		<div>
			<ShowPath path_info={{
				current:"FAQs",
				path_series:[
					{
						page:"Home",
						pageLink:"/"
					},
					{
						page:"FAQs",
						pageLink:"/FAQs"
					}
				]
			}}/>
			
			<div className='faqs-content'>
				<div className='nav-container pb-5'>
					<MainHead content="Frequently asked questions"/>
					{
						thereError ==''
						?
							cat.length > 0 && qus.length > 0
							?
								<div className='row faq-content'> 
									<div className='q-filtering col-12 col-md-4 col-xl-3 mb-5'>
										<Q_filtering filters={cat} func={handleFiltering}/>
									</div>

									<div className='questions col-12 col-md-8 col-xl-6'>
										<Accordion
											data-aos="fade-up" data-aos-delay="100" data-aos-duration="500"
										>
											{
												qus.map((item, index)=>(
													<MyAccordionItem key={index} item_info={{title: item.title, body: item.body, index: index , cat_id: item.category_id}}/>
												))
											}
										</Accordion>
									</div>

									<div className='send-qus col-12 col-12 col-xl-3'
										data-aos="fade-left" data-aos-delay="100" data-aos-duration="500"
									>
										<div className='send-qus-content p-3'>
											<div>
												<HeadParaBtn all_content={{
													head_t:"Don’t find your answer!",
													para_t:"Don’t worry, write your question here and our support team will help you.",
													important:"h3",
													btns:[]
												}}/>
											</div>
											<form>
												<Form_input input_info={{
													label:"Subject",
													inp_placeholder:"Subject",
													inp_type:"y",
													inp_classes:"mb-2",
													label_not_exist: true
												}}/>
												<Form_input input_info={{
													label:"Message",
													inp_placeholder:"Message",
													inp_type:"n",
													inp_classes:"mb-4",
													label_not_exist: true
												}}/>
												<MainBtn link_info={{
													btn_type:"btn",
													link_classes:"main-btn",
													link_to:"#",
													content:"Submit question"
												}}/>
											</form>
										</div>
									</div>
									
								</div>
							:
								<div className='d-flex align-items-center justify-content-center my-5 py-5'>
									<Spinner className='spinner' animation="border" role="status">
										<span className="visually-hidden">Loading...</span>
									</Spinner>
								</div>

						:
							<div className='alert alert-danger'>
								{thereError}
							</div>
					}
				</div>
			</div>
		</div>
	)
}

export default FAQs
