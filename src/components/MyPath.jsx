import React from 'react'
import { NavLink } from 'react-router';

const MyPath = ({page_path}) => {
	return (
		<ul className=' d-flex px-0 py-2'>
			{
				page_path.map((path, index)=>(
					index != page_path.length-1
					?
					<li key={index} className='path-link'>
						<NavLink to={path.pageLink}>{path.page}</NavLink>
						<span className='mx-2'>/</span>
					</li>
					:
					<li key={index}>
						{path.page}
					</li>
				))
			}
		</ul>
	)
}

export default MyPath
