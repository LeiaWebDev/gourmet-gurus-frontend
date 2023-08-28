import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import myApi from '../api/service';

import IsLoggedIn from "../Components/IsLoggedIn";

const API_URL = import.meta.env.VITE_API_URL;

function BookingPage() {
  const [user, SetUser] =useState(null)
  // const [isLoggedIn, setIsLoggedIn] = useState("true")
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const {bookingId} = useParams()
  const [sessionsAvailable, setSessionsAvailable] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()
  // const [counter, setCounter] = useState(1);
  // let incrementCounter = () => setCounter(counter + 1);
  // let decrementCounter = () => setCounter(counter - 1);
  // if(counter<=0) {
  //   decrementCounter = () => setCounter(1);
  // }
  

  // const setQuantity = (amount) => {
  //   // const setQuantity = (workshop, amount) => {
  //   // setBooking(booking=> booking.map(item=>item.id === workshop._id ?{
  //   // ...item,
  //   // quantity: item.quantity + amount
  //   // }:item))
  

    // workshop.map((sessions, index)=>{
    //   workshop.sessionsAvailable.index
    // })

    const handleIncrement = () =>{
      // setQuantity(()=>(booking.quantity += 1))
      setBooking((prevBooking) => ({
      ...prevBooking,
      quantity: prevBooking.quantity + 1
      }));
    };
    
    const handleDecrement = () => {
      if (booking.quantity>0){
        setBooking((prevBooking) => ({
          ...prevBooking,
          quantity: prevBooking.quantity - 1
        }));
        // setQuantity(()=>(booking.quantity -= 1))
      }

    }

    const calculateTotalPrice=()=>{
      return booking.quantity * booking.workshopId.price
    }


    const handleBooking=()=>{
      // if(user||workshopId){
      if(user||booking.workshopId){
        navigate(`/booking-details`)
      } else {
          alert ("You must be logged in to book a workshop")
          navigate(`/login`)
      }
    }

  useEffect(() => {
    const getBookingDetails = async ()=>{
      try{
        const response = await myApi.getBookingDetails(bookingId)
        // myApi.get(`${API_URL}/api/bookings/${bookingId}/bookingdetails/`)
        const bookingData = response.data
        setBooking(bookingData)
        setLoading(false) 
      } catch (error){
          console.log(error)
    }
  }
    getBookingDetails();
  }, [bookingId]);

  
  //myApi.get(`/api/workshops/${workshopId}/sessions/`)
  // useEffect(() => {
  //   const getSessionsAvailable = async () => {
  //     try {
  //       const response = await myApi.getAWorkshopSessions(booking.workshopId._id)
  //       const sessionsData = response.data
  //       // Update the sessions in the booking state
  //       //setBooking(sessionsData)
  //       // setBooking(prevBooking => ({ ...prevBooking, sessionsData }));
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   if(booking){
  //     getSessionsAvailable();
  //   }
    
  // }, [booking]);


  

  if(!booking){
    return <div>Loading...</div>
  }


  return (
    <div>
      <h1>Your Booking Details</h1>
      <h2>{booking.workshopId.title}</h2>
      <img
            src={booking.workshopId.workshopPics[0]}
            alt={booking.workshopId.title}
      />
      <p>{booking.workshopId.duration} workshop</p>
      
      <p>Address : {booking.workshopId.location}</p>
      <p>{booking.workshopId.price} € / pers</p>

      <div className='quantity'> 
        <p> Quantity:  </p>
        <button className='buttonCart' onClick={(e)=> handleDecrement()}>
          -
        </button>
        <p>{booking.quantity}</p>
        <button className='buttonCart' onClick={(e)=> handleIncrement()}>
          +
        </button>
      </div>
      <p>Total Price : {calculateTotalPrice()} euros</p>
      <div>
        <h3>Choose your session</h3>
        
          <select name="sessionsAvailable"  value={sessionsAvailable} onChange={(e) => setSessionsAvailable(e.target.value)}>
            <option value="-1" disabled>Choose an option</option>
            {booking.workshopId.sessionsAvailable.map(date => {
              console.log(date)
              return <option key={booking.workshopId.sessionsAvailable.date} value={date}>{new Date(date).toLocaleDateString()}</option>

            })}

          </select>

      </div>

      <div>
        
        <button onClick={handleBooking}>Book workshop</button>
       
      </div>
    </div>
  )
}

export default BookingPage