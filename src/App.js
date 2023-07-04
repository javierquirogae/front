import './App.css';
import React, { useState, useEffect } from "react";
import Routes from './Routes';
import NavBar from './NavBar';
import CurrentUserContext from './CurrentUserContext';
import { useHistory } from "react-router-dom";
import JoblyApi from "./api.js";
import jwtDecode from "jwt-decode";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(null);
  const [jobApps, setJobApps] = useState(new Set([]));
  const history = useHistory();

  async function getUserInfo (token) {
    try {
        setToken(token);
        JoblyApi.token = token;
        const {username} = jwtDecode(token);
        const res = await JoblyApi.getCurrentUser(username);
        setCurrUser(res);
    } catch (error) {
        console.log(error);
    }
  }

  /** Check local storage for saved token and get currUser */
  useEffect(() => {
    const userToken = localStorage.getItem("joblyToken");
    console.log("useeffect called!!! zomg!");
    if (userToken && !currUser) {
        try {
            getUserInfo(userToken);
        } catch (error) {
            console.log(error);
        }
    }
  }, []);

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
  }

  const logout = () => {
      setCurrUser(null);
      setToken(null);
      localStorage.removeItem("joblyToken");
      history.push("/");
  }

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
  }

  /** Update a user's profile.  Returns true upon success.  Throws error otherwise */
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
  }

  /** Check if user has applied to a job */
  const applied = (id) => {
    if (jobApps.has(id)) return true;
  }

  /** Apply to a job, update jobApps */
  const apply = async (id) => {
      try {
          await JoblyApi.apply(currUser.username, id);
      } catch (error) {
          console.log(error);
      }
      const newSet = new Set([id]);
      setJobApps(new Set([...jobApps, id]));
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{currUser, token, login, logout, register, userUpdate, applied, apply}}>
        <NavBar />
        <Routes />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
