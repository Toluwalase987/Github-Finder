import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import GithubState from './context/github/GithubState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <GithubState>
           <App /> 
        </GithubState>
  </React.StrictMode>,
)
