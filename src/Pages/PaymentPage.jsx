import React from 'react'
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function PaymentPage() {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");
  // const [paymentAmount,setPaymentAmount] = useState([])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentAmount = searchParams.get("amount");

  function handleSubmit(event) {
    event.preventDefault();
    if (!number || !date || !cvc || !name || !focus) {
        alert("Please fill in all required fields.");
        return;
    } else {
        alert(`Your payment of ${paymentAmount} euros has been validated`);
    }
}


  return (
    <div className="payment">
            <Cards number={number} expiry={date} cvc={cvc} name={name} focused={focus}></Cards>

            <h2 id="payment-amount">Payment details for {paymentAmount} euros</h2>

            <form onSubmit={handleSubmit} id="card-details">
                <div className="toto">
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
                    <button id="payment-button" type="submit">
                        Validate payment
                    </button>
                </div>
            </form>
        </div>
  )
}

export default PaymentPage