import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default function UserItem({user: {login, avatar_url, html_url}}){ 

    return (
      <div className='card'>
        <img src={avatar_url} alt="" className='image'/> 
        <h3>{login}</h3>
        <div>
            <Link to={`/user/${login}`} className='link2'>More</Link>
        </div>
      </div>
    )
  }
 
