import React from 'react'
import { AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap'

const MyAccordionItem = ({item_info}) => {
	return (
		<AccordionItem data-cat={item_info.cat_id} className='mb-4 rounded-0 one-item' eventKey={item_info.index}>
			<AccordionHeader> 
				<span>{item_info.title}</span>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 3.125V16.875" stroke="#1D2026" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M4.375 11.25L10 16.875L15.625 11.25" stroke="#1D2026" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</AccordionHeader>
			<AccordionBody dangerouslySetInnerHTML={{ __html: item_info.body }}/>
		</AccordionItem>
	)
}

export default MyAccordionItem
