import React, {useState, useEffect} from 'react'
// import { UserContext } from "../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom'
import myApi from '../api/service'
import axios from 'axios'
// import { UserContext } from '../context/AuthContext';


 const API_URL = import.meta.env.VITE_API_URL;


function BookingCreatePage() {
    const [newBooking, setNewBooking] = useState({})
    const [workshop, setWorkshop]= useState({})
    const {workshopId} = useParams()
    const [user, setUser] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [session, setSession] = useState("date")
    const [status, setStatus] = useState("pending")
    const [cancellation, setCancellation] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()
    // const { authenticateUser } = useContext(UserContext);


    const handleValidateBooking = (e) => {
        e.preventDefault();
        const confirmedStatus = newBooking.status("Confirmed")
        setBookingStatus(confirmedStatus)
        const bookingToCreate = {
          session,
          status,
          cancellation,
          quantity,
        //   workshopId,
        //   userId,
        };

    const handleIncrement = () =>{
        // setQuantity(()=>(booking.quantity += 1))
        setNewBooking((prevBooking) => ({
        ...prevBooking,
        quantity: prevBooking.quantity + 1
        }));
      };
      
    const handleDecrement = () => {
        if (newBooking.quantity>0){
          setNewBooking((prevBooking) => ({
            ...prevBooking,
            quantity: prevBooking.quantity - 1
          }));
         
        }
  
      }
  
    let calculateTotalPrice=()=>{
        return booking.quantity * workshop.price
      }


    myApi
      .createBooking(bookingToCreate)
      .then((response) => {
       
        const createdBooking = response.data;
        alert("Your booking is ready for validation");
        setNewBooking(createdBooking);
        navigate(`/booking-details/${bookingId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    useEffect(() => {
        myApi.get("/api/workshops/" + workshopId).then(({data}) => {
            setWorkshop(data)
        }).catch(e => console.log(e))
    }, [])


  return (
    // <div>title{workshop.title}</div>
    <div>
        <h1 className="cart">Your cart</h1>
        <div classname="cart-text-details">
            <h2>{workshop.title}</h2>
            {/* <img
                src={workshop.workshopPics[0]}
                alt={workshop.title}
            /> */}
            <p>{workshop.duration} workshop</p>
        
            <p>Address : {workshop.location}</p>
            <p>{workshop.price} € / pers</p>

        </div>

        <div>
          <label>Sessions available</label>
          <select name="session" value={workshop.sessionsAvailable} onChange={(e) => setSession(e.target.value)}>
            <option value="-1" disabled>Choose a date</option>
            {workshop.sessionsAvailable.map(date => {
              console.log(date)
              return <option key={workshop.sessionsAvailable.date} value={date}>{new Date(date).toLocaleDateString()}</option>

            })}
          </select>
        </div>


        <div className='quantity'> 
            <p> Quantity:  </p>
            <button className='buttonCart' onClick={(e)=> handleDecrement()}>
            -
            </button>
            <p>{newBooking.quantity}</p>
            <button className='buttonCart' onClick={(e)=> handleIncrement()}>
            +
            </button>
        </div>
        <p>Total Price : {calculateTotalPrice()} euros</p>
        <Link to={`/payment?amount=${totalPrice}`}>
            <button className="validate-booking" type="submit" onClick={handleValidateBooking}>Validate Booking</button>
        </Link>
    </div>
 

  )
}

export default BookingCreatePage