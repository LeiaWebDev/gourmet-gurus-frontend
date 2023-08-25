import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
// import { UserContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL

function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  // const {authenticateUser} = useContext(UserContext)


    async function handleSubmit(event){
      event.preventDefault()
      const createUser = {email, password}
      try {
        await axios.post(`${API_URL}/api/auth/signup`, createUser)
        navigate("/login")
      } catch (error) {
        console.log(error)
        if(event.response){
          setError(event.response.data.message)
          setTimeout(()=>{
            setError("")
          }, 3000)
        }
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
                <p className="error">{error}</p>
                <button>Signup</button>
            </form>

          </div>
      )
}

export default SignupPage