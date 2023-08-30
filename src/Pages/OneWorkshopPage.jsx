import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import myApi from "../api/service";
import IsLoggedIn from "../Components/IsLoggedIn";
import { UserContext } from "../context/AuthContext";
import "./../styles/userpages.css"


const API_URL = import.meta.env.VITE_API_URL;

function OneWorkshopPage({user}) {
  const [workshop, setWorkshop] = useState({})
  const [teacher, setTeacher] = useState(null)
  const navigate = useNavigate()
  const { workshopId, teacherId } = useParams()
  const [loading, setLoading] = useState(true)
  const [sessionsAvailable, setSessionsAvailable] = useState("")
  // const valuesFromContext = useContext(UserContext)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)


  const handleBooking=()=>{
    // if(user||workshopId){
      if(!IsLoggedIn){
        alert ("You must be logged in to book a workshop")
        navigate(`/login`)
    } else {
      navigate(`/booking/workshop/${workshopId}`)
    }
  }

  //display all the available dates from sessionsAvailable property of a workshopId that I'm looking at and also 
  const handleAvailability=()=>{
    if(workshop && workshop.sessionsAvailable){
      
    return workshop.sessionsAvailable.map((session, index)=>(
      <option key={index} value ={session}>
        {new Date (session).toLocaleDateString()}
      </option>
    )
    )}  return null; // Return null or a default option if sessionsAvailable is not available
  }
    // {booking.workshopId.sessionsAvailable.map(date => {
      //  
      //  return <option key={booking.workshopId.sessionsAvailable.date} value={date}>{new Date(date).toLocaleDateString()}</option>
      //         })}

  useEffect(() => {
    const getWorkshop = async () => {
      
      try {
        const workshopEndpoint = `${API_URL}/api/workshops/${workshopId}`;
        console.log("Workshop Endpoint:", workshopEndpoint);
        
      const response = await myApi.getWorkshopById(workshopId)
      console.log("Workshop Response:", response.data); 
      if(response.status === 200) {
        const oneWorkshop = response.data
        setWorkshop(oneWorkshop)
        setLoading(false) 
      } else {
        console.log("unexpected status code:", response.status)
      }
      
      } catch (error) {
        console.log("error fetching workshop:", error)
        }
    }
    getWorkshop()
  }, [workshopId]);
  
  console.log("Workshop State:", workshop); 

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




      
  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="oneWorkshopPage">
      
        {workshop &&(
          <>
          <h1>{workshop.title}</h1>
          <img className="oneWorkshopPage-pic"
            src={workshop.workshopPics[0]}
            alt={workshop.title}
          />
          
          <div className="workshop-details">
              <h2>Details of workshop</h2>
              <p>{workshop.duration} workshop</p>
              <p>Max participants: {workshop.maxParticipants}</p>
              <p>Description: {workshop.description}</p>
              <p>Workshop material: {workshop.workshopMaterial}</p>
          </div>
          
          <div className="price-availability">
            <h2>{workshop.price} € / pers</h2>
            <select 
              name="sessionsAvailable"  
              value={sessionsAvailable} 
              onChange={(e) => setSessionsAvailable(e.target.value)}>
             <option value="-1" disabled>
                Choose an option
              </option>
               {handleAvailability()}
            </select>
            {/* <Link to={`/booking/workshop/${workshopId}`}>Check availability */}
              {/* <button onClick={handleAvailability}>Check availability</button> */}
            {/* </Link> */}
          </div>

          {teacher && (
            <div className="teacher-details">
              <h2>Teacher's details :</h2>
                {/* <Link to={`workshops/teachers/${teacherId._id}`}> */}
                {/* <Link classname="teacher-details" to={`workshops/teachers/${teacherId._id}`}> */}
                {/* NOT SURE FOR LINK */}
              <p>{teacher.photo}</p>
              <p>{teacher.firstName}</p>
              <p>{teacher.lastName}</p>
              <p>A few words about the Teacher: {teacher.bio}</p>
          
            </div>

            )
          }
        
          <div className="workshop-location">
            <h2>Workshop location : </h2>
            <p>{workshop.location}</p>
          </div>
        
          
          </>
        )}
 
    
      <div>
        <Link to={`/booking/workshop/${workshopId}`} className="button-book-workshop">
          <button className="btn" onClick={handleBooking}>Book workshop</button>
        </Link>
        
      </div>
      
    </div>
  );
}

export default OneWorkshopPage;
