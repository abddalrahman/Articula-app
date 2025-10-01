import React from 'react'

const Pagination = ({page_info}) => {
	const {pages, pagesChange, id} = page_info

	const handlePageChange = (value, e=null)=>{
		if(value != 0){
			pagesChange({
				...pages,
				current_page: pages.current_page + value
			})
		}else{
			if(e != null){
				const valueToAdd = e.target.getAttribute('data-page')
				// console.log(valueToAdd)
				pagesChange({
					...pages,
					current_page: Number(valueToAdd)
				})
			}
		}
	}

	const mack_pagination = ()=>{
		const paginationContainer = document.querySelector(`.my-pagination .pagination-cont#${id}`)
		// console.log(paginationContainer)

		if(paginationContainer != null){
			let {current_page : start, total_pages : end} = pages
			let counter = 1;
			paginationContainer.innerHTML = '' 
			
			const span = document.createElement('span')
			span.textContent=1
			span.classList.add( 'page-span')
			if(start == 0)span.classList.add('active')
			span.setAttribute('data-page', 0)
			span.addEventListener('click', (e)=>{handlePageChange(0,e)})
			paginationContainer.appendChild(span)
			
			if(start > 1){
				const span2 = document.createElement('span')
				span2.textContent= '...'
				paginationContainer.appendChild(span2)
			}

			for(let i=start > 0 ? start : start + 1; i < end; i++){
				if(counter <= 2){
					const span = document.createElement('span')
					span.textContent=i+1
					span.classList.add( 'page-span')
					if(counter == 1 && start > 0)span.classList.add('active')
					span.setAttribute('data-page', i)
					span.addEventListener('click', (e)=>{handlePageChange(0,e)})
					paginationContainer.appendChild(span)
					counter++
				}else{
					const span2 = document.createElement('span')
					span2.textContent= '...'
					paginationContainer.appendChild(span2)
					const span = document.createElement('span')
					span.textContent=end
					span.classList.add('page-span')
					span.setAttribute('data-page', end-1)
					span.addEventListener('click', (e)=>{handlePageChange(0,e)})
					paginationContainer.appendChild(span)
					break;
				}
			}
		
		}
	}


	return (
		<div className='my-pagination d-flex align-items-center justify-content-between gap-2 gap-md-3'>
			<button  disabled={pages.current_page == 0} 
				onClick={pages.current_page > 0 ? ()=>handlePageChange(-1): null}
			>
				<i className="fa-solid fa-angle-left"></i>
			</button>
			<div id={id} className='pagination-cont d-flex align-items-center gap-2'>{mack_pagination()}</div>
			<button disabled={pages.current_page == pages.total_pages -1} 
				onClick={pages.current_page < pages.total_pages ? ()=>handlePageChange(1): null}
				>
				<i className="fa-solid fa-angle-right"></i>
			</button>
		</div>
	)
}

export default Pagination