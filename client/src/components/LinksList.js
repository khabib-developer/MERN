import React from 'react'
import {Link} from 'react-router-dom'
export const LinksList = ({links}) => {
	if(!links.length) {
		return <p className="center">No Links</p>
	}
	return (
 	 <table className="highlight">
        <thead>
          <tr>
              <th>N</th>
              <th>Originalnaya</th>
              <th>Sokrashennaya</th>
              <th>Otkrit</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, i) => {
          	return (
			 <tr key={link._id}>
	            <td>{i+1}</td>
	            <td>{link.from}</td>
	            <td>{link.to}</td>
	            <td>{<Link to={`/detail/${link._id}`}>Otkrit</Link>}</td>
	          </tr>
          	)
          })}
        </tbody>
      </table>
	)
}