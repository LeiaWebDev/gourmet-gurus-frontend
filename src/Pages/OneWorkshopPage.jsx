import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import myApi from "../api/service";
import IsLoggedIn from "../Components/IsLoggedIn";
import { UserContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function OneWorkshopPage({user}) {
  const [workshop, setWorkshop] = useState(null)
  const [teacher, setTeacher] = useState(null)
  const navigate = useNavigate()
  const { workshopId, teacherId } = useParams()
  const [loading, setLoading] = useState(true)
  // const valuesFromContext = useContext(UserContext)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const getWorkshop = async () => {
      try {
      const response = await myApi.getWorkshopById(workshopId)
      const oneWorkshop = response.data
      setWorkshop(oneWorkshop)
      setLoading(false) 
      } catch (error) {
        console.log(error)
        }
    }
    getWorkshop()
  }, [workshopId]);
  


  useEffect(() => {
    const getTeacherDetails = async ()=>{
      try{
        const response = await myApi.getTeacherDetails(workshopId, workshop.teacherId)
        const teacherData = response.data.teacherId
        setTeacher(teacherData)
        
      } catch (error) {
          console.log(error)
            }
    }
    if(workshop && workshop.teacherId){
      getTeacherDetails();
    }
    
  }, [workshop]);


  const handleAvailability=(bookingId)=>{
      navigate(`/booking/${bookingId}`)
  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="oneWorkshopPage">
      
        {workshop &&(
          <>
          <h1>{workshop.title}</h1>
          <img
            src={workshop.workshopPics[0]}
            alt={workshop.title}
          />
          
          <div className="workshop-details">
              <h2>Details of workshop</h2>
              <p>Duration of workshop : {workshop.duration}</p>
              <p>Max participants: {workshop.maxParticipants}</p>
              <p>Description: {workshop.description}</p>
              <p>Workshop material : {workshop.workshopMaterial}</p>
          </div>
          
          <div className="price-availability">
            <p>{workshop.price}$/pers</p>
            {/* <Link to={`/booking/${bookingId}`}> */}
              <button onClick={handleAvailability}>Check availability</button>
            {/* </Link> */}
          </div>

          {teacher && (
            <div className="teacher-details">
              <h3>Teacher details :</h3>
                {/* <Link to={`workshops/teachers/${teacherId._id}`}> */}
                {/* <Link classname="teacher-details" to={`workshops/teachers/${teacherId._id}`}> */}
                {/* NOT SURE FOR LINK */}
              <p>{teacher.photo}</p>
              <p>First name : {teacher.firstName}</p>
              <p>Last name : {teacher.lastName}</p>
              <p>Teacher's bio: {teacher.bio}</p>
              {/* <p>Teacher's bio: {workshop.teacherId.bio}</p> */}
                {/* </Link> */}
            </div>

            )
          }
          
          
          <div className="workshop-location">
            <h3>Workshop location : </h3>
            <p>{workshop.location}</p>
          </div>
        
          
          </>
        )}
      
    </div>
  );
}

export default OneWorkshopPage;
