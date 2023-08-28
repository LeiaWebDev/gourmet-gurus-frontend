import React, { useEffect, useState } from 'react'
import BookingPage from './BookingPage'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import IsLoggedIn from '../Components/IsLoggedIn';

const API_URL = import.meta.env.VITE_API_URL;


function BookingValidationPage() {
  const [myBooking, setmyBooking] = useState(null)
  const navigate = useNavigate()
  const totalPrice = myBooking.workshopId.price * myBooking.workshopId.quantity

  async function fetchMyBooking() {
    try {
        const response = await axios.get(`${API_URL}/bookings/${myBooking._id}`)
        .populate("workshopId");
        setmyBooking(response.data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

    useEffect(()=>{
      fetchMyBooking()
    },[])

    if(!myBooking){
      return <div>Loading...</div>
    }

  async function HandleDeleteItem(workshopId){
    try {
      await axios.delete(`${API_URL}/api/bookings/${bookingId}/${workshopId}`);
      fetchMyBooking();
  } catch (error) {
      console.log(error);
  }

  }

  function handleBookingValidation(){
    navigate(`/payment`)
  }


  return (
    <div>
      <h1>Booking details validation</h1>
      <div className="booking-validation">
      
        {workshop &&(
          <>
          <div className='recap-booking-details'>
            <img
              src={myBooking.workshopId.workshopPics}
              alt={myBooking.workshopId.title}
            />
            <p>{myBooking.workshopId.title}</p>
            <p>{myBooking.workshopId.price}$/pers</p>
            <p>{myBooking.workshopId.quantity}</p>
            <p>{totalPrice}</p>
            <button onClick={HandleDeleteItem}>Delete</button>
          </div>
          

          <div className="booking-details-description">
              <h2>Details of workshop</h2>
              <p>Duration of workshop : {myBooking.workshopId.duration}</p>
              <p>Max participantd: {myBooking.workshopId.maxParticipants}</p>
              <p>{workshop.description}</p>
              <p>Workshop material : {myBooking.workshopId.workshopMaterial}</p>
              <p>Workshop location: {myBooking.workshopId.location}</p>
              <p>Selected session: {myBooking.workshopId.sessionsAvailable}</p>
              <p>Cancellation policy: {myBooking.workshopId.cancellationPolicy}</p>
              {/* <p>Cancellation policy: {workshop.cancellationPolicy}</p> */}
          </div>
          
          
          <div>
        
            <button onClick={handleBookingValidation}>Validate booking</button>
       
          </div>
          
          </>
        )}
      
      </div>
    </div>
      
  )
}

export default BookingValidationPage