import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    <div>
      <div>
        <h1>Your search results</h1>
        {filteredWorkshops.map((workshop)=>{
          return (
            <div className='search-results' key={workshop._id}>
                <WorkshopCard/>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default SearchResultPage