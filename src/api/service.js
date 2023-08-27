import React from "react";
import axios from "axios";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

myApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); // Check if token is retrieved
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
    console.log(
      "Authorization header set with token:",
      request.headers.Authorization
    ); // Check if header is set
  }

  return request;
});

myApi.verifyUser = function () {
  return myApi.get("/auth/verify");
};

myApi.getWorkshopsByTeacherId = function (teacherId) {
  return myApi.get(`/api/workshops?teacherId=${teacherId}`);
};

myApi.getWorkshopById = function (workshopId) {
  return myApi.get(`/api/workshops/${workshopId}`);
};
myApi.updateWorkshopById = function (workshopId, updatedData) {
  return myApi.put(`/api/workshops/${workshopId}, updatedData`);
};

export default myApi;
