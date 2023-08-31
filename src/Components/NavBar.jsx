import React, { useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "./Search";
import "../styles/navbar.css";
import AuthContext, { UserContext } from "../context/AuthContext";
import IsLoggedIn from "./IsLoggedIn";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";

function NavBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, authenticateUser } = useContext(UserContext);
  function logout() {
    localStorage.removeItem("token");
    authenticateUser();
  }

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div>
          <Link to={"/"}>
            <img src="/logo-gourmet-gurus.png" alt="Logo" />
          </Link>
        </div>
        {/* <NavLink className="btn-orange" to="/create-workshop">
                    Create a workshop
                </NavLink> */}
      </div>
      <Search />

      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="col">
            <GiHamburgerMenu />
            <HiUserCircle className="userIconNav" />
          </div>

          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <div className="dropdown-icons">
              {user && <h3>Hello {user && <span> {user.firstName}</span>}</h3>}
            </div>

            {!isLoggedIn && (
              <ul className="dropDownItem">
                <Link to={"/login"}>
                  <li>
                    <h2>Log in</h2>
                  </li>
                </Link>

                <Link to={"/signup"}>
                  <li>
                    <h2>Sign up</h2>
                  </li>
                </Link>
              </ul>
            )}

            {IsLoggedIn && (
              <ul>
                <Link to={`/users/${user?._id}/update-profile`}>
                  <li>
                    <h3>Update profile</h3>
                  </li>
                </Link>

                <li>
                  <h2 onClick={logout}>
                    {" "}
                    <HiOutlineLogout />
                  </h2>
                </li>
              </ul>
            )}

            {IsLoggedIn && user?.role === "Teacher" && (
              <ul>
                <Link to={"/see-workshops"}>
                  <li>
                    <h3>See my workshops</h3>
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
