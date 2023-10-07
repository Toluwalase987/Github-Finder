import React, { Component } from "react";
import UserItem from "./UserItem";

export default function Users({users, loading}){

      return (
        <div>
            {loading ? <div className="loading-spinner"></div> : <div style={userStyle}>
        {users.map(user =>{
           return <UserItem key={user.id} user={user}/>
        })}
    </div>}
        </div>
    )
  }


const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px'
}
