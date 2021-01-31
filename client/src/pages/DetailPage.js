import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hooks'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'
export const DetailPage = () => {
	const {request, loading} = useHttp()
	const [link, setLink] = useState(null)
	const [ready, setReady] = useState(false)
	const linkId = useParams().id
	const {token} = useContext(AuthContext)
	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
				authorization:`Bearer ${token}`
			})
			setLink(fetched)
			setReady(true)
		} catch(e) {
			console.log(e);
		}
	}, [token, linkId, request])
	useEffect(() => {
		getLink()
	}, [getLink])
	if(!ready) {
		return <Loader />
	}
	return (
		<>
			{!loading&&linkId&&ready&&<LinkCard link={link} />}
		</>
	)
}