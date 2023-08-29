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
            <span>
                <img className="card-workshop-pic"
                src={workshopPics[0]}
                alt="workshop"/>
            </span>
            <span>{title}</span>
            <span> {category}</span>
            <span>{duration}</span>
            <span>{maxParticipants} max participants</span>
            <span>{description}</span>
            <span>Address: {location}</span>
            <span>{price} € / pers</span>
        </div>
    </Link>
  );
}

export default WorkshopCard;
