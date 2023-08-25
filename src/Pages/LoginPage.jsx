import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useContext } from 'react'
// import {AuthContext} from '../context/AuthContext';
import { UserContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {authenticateUser} = useContext(UserContext)
  

  async function handleSubmit(event){
    event.preventDefault()
    const loginUser = {email, password}
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, loginUser)
      localStorage.setItem("token", response.data.token)
      authenticateUser()
      navigate("/")

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
        <h1 className="login">Login</h1>
        <form className="form-Login" onSubmit={handleSubmit}>
                
          <div className="area-block">
            <div className="email-area">
              <label className="label-login-form" htmlFor="email">
                E-Mail Address:{" "}
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
                <button type="submit">Login</button>
            </form>
    </div>
  )
}

export default LoginPage