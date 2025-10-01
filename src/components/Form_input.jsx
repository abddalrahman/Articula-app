import React, { useState } from 'react'

const Form_input = ({input_info}) => {
	const key_is = input_info.path;

	const [inpType, setInpType] = useState(false)

	const convertInputType = (e)=>{
		const inp = e.currentTarget.parentElement.querySelector('input')
		if(inp){
			const typeIs = inp.getAttribute('type')
			if(typeIs == 'password'){
				e.currentTarget.classList.remove('fa-eye')
				e.currentTarget.classList.add('fa-eye-slash')
				inp.setAttribute('type', 'text')
				setInpType(true)
			}else{
				e.currentTarget.classList.add('fa-eye')
				e.currentTarget.classList.remove('fa-eye-slash')
				inp.setAttribute('type', 'password')
				setInpType(false)
			}
		}
	}	

	return (
		<div className={input_info.inp_classes + " d-flex flex-column"}>
			<label className={input_info.label_not_exist ? "d-none mb-2" : "mb-2"} htmlFor={input_info.label}>{input_info.label}</label>
			{
				input_info.inp_type == 'y'
				?
					<input className='p-2' type="text" id={input_info.label} placeholder={input_info.inp_placeholder} value={input_info.value}
						disabled={input_info.disabled ? true: false}
						onInput={(e)=>{
							input_info.eventHandle
							?
								input_info.eventHandle({ 
									...input_info.all_date,
									[key_is] :e.target.value
								})
							:
								''
						}}
					/>
				:
					input_info.inp_type == 'p'
					?
						<div className='pass-inp-dad position-relative'>
							<input className='p-2 w-100' type={inpType ? "text" : "password"} id={input_info.label} placeholder={input_info.inp_placeholder} 
								value={input_info.value}
								disabled={input_info.disabled ? true: false}
								onInput={(e)=>{
									input_info.eventHandle
									?
										input_info.eventHandle({ 
											...input_info.all_date,
											[key_is] :e.target.value
										})
									:
										''
								}}
							/>
							<i className="fa-regular fa-eye convert-type-icon position-absolute" onClick={(e)=>convertInputType(e)}></i>
						</div>
					:
						<textarea className='p-2' id={input_info.label} placeholder={input_info.inp_placeholder} value={input_info.value}
							disabled={input_info.disabled ? true: false}
							onInput={(e)=>{
								input_info.eventHandle
								?
									input_info.eventHandle({ 
										...input_info.all_date,
										[key_is] :e.target.value
									})
								:
									''
							}}
						></textarea>
			}
		</div>
	)
}

export default Form_input
