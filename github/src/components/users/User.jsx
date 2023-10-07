import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCheck, FaTimesCircle } from "react-icons/fa"
import Repos from "../repos/repos";

export default function User({ user, getUser, getUserRepo,repos, loading }) {
  const { login } = useParams();

  useEffect(() => {
    getUser(login);
  }, [getUser, login]);

  useEffect(() => {
    getUserRepo(login);
  }, [getUserRepo, login]);

  const {
    name,
    avatar_url,
    location,
    bio,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    company,
    blog,
    hireable,
  } = user;

  return (
    <>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div>
          <Link to={"/"} className="link">Back to Search</Link>
          <div className="user">
            <div className="picture">
              <img src={avatar_url} className="avatar" alt="" />
            </div>
            <div>
              <h2>{name}</h2>
              <h4>{bio}</h4>
              <div>{login && <h4>Username: {login}</h4>}</div>
              <div>{company && <h4>Username: {company}</h4>}</div>
              <div>{blog && <h4>Website: {blog}</h4>}</div>
              <div className="hire">Hireable: {hireable ? <FaCheck/> : <FaTimesCircle/>}</div>
              <a href={html_url} className="link" target="_blank">Visit Github Profile</a>
              <div className="info">
                <div className="followers">Followers: {followers}</div>
                <div className="following">Following: {following}</div>
                <div className="repo">Public Repos: {public_repos}</div>
                <div className="gists">Public Gists: {public_gists}</div>
              </div>
            </div>
          </div>
              <div className="repos">
                <h2>Latest Repositories</h2>
                <Repos repos={repos}/>
              </div>
        </div>
      )}
    </>
  );
}
