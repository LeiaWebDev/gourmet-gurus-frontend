import React from 'react'
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import myApi from '../api/service';

function PaymentPage() {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");
  const [booking, setBooking] = useState(null)
 
  const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
    // const paymentAmount = queryParams.get("amount");
//   const bookingId = queryParams.get("bookingId");

useEffect(() => {
    myApi.get('/api/bookings/last').then(response => {
        console.log(response)
        setBooking(response.data)
    }).catch(console.log)
},[])
  function handleSubmit(event) {
    event.preventDefault();
    if (!number || !date || !cvc || !name || !focus) {
        alert("Please fill in all required fields.");
       
    } else {
        updateBookingStatus() // Pass the bookingId to updateBookingStatus
    } 
    }  


    async function updateBookingStatus(){
        try {
            const response = await myApi.updateBookingStatus(booking._id);
            // const paymentAmount = booking.quantity * booking.workshopId.price
            console.log("Booking status updated:", response.data);
            alert(`Your payment of ${booking.quantity * booking.workshopId.price} euros has been validated, and booking is confirmed.`);
            
            // You might want to navigate to a confirmation page or some other route
          } catch (error) {
            console.log("Error updating booking status:", error);
            alert("An error occurred while updating booking status.");
          }
    }

    if (!booking) {
        return <p>Loading</p>
    }

  return (
    <div className="payment">
            <Cards number={number} expiry={date} cvc={cvc} name={name} focused={focus}></Cards>

                <h2 id="payment-amount">Payment details for {booking.quantity * booking.workshopId.price} euros</h2>
           

            <form onSubmit={handleSubmit} id="card-details">
                <div className="each-card">
                    <div className="Card">
                       
                        <label className="card-labels">Card Number</label>
                       
                        <input
                            className="card-inputs"
                            type="number"
                            name="number"
                            placeholder="Card Number"
                            value={number}
                            onChange={(e) => {
                                SetNumber(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                        
                    </div>

                    <div className="Card">
                        <label className="card-labels">Card Name</label>
                        <input
                            className="card-inputs"
                            type="text"
                            name="name"
                            placeholder="Card Name"
                            value={name}
                            onChange={(e) => {
                                SetName(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>

                    <div className="Card">
                        <label className="card-labels">Expiration date</label>
                        <input
                            className="card-inputs"
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={date}
                            onChange={(e) => {
                                SetDate(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                    <div className="Card">
                        <label className="card-labels">CVC</label>
                        <input
                            className="card-inputs"
                            type="number"
                            name="cvc"
                            placeholder="CVC"
                            value={cvc}
                            onChange={(e) => {
                                SetCvc(e.target.value);
                            }}
                            onFocus={(e) => SetFocus(e.target.name)}
                        ></input>
                    </div>
                    <button id="button" type="submit">
                        Validate payment
                    </button>
                </div>
            </form>
        </div>
  )
}

export default PaymentPage