import React from 'react'

function WorkshopCard({
    // _id: workshopId,
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
                <img
                src={image||placeholderImage}
                alt="workshop"/>
            </span>
            <span>{title}</span>
            <span> {category}</span>
            <span>{duration}</span>
            <span>{maxParticipants}</span>
            <span>{description}</span>
            <span>{workshopPics}</span>
            <span>{location}</span>
            <span>{price}</span>
        </div>
    </Link>
   
  )
}

export default WorkshopCard