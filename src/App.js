import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Routes from './common/Routes';
import NavBar from './common/NavBar';
import CurrentUserContext from './user/CurrentUserContext';
import JoblyApi from "./common/Api.js";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(null);
  const [jobApps, setJobApps] = useState(new Set([]));
  const history = useHistory();

  // Fetches user information from the server based on the provided token
  async function getUserInfo(token) {
    try {
      setToken(token);
      JoblyApi.token = token;
      const { username } = jwtDecode(token);
      const res = await JoblyApi.getCurrentUser(username);
      setCurrUser(res);
    } catch (error) {
      console.log(error);
    }
  }

  // Checks local storage for a saved token and retrieves the current user
  useEffect(() => {
    const userToken = localStorage.getItem("joblyToken");
    if (userToken && !currUser) {
      try {
        getUserInfo(userToken);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  // Logs in a user with the provided username and password
  const login = async (username, password) => {
    try {
      const res = await JoblyApi.login(username, password);
      setToken(res);
      JoblyApi.token = res;
      localStorage.setItem("joblyToken", res);
      await getUserInfo(res);
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  // Logs out the current user
  const logout = () => {
    setCurrUser(null);
    setToken(null);
    localStorage.removeItem("joblyToken");
    history.push("/");
  };

  // Registers a new user with the provided form data
  const register = async (formData) => {
    try {
      const res = await JoblyApi.register(formData);
      setToken(res);
      setCurrUser(formData);
      JoblyApi.token = res;
      localStorage.setItem("joblyToken", res);
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  // Updates a user's profile information
  const userUpdate = async (username, formData) => {
    try {
      const res = await JoblyApi.profileUpdate(username, formData);
      setCurrUser({
        ...currUser,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Checks if the user has applied to a job with the given id
  const applied = (id) => {
    return jobApps.has(id);
  };

  // Applies to a job and updates the list of job applications
  const apply = async (id) => {
    try {
      await JoblyApi.apply(currUser.username, id);
    } catch (error) {
      console.log(error);
    }
    const newSet = new Set([...jobApps, id]);
    setJobApps(newSet);
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider
        value={{
          currUser,
          token,
          login,
          logout,
          register,
          userUpdate,
          applied,
          apply
        }}
      >
        <NavBar />
        <Routes />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
