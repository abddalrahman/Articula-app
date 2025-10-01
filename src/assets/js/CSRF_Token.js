import React from 'react'

const CSRF_Token = ({setFunc, vals}) => {
	fetch(`https://tamkeen-dev.com/api/session/token?_format=json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	.then((res) => {
		if (!res.ok) {
			return res.json().then(data => {
				console.log(data)
				// const error_is = data.message || 'Unknown error';
				setFunc({
					...vals,
					error: "Failed to get important requested data",
				});
			});
		}else{
			return res.text();
		}
	})
	.then(data => {
		setFunc({
			...vals,
			value: data, 
		});
	})
	.catch(err => {
		console.log(err.message)
		setFunc({
			...vals,
			error: "Failed to get important requested data", 
		});
	})
	// .finally(() => {
	// });
	
}

export default CSRF_Token