import React, { useEffect, useState } from "react";
import WorkshopCard from "../Components/WorkshopCard";
import myApi from "../api/service";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../Components/Search";
import "./../styles/userpages.css"
import "../styles/workshopCard.css";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [workshops, setWorkshops] = useState([]);

  const getAllWorkshops = () => {
    myApi
      .getAllWorkshops()
      .then((response) => {
        setWorkshops(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllWorkshops();
  }, []);

  return (
    <div className="homepage">
      <div className="audience-persona">
        <div className="search-area">
          <p>Look for a specific worshop here ...</p>
          <Search />
        </div>

        <div className='create-workshop-area'>
          <p>Teachers, create a workshop here</p>
          <Link to={`/create-workshop`}>
            <button className="btn">Create</button>
          </Link>
        </div>
      </div>

      <div className="suggested-workshops">
        <h1>Suggested workshops</h1>
        <div className="display-each-card">
          {workshops &&
            workshops.map((workshop, index) => (
              <WorkshopCard
                key={workshop._id}
                {...workshop}
                className="one-workshop-card"
              />
            ))}
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
