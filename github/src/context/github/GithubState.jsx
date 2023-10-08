import { useReducer, useEffect } from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  GET_USERS,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT,
} from "../../../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    singleUser: {},
    repos: [],
    loading: false,
  };

  const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const githubClientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

//   useEffect(() => {
//     console.log(githubClientSecret);
//   }, []);

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async (text) => {
    setLoading();
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      dispatch({
        type: SEARCH_USERS,
        payload: data.items
      });
      console.log(data.items);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  //Get User

  //Get repos

  //Clear users

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
