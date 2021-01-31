import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useHttp} from '../hooks/http.hooks'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
	const [links, setLinks] = useState([])
	const [ready, setReady] = useState(false)
	const {loading, request} = useHttp()
	const {token} = useContext(AuthContext)
	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request('/api/link', 'GET', null, {
				authorization:`Bearer ${token}`
			})
			setLinks(fetched)
			setReady(true)
		} catch(e) {
			console.log(e);
		}
	}, [token, request])
	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])
	if(!ready) {
		return <Loader />
	}
	return (
		<>
			{!loading&&ready&&<LinksList links={links} />}
		</>
	)
}