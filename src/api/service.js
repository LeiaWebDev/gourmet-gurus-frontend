import React from 'react'
import axios from 'axios'

const myApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

myApi.interceptors.request.use((request)=>{
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return request
})

myApi.verifyUser = function (){
    return myApi.get("/api/auth/verify")
}

myApi.getAllBookings = function (){
    return myApi.get("/api/bookings")
}



export default myApi