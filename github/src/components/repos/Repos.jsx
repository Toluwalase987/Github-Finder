import React from 'react'
import ReposItem from './ReposItem'

export default function Repos({repos}) {
  return (
    repos.map((repo)=>{
        return <ReposItem repo={repo} key={repo.id}/>
    })
  )
}
