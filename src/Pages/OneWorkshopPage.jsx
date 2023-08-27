import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import myApi from "../api/service";

const API_URL = import.meta.env.VITE_API_URL;

function OneWorkshopPage() {
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true)
  const { workshopId } = useParams();

  // const getOneWorkshop = useCallback(() => {
  //   const url = `${API_URL}/api/workshops/${workshopId}`
  //   console.log("Fetching from this url:", url);
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       const oneWorkshop = response.data;
  //       console.log(oneWorkshop);
  //       setWorkshop(oneWorkshop);
  //     })
  //     .catch((error) => console.log(error));
  // }, [workshopId]);

  useEffect(() => {
    const getWorkshop = ()=>{
      myApi.get(`api/workshops/${workshopId}`)
            .then((response)=>{
               const oneWorkshop = response.data
               setWorkshop(oneWorkshop)
               setLoading(false) 
            }).catch((error)=>{
              console.log(error)
            })
    }
    getWorkshop();
  }, [workshopId]);
  
  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="oneWorkshopPage">
      {/* {workshop ? (
        <div>
          <h1> Workshop: {workshop.title}</h1>
          <p>{workshop.description}</p>
        </div>
      ) : (
        <div> Loading ... </div>
      )} */}
        {workshop &&(
          <>
          <h1>{workshop.title}</h1>
          <img
            src={workshop.workshopPics}
            alt={workshop.title}
          />
          

          <div className="workshop-details">
              <h2>Details of workshop</h2>
              <p>Duration of workshop : {workshop.duration}</p>
              <p>Max participantd: {workshop.maxParticipants}</p>
              <p>{workshop.description}</p>
              <p>Workshop material : {workshop.workshopMaterial}</p>
          </div>
          
          <div className="price-availability">
            <p>{workshop.price}$/pers</p>
            <Link to={`workshop/teachers/${teacher._id}`}>
              {/* <p>{workshop.sessionsAvailable}</p> */}
              <p>Check for availatibilities: {workshop.sessionsAvailable} </p>
            </Link>
            
          </div>
          {/* <p>{workshop.category}</p>
          <p>{workshop.subCategory}</p> */}
          <div className="teacher-details">
            <h3>Teacher details :
              {/* <p>{workshop.teacherId}</p> */}
                <Link classname="teacher-details" to={`workshop/teachers/${teacher._id}`}>
                  {/* NOT SURE FOR LINK */}
                  <p>{workshop.teacherId.firstName}</p>
                  <p>{workshop.teacherId.lastName}</p>
                  <p>{workshop.teacherId.photo}</p>
                  <p>{workshop.teacherId.bio}</p>
                  
                </Link>
            </h3>
          </div>
          <div className="location">
            <h3>Workshop location : </h3>
            <p>{workshop.location}</p>
          </div>
        
          
          </>
        )}
      <div>
        <Link to={`/bookings/`}>
          {/* NOT SURE FOR LINK */}
        <button>Book workshop</button>
        </Link>
      </div>
    </div>
  );
}

export default OneWorkshopPage;
