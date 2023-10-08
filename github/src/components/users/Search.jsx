import React, { Component, useContext, useState } from "react";
import GithubContext from "../../context/github/githubContext";


export default function Search({setAlert, clearUsers, showButton}){
  const githubContext = useContext(GithubContext)
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === ''){
        setAlert('Please enter something')
    }else{
        githubContext.searchUsers(text);
        setText("");
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

    return (
      <div className="search-input">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users"
            value={text}
            onChange={handleChange}
          />
          <button>Search</button>
        </form>
        {showButton && (
          <button onClick={clearUsers} className="clear-users">
            Clear
          </button>
        )}
      </div>
    );
  }

