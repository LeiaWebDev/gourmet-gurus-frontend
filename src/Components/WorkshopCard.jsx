import React from "react";
import { Link } from "react-router-dom";
import "../styles/workshopCard.css";
import { BiTime } from "react-icons/bi";

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
   
        <div className='workshopCard'>
            <div>
                <img className="card-workshop-pic"
                src={workshopPics[0]}
                alt="workshop"/>
            </div>
            <Link to={`/workshops/${workshopId}`}>
            <p>{title} </p>
            </Link>
            {/* <p> {category} category</p> */}
            <p> <BiTime/> {duration} </p>
            <p>{price} € / pers</p>
        </div>
   
  );
}

export default WorkshopCard;
