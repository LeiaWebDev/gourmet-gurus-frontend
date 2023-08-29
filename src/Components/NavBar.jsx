import React, { useContext } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Search from './Search'
import "../styles/navbar.css"
import AuthContext, { UserContext } from '../context/AuthContext'
import IsLoggedIn from './IsLoggedIn'

function NavBar() {

    
    
    // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop

    
  // const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
  // const {isLoggedIn, user} = useContext(AuthContext)
//  Update the rendering logic to display different content 
  //  depending on whether the user is logged in or not
  
  // const handleLogout = () => {
  //   removeUser()
    
  // }


//   const location = useLocation()
    // const {isLoggedIn, authenticateUser} = useContext(UserContext)
    // function logout(){
    //     localStorage.removeItem("token")
    //     authenticateUser()
    // }

  return (
    <nav className="navbar">
            <div className="navbar-logo">
                <div>
                    <img src="/logo-gourmet-gurus.png" alt="Logo" />
                </div>
                {/* <NavLink className="btn-orange" to="/create-workshop">
                    Create a worksop
                </NavLink> */}
            </div>
            <Search />
            <div className="navbar-links">
                <NavLink to={"/"}>
                    <img className="auth-icon" src="/home.png" alt="home" />
                </NavLink>
                {/* <Search onSearch={handleSearch}/> */}

                <NavLink to={"/see-workshops"}>See my workshops</NavLink>

                {!IsLoggedIn ? (
                    
                    <>
                        <NavLink to={"/signup"}>
                            <img className="auth-icon" src="/signin-icon.png" alt="Sign Up" />
                        </NavLink>
                        <NavLink to={"/login"}>
                            <img className="auth-icon" src="/login.png" alt="Log in" />
                        </NavLink>
                    </>
                ) : (
                    <>
                      {/* <NavLink to={"/login"} onClick={logout}>
                      <img className="auth-icon" src="/logout.png" alt="Log out" />
                      </NavLink> */}
                        <NavLink to={"/login"} >
                            <img className="auth-icon" src="/logout.png" alt="Log out" />
                        </NavLink>

                    </>
                )}
            </div>
        </nav>
  )
}

export default NavBar