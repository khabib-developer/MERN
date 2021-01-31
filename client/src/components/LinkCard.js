import React from 'react'
export const LinkCard = ({link}) => {

	return (
		<div className="container">
			<h2>Link</h2>
			<p>Your Link:
				<a href={link.to} target="_blank" className="" rel="noopener morefener">
					{link.to}
				</a>
			</p>
			<p>Your Link:
				<a href={link.from} target="_blank" className="" rel="noopener morefener">
					{link.from}
				</a>
			</p>
			<p>Kolicestvo klikov po ssilke: 
				<strong>{link.clicks}</strong>
			</p>
			<p>Data sozdania: 
				<strong>{new Date(link.date).toLocaleDateString()}</strong>
			</p>
		</div>
	)
}