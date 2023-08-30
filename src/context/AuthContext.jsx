import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import myApi from "../api/service";
export const UserContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  // perform login logic and set user state
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isTeacher, setIsTeacher] = useState(false);

  function authenticateUser() {
    const token = localStorage.getItem("token"); // retrieve the token inside the function
    myApi
      .verifyUser()
      .then((response) => {
        // setIsLoading(true)
        // setIsLoggedIn(false)
        setIsLoading(false);
        setIsLoggedIn(true);
        setUser(response.data.user);
      })
      .catch((error) => {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        console.log(error);
      });
  }
  useEffect(() => {
    authenticateUser();
  }, []);

  // const removeToken = () =>{
  //     localStorage.removeItem("authToken")
  // }
  // const logOutUser = () =>{
  //     removeToken()
  //     // and update the state variables
  //     authenticateUser()
  // }
  return (
    // value = logOutUser
    <UserContext.Provider
      value={{ user, authenticateUser, isLoggedIn, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default AuthContext;
