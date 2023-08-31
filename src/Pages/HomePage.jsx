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
      <h1>Cooking workshops for foodies</h1>
      <div className="homepage-top">
      
        <div className="students-block">
          <div className="search-area">
              <h2>Learn new cooking skills with gourmet gurus here</h2>
              <Search />
          </div>
          <img className="img-homepage-top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.oneelevenchicago.com%2Fwp-content%2Fuploads%2F2016%2F07%2Fshutterstock_265896575.jpg&f=1&nofb=1&ipt=05d868d61d1e9985c67a3e922cfcd444ca20b1702d4536a493311004f8e4ccea&ipo=images" alt="cooking-class" />
        </div>
      
        <div className="chefs-block">
          <img className="img-homepage-top" src="https://content.money.com/wp-content/uploads/2016/10/gettyimages-596392966.jpg?quality=85" alt="chef-cooking" />
          <div className='create-workshop-area'>
            <h2 className="h2-padding">Gourmet gurus, share your passion with foodies here</h2>
            <Link to={`/create-workshop`}>
              <button className="btn">Create workshop</button>
            </Link>
          </div>
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

{/* <section className="suggested section container">
<div className="secContainer">


  <div className="secHeadear flex">

  </div>
</div>

<div className="mainContent grid">
  <div className="one-workshop"></div> 
  <div className="workshopImage"></div>


</div>
</section> */}