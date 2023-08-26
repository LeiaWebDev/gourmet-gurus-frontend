import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'


function NavBar({removeUser, user}) {

  const handleLogout = () => {
    removeUser()
    
  }

  return (
    <nav className="navbar">
            <div className="navbar-logo">
                <div>
                    <img src="/logo-gourmet-gurus.png" alt="Logo" />
                </div>
                {/* <NavLink className="btn-orange" to="/createad">
                    Create an ad
                </NavLink> */}
            </div>
            <Search />
            <div className="navbar-links">
                {/* <NavLink to={"/"}>
                    <img className="login-icon" src="/home.png" alt="home" />
                </NavLink> */}
                {/* <Search onSearch={handleSearch}/> */}
                {!user ? (
                    // {!isLogged ? (
                    <>
                        <NavLink to={"/signup"}>
                            <img className="signup-icon" src="/signin-icon.png" alt="Sign Up" />
                        </NavLink>
                        <NavLink to={"/login"}>
                            <img className="login-icon" src="/login.png" alt="Log in" />
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={"/signup"} onClick={handleLogout}>
                            <img className="login-icon" src="/logout.png" alt="Sign Up" />
                        </NavLink>

                    </>
                )}
            </div>
        </nav>
  )
}

export default NavBar