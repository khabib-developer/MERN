import React from 'react'
import './loader.css'
export const Loader = () => {
	return (
		<div style={{display:'flex', justifyContent:'center', paddingTop:'3rem'}}>
		 <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
		</div>
	)
}