import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hooks'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const {loading, error, request, clearError} = useHttp()
	const [form, setForm] = useState({
		email:'',password:''
	})
	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])
	useEffect(() => {
		window.M.updateTextFields()
	})
	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}
	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			message(data.message)
		} catch(e) {}
	}
	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId)
		} catch(e) {}
	}
	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Sokrati ssilku</h1>
				<div className="card blue darken-1">
			        <div className="card-content white-text">
			          <span className="card-title">Card Title</span>
			          <div>
			          	<div className="input-field">
				          <input 
				          placeholder="Vvedite email"
				          type="text" 
				          id="email" 
				          name="email"
				          onChange={changeHandler}
				          value={form.email}
				          className="validate white-text" />
				          <label 
				          htmlFor="email"
				          className="yellow-input white-text">Email</label>
				        </div>
				        <div className="input-field">
				          <input 
				          placeholder="Vvedite parol"
				          type="password" 
				          name="password"
				          id="parol" 
				          value={form.password}
				          onChange={changeHandler}
				          className="validate white-text" />
				          <label 
				          htmlFor="parol"
				          className="yellow-input white-text">Parol</label>
				        </div>
			          </div>
			        </div>
			        <div className="card-action">
			          <button 
			          className="btn yellow darken-4" 
			          onClick={loginHandler}
			          style={{marginRight:10}}
			          disabled={loading}>
			          Voyti
			          </button>
			          <button 
			          className="btn grey lightnr-1 black-text"
			          onClick={registerHandler}
			          disabled={loading}>
			          Registratsiya
			          </button>
			        </div>
			    </div>
			</div>
		</div>
	)
}