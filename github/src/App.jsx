import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

export default function App({ props }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const githubClientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

 
  

  // Search Github Users
  const searchUsers = async (text) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get users repos
  const getUserRepo = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set alert
  const setAlerts = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 3000);
  };

  return (
      <Router>
        <div>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route
              path={"/"}
              element={
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    setAlert={setAlerts}
                    showButton={users.length > 0 ? true : false}
                  />
                  <div className="container">
                    <Users loading={loading} users={users} />
                  </div>
                </Fragment>
              }
            />
            <Route path={"/about"} element={<About />} />
            <Route
              path={"/user/:login"}
              element={
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepo={getUserRepo}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </Router>
  );
}
