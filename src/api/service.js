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
    return myApi.get("/auth/verify")
}

myApi.getWorkshopsByTeacherId = function (teacherId) {
    return myApi.get(`/api/workshops?teacherId=${teacherId}`)
}


export default myApi