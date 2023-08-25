import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
export const UserContext = createContext()
import myApi from '../api/service'


function AuthContext({children}) {
    const [user, setUser] = useState(null)
    // perform login logic and set user state
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function authenticateUser(){
        console.log("here")
        myApi
            .verifyUser()
            .then((response)=>{
                setIsLoading(true)
                setIsLoggedIn(false)
                setUser(response.data.user)
            })
            .catch((error)=>{
                setUser(null)
                setIsLoading(false)
                setIsLoggedIn(false)
                console.log(error)
            })

    }
    useEffect(()=>{
        authenticateUser()
    },[])

  return (
    <UserContext.Provider value={{authenticateUser, isLoggedIn, isLoading}}>
         {children}
    </UserContext.Provider>
  )
}

export default AuthContext