import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
// import { UserContext } from '../context/AuthContext';
import { NavLink, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  // const [firstName, setfirstName] = useState("")
  // const [lastName, setlastName] = useState("")
  const navigate = useNavigate()
  // const {authenticateUser} = useContext(UserContext)

    async function handleSubmit(event){
      event.preventDefault()
      const createUser = {email, password}
      try {
        await axios.post(`${API_URL}/api/auth/signup`, createUser)
        navigate("/login")
      } catch (error) {
          setErrorMessage(event.response.data.message)
        }
      }
      
    
      return (
          <div>
            <h2>Signup</h2>
            <form className="form-Login" onSubmit={handleSubmit}>
               
              <div className="area-block">
                <div className="email-area">
                  <label className="label-login-form" htmlFor="email">
                      E-mail:{" "}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="password-area">
                  <label className="label-login-form" htmlFor="password">
                    Password:{" "}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
                <p className="error">{errorMessage}</p>
                <button type= "submit">Signup</button>
            </form>

            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
          </div>
      )
}

export default SignupPage