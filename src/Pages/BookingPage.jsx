import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import myApi from '../api/service';

import IsLoggedIn from "../Components/IsLoggedIn";

const API_URL = import.meta.env.VITE_API_URL;

function BookingPage() {
  const [user, setUser] = useState("")
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const {bookingId} = useParams()
  const [sessionAvailable, setSessionsAvailable] = useState("")
  const [quantity, setQuantity] = useState(0)
  // const [counter, setCounter] = useState(1);
  // let incrementCounter = () => setCounter(counter + 1);
  // let decrementCounter = () => setCounter(counter - 1);
  // if(counter<=0) {
  //   decrementCounter = () => setCounter(1);
  // }
// const totalAmount = workshop.price * counter

  // const setQuantity = (amount) => {
  //   // const setQuantity = (workshop, amount) => {
  //   // setBooking(booking=> booking.map(item=>item.id === workshop._id ?{
  //   // ...item,
  //   // quantity: item.quantity + amount
  //   // }:item))
  //   setBooking((prevBooking) => ({
  //     ...prevBooking,
  //     quantity: prevBooking.quantity + amount
  //   }));
  // };

    // workshop.map((sessions, index)=>{
    //   workshop.sessionsAvailable.index
    // })

    const handleIncrement = () =>{
      setQuantity(()=>(booking.quantity += 1))
    }  
    const handleDecrement = () => {
      if (booking.quantity>0){
        setQuantity(()=>(booking.quantity -= 1))
      }
      
    }
  const handleBooking=()=>{
    if(user||workshopId){
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
      <h1>Booking Details</h1>
      <h2>{booking.workshopId.title}</h2>
      <img
            src={booking.workshopId.workshopPics[0]}
            alt={booking.workshopId.title}
      />
      <p>{booking.workshopId.duration}</p>
      
      <p>{booking.workshopId.location}</p>
      <p>{booking.workshopId.price}$/pers</p>
      <div className='quantity'> 
        <p> Quantity: {booking.quantity} </p>
        {/* <button className='buttonCart' onClick={(e)=> setQuantity(1)}> */}
        <button className='buttonCart' onClick={(e)=> handleIncrement()}>
          +
        </button>
        {/* <button className='buttonCart' onClick={(e)=> setQuantity(-1)}> */}
        <button className='buttonCart' onClick={(e)=> handleDecrement()}>
          -
        </button>
        {/* <ButtonIncrement onClick={incrementCounter}/>
        <Display message={counter}/> 
        <ButtonDecrement onClick={decrementCounter}/> */}
      </div>

      <div>
        <h3>Choose your session</h3>
        
          <select name="sessionsAvailable"  value={sessionAvailable} onChange={(e) => setSessionsAvailable(e.target.value)}>
            <option value="-1" disabled>Choose an option</option>
            {booking.workshopId.sessionsAvailable.map(date => {
              return <option value={date}>{new Date(date).toLocaleDateString()}</option>

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