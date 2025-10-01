import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

const CheckPath = ({updatePath}) => {
	const location = useLocation();
	useEffect(()=>{
		updatePath(location.pathname)
	}, [location.pathname, updatePath])
	
	return (
		<>
		</>
	)
}

export default CheckPath
