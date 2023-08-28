import React, { useEffect, useState } from 'react'
import WorkshopCard from '../Components/WorkshopCard'
import myApi from '../api/service'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Search from '../Components/Search'

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL

function HomePage() {

  const [workshops, setWorkshops] = useState([])

  const getAllWorkshops = () =>{
    myApi.getAllWorkshops()
        .then((response)=>{
            setWorkshops(response.data)
        })
        .catch((error)=>{
          console.log(error)
        })
  }

    useEffect(()=>{
      getAllWorkshops()
    },[])

  return (
    <div className='homepage'>
  
      <div className='audience-persona'>
        <div className='search-area'>
          <Search/>
        </div>

        <div className='create-workshop-area'>
          <Link to={`/create-workshop}`}>
            <button className="button-create-workshop">Create a workshop</button>
          </Link>
        </div>
      </div>
      

      <div className='suggested-workshops'>
        <h1>Suggested workshops</h1>
        {workshops &&
          workshops.map((workshop, index) => (
            <WorkshopCard
              key={workshop._id}
              {...workshop}
              className="one-workshop-card"
            />

          ))
        }
      </div>
      
      
      </div>
  )
}

export default HomePage