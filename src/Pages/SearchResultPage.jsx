import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WorkshopCard from '../Components/WorkshopCard';
import myApi from '../api/service';
import Search from '../Components/Search';

const API_URL = import.meta.env.VITE_API_URL

function SearchResultPage() {
  const [searchResults, setSearchResults] = useState([])
  // const [filteredWorkshops, setFilteredWorkshops] = useState()
  const location = useLocation()
  const filteredWorkshops = location.state.filteredWorkshops||[]
  // const [searchParams, setSearchParams] = useSearchParams();
    // const search = searchParams.get("search");
    

  return (
    
      <div className='display-search-results'>
        <h1>Your search results</h1>
        {filteredWorkshops.map((workshop)=>{
          return (
            // <Link to={`/workshops/${workshop._id}`}>
              <div className='display-each-card' key={workshop._id}>
                  <WorkshopCard
                      key={workshop._id}
                      _id={workshop._id}
                      title={workshop.title}
                      category={workshop.category}
                      duration={workshop.duration}
                      maxParticipants={workshop.maxParticipants}
                      description={workshop.description}
                      workshopPics={workshop.workshopPics}
                      location={workshop.location}
                      price={workshop.price}
                  />
              </div>
            // </Link>
          )
          
        })}
      </div>

    
  )
}

export default SearchResultPage