import React, { useEffect, useState } from 'react'
import BookingPage from './BookingPage'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IsLoggedIn from '../Components/IsLoggedIn';
import myApi from '../api/service';
// import {calculateTotalPrice} from "./BookingPage"


const API_URL = import.meta.env.VITE_API_URL;


function BookingValidationPage() {
  const [myBooking, setMyBooking] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [bookingStatus, setBookingStatus] = useState("pending")
  // const totalPrice = myBooking.workshopId.price * myBooking.workshopId.quantity
  const {bookingId} = useParams()

  useEffect(() => {
    const getBookingDetails = async ()=>{
      try{
        const response = await myApi.getBookingDetails(bookingId)

        const bookingData = response.data
        setMyBooking(bookingData)
        setLoading(false) 
      } catch (error){
          console.log(error)
    }
  }
    getBookingDetails();
  }, [bookingId]);

//   async function fetchMyBooking() {
//     try {
//         const response = await axios.get(`${API_URL}/api/bookings/${myBooking._id}`)
//         .populate("workshopId");
//         setMyBooking(response.data);
//         console.log(response.data);
//     } catch (error) {
//         console.log(error);
//     }
// }

//     useEffect(()=>{
//       getBookingDetails()
    // },[])

    
  async function HandleDeleteChoosenWorkshop(workshopId){
    try {
      await axios.delete(`${API_URL}/api/bookings/${bookingId}/${workshopId}`);
      getBookingDetails();
  } catch (error) {
      console.log(error);
  }

  }

  const calculateTotalPrice=()=>{
    return myBooking.quantity * myBooking.workshopId.price
  }

  function handleBookingValidation(){
    const confirmedStatus = myBooking.status("Confirmed")
    setBookingStatus(confirmedStatus)
    navigate(`/payment`)
  }

  if(!myBooking){
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Booking validation</h1>
      <div className="booking-validation">
      
        
          <div className='recap-booking-details'>
            <img
              src={myBooking.workshopId.workshopPics[0]}
              alt={myBooking.workshopId.title}
            />
            <div className='text-booking-details'>
              <p>{myBooking.workshopId.title}</p>
              <p>{myBooking.workshopId.duration} workshop</p>
              <p>Choosen date: {myBooking.workshopId.sessionsAvailable}</p>
            </div>
            
            <p>{myBooking.workshopId.price}$/pers</p>
            <p>X{myBooking.workshopId.quantity}</p>
            <p>{calculateTotalPrice}</p>
            <button onClick={HandleDeleteChoosenWorkshop}>Delete</button>
          </div>
          

          <div className="booking-details-description">
              <h2>Details of workshop</h2>
              <p>{workshop.description}</p>
              <p>Workshop material : {myBooking.workshopId.workshopMaterial}</p>
              <p>Workshop location: {myBooking.workshopId.location}</p>
              
              <p>*Cancellation policy: Free cancellation 48h before session date</p>
             
          </div>
          
          
          <div> 
        
            <button onClick={handleBookingValidation}>Validate booking</button>
       
          </div>
          
        
        {/* )} */}
      
      </div>
    </div>
      
  )
}

export default BookingValidationPage