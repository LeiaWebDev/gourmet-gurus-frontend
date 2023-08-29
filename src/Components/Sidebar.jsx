import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../context/AuthContext'

function Sidebar() {
    // const location = useLocation()
    // const {isLoggedIn, authenticateUser} = useContext(UserContext)

    // function logout(){
    //     localStorage.removeItem("token")
    //     authenticateUser()
    // }
  return (

    <div className='sidebar'>Sidebar</div>
  )
}

export default Sidebar