import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearchParams, Link } from 'react-router-dom';
import WorkshopCard from '../Components/WorkshopCard';

const API_URL = import.meta.env.VITE_API_URL

function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const search = searchParams.get("search");

    useEffect(() => {
      console.log(search);
      axios
          .get(`${API_URL}/search-result?q=${search}`)
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
                <WorkshopCard/>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default SearchResultPage