import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


function isAdmin() {
    const {user, isLoggedIn, isLoading} = useContext(UserContext)
    if(isLoading){
      return <div>Loading...</div>
    }
    if(!isLoggedIn){
      return <Navigate to="/login"/>
    }
    
    if(user.role!== "Admin"){
        return <Navigate to="/"/>
    }
  
    return (
      <Outlet/>
    )
  }

export default isAdmin