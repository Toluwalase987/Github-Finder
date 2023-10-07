import React from 'react'

export default function ReposItem({repo}) {
  return (
    <div>
      <h3>
        <a className="repos-item" href={repo.html_url} target='_blank '>{repo.name}</a>
      </h3>
    </div>
  )
}
