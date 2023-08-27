import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearchParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const search = searchParams.get("search");

    useEffect(() => {
      console.log(search);
      axios
          .get(`${API_URL}?q=${search}`)
          .then((response) => {
              console.log(response);
              setFilteredAds(response.data);
          })
          .catch((e) => console.error(e));
  }, [searchParams]);

  console.log(filteredWorkshops)

  return (
    <div>
      <div>
        <h1>Your search results</h1>
        {filteredWorkshops.map((workshop)=>{
          return (
            <div className='search-results' key={workshop._id}>
                <div>
                  <Link to={`/workshops/${workshop._id}`}>
                    <h3>{workshop.title}</h3>
                  </Link>
                  <img src={workshop.workshopPics} alt={workshop.title}></img>
                  <h3>Duration: {workshop.duration}</h3>
                  <h3>Max participants: {workshop.maxParticipants}</h3>
                  <h3>Workshop material : {workshop.workshopMaterial}</h3>
                  <p>{workshop.price}$/pers</p>
                  <Link to={`workshop/teachers/${teacher._id}`}>
                    {/* <p>{workshop.sessionsAvailable}</p> */}
                    <p>Check for availatibilities: {workshop.sessionsAvailable} </p>
                  </Link>
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
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default SearchResultPage