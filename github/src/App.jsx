import React, { Fragment, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/users";
import User from "./components/users/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

export default function App({props}) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // componentDidMount = async () => {
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //   this.setState({ loading: true });
  //   const response = await axios.get(`https://api.github.com/users`);
  //   const data = await response.data;
  //   this.setState({ users: data, loading: false });
  //   // console.log(data);
  // };

  //Search Github Users
  const searchUsers = async (text) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&client_secret=${import.meta.env.VITE_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data.items;
    setUsers(data)
    setLoading(false)
  };

  //Get single Github users
  const getUser = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&client_secret=${import.meta.env.VITE_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data;
    setUser(data)
    setLoading(false)
  };

  //Get users repos
  const getUserRepo = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&client_secret=${import.meta.env.VITE_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data;
    setRepos(data)
    setLoading(false)
  }

  //Clear users
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  };

  //Set alert
  const setAlerts = (msg) => {
    setAlert(msg)
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
                    <Users
                      loading={loading}
                      users={users}
                    />
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
                  repos= {repos}
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


