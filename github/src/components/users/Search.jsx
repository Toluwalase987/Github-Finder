import React, { Component, useState } from "react";


export default function Search({setAlert, searchUsers, clearUsers, showButton}){
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === ''){
        setAlert('Please enter something')
    }else{
        searchUsers(text);
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

