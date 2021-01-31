import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hooks'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
export const CreatePage = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {request} = useHttp()
	const [link, setLink] = useState('')
	useEffect(() => {
		window.M.updateTextFields()
	})
	const pressHandler = async event => {
		if(event.key === 'Enter') {
			try {
				const data = await request('api/link/generate', 'POST', {from: link}, {
					authorization:`Bearer ${auth.token}`
				})
				history.push(`/detail/${data.link._id}`)
			} catch(e) {}
		}
	}
	return (
		<div className="row">
			<div className="col s8 offset-s2">
				<div className="input-field">
		          <input 
		          placeholder="Vstavte ssilku"
		          type="text" 
		          id="link" 
		          value={link}
		          onChange={e => setLink(e.target.value)}
		          onKeyPress={pressHandler} />
		          <label 
		          htmlFor="link"
		          className="yellow-input white-text">Vvedite ssilku</label>
		        </div>
			</div>
		</div>
	)
}