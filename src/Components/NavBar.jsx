import React, { useContext } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Search from './Search'
import "../styles/navbar.css"
import AuthContext, { UserContext } from '../context/AuthContext'
import IsLoggedIn from './IsLoggedIn'

function NavBar() {

    const location = useLocation()
     // Subscribe to the AuthContext to gain access to
    // the values from AuthContext.Provider `value` prop
    const {isLoggedIn, user, authenticateUser} = useContext(UserContext)
    function logout(){
        localStorage.removeItem("token")
        authenticateUser()
    }

  return (
    <nav className="navbar">
            <div className="navbar-logo">
                <div>
                    <img src="/logo-gourmet-gurus.png" alt="Logo" />
                </div>
                {/* <NavLink className="btn-orange" to="/create-workshop">
                    Create a workshop
                </NavLink> */}
            </div>
            <Search />
            <div className="navbar-links">
                <NavLink to={"/"}>
                    <img className="auth-icon" src="/home.png" alt="home" />
                </NavLink>

                
                {/* !isloggedIn ? dispay non  legged : isadmin ? user : admin */}
                {!isLoggedIn ? (
                    
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
                      
                      <img onClick={logout} className="auth-icon" src="/logout.png" alt="Log out" />
                      
                        
                        {user.role === "Teacher" ? (
                            <>
                            <NavLink className="nav-text" to={"/see-workshops"}>See my workshops</NavLink>
                            <NavLink className="nav-text" to={"/users/:userId/update-profile"}>Update profile</NavLink>    
                            </>
                             
                        ):(
                            <></>
                        )}
                    </>
                )}
            </div>
        </nav>
  )
}

export default NavBar