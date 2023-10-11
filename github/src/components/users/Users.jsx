import React, { useContext, useEffect } from "react";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;

  console.log(users) 


  return (
    <div>
      {loading &&
        <div className="loading-spinner"></div>
      }
{    !loading&&    <div style={userStyle}>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
}      
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "10px",
};

export default Users;
