import React from "react";
import { Link } from "react-router-dom";
import "../styles/workshopCard.css";

const API_URL = import.meta.env.VITE_API_URL;

function WorkshopCard({
  _id: workshopId,
  title,
  category,
  duration,
  maxParticipants,
  description,
  workshopPics,
  location,
  price,
}) {
  return (
    <Link to={`/workshops/${workshopId}`}>
        <div className='workshopCard'>
            <p>
                <img className="card-workshop-pic"
                src={workshopPics[0]}
                alt="workshop"/>
            </p>
            <p>{title} </p>
            {/* <p> {category} category</p> */}
            <p>{duration} workshop</p>
            {/* <p>{maxParticipants} participants max</p> */}
            {/* <p>{description}</p> */}
            {/* <p>Address: {location}</p> */}
            <p>{price} € / pers</p>
        </div>
    </Link>
  );
}

export default WorkshopCard;
