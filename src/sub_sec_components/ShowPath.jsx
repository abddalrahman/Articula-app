import React from 'react'
import MyPath from '../components/MyPath'

const ShowPath = ({path_info}) => {
	return (
		<div className='show-path-sec py-4 px-3 d-flex flex-column align-items-center'>
			<h2 className='pt-3'>{path_info.current}</h2>
			<MyPath page_path={path_info.path_series}/>
		</div>
	)
}

export default ShowPath
