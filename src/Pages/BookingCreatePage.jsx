import React, {useState, useEffect} from 'react'
// import { UserContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from 'react-router-dom'
import myApi from '../api/service'
import axios from 'axios'
// import { UserContext } from '../context/AuthContext';


 const API_URL = import.meta.env.VITE_API_URL;


function BookingCreatePage() {
    const [newBooking, setNewBooking] = useState({
        quantity: 1,
        session: "date",
        status: "pending",
        cancellation: "Free cancellation 48h before session date"
    })
    const [workshop, setWorkshop]= useState(null)
    const {workshopId} = useParams()
    const [user, setUser] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [session, setSession] = useState("date")
    const [status, setStatus] = useState("pending")
    const [cancellation, setCancellation] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()
    // const { authenticateUser } = useContext(UserContext);


    const handleValidateBooking = async(e) => {
        e.preventDefault();

        // const confirmedStatus = newBooking.status("Confirmed")
        // setBookingStatus(confirmedStatus)
        const bookingToCreate = {
          session: newBooking.session,
          status: "Pending",
          cancellation: newBooking.cancellation,
          quantity: newBooking.quantity,
          workshopId: workshopId,
        //   userId : workshop.userId,
        };

        myApi
      .createBooking(bookingToCreate)
      .then((response) => {
       console.log(response)
        const createdBooking = response.data;
        // alert("Your booking is ready for payment");
        // setNewBooking(createdBooking);
        navigate(`/payment`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    useEffect(() => {
        async function fetchWorkshopDetails(){
            try {
                const response = await myApi.get("/api/workshops/" + workshopId)
                setWorkshop(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchWorkshopDetails()
    }, [])

    const handleIncrement = () =>{
        // setQuantity(()=>(booking.quantity += 1))
        setNewBooking((prevBooking) => ({
        ...prevBooking,
        quantity: prevBooking.quantity + 1
        }));
      };
      
    const handleDecrement = () => {
        if (newBooking.quantity>1){
          setNewBooking((prevBooking) => ({
            ...prevBooking,
            quantity: prevBooking.quantity - 1
          }));
         
        }
  
      }
  
    let calculateTotalPrice=()=>{
        return newBooking.quantity * workshop.price
      }


    if(!workshop){
        return <div>loading...</div>
    }

console.log(workshop)
  return (
    // <div>title{workshop.title}</div>
    <div>
        <h1 className="cart">Your cart</h1>
        <div className="cart-text-details">
            <h2>{workshop.title}</h2>
            <img
                src={workshop.workshopPics[0]}
                alt={workshop.title}
            />
            <p>{workshop.duration} workshop</p>
        
            <p>Address : {workshop.location}</p>
            <p>{workshop.price} € / pers</p>

        </div>

        <div>
          <label>Sessions available</label>
          <select 
          name="session" 
          value={newBooking.session} 
          onChange={(e) => setNewBooking({...newBooking, session:e.target.value})}>
            
            <option value="date" disabled>
                Choose a date
            </option>

            {workshop.sessionsAvailable.map((date => (
                
                 <option key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                </option>

            )))}
          </select>
        </div>


        <div className='quantity'> 
            <p> Quantity:  </p>
            <button className='buttonCart' onClick={handleDecrement}>
            -
            </button>
            <p>{newBooking.quantity}</p>
            <button className='buttonCart' onClick={handleIncrement}>
            +
            </button>
        </div>
        <p>Total Price : {calculateTotalPrice()} euros</p>
        {/* <Link to={`/payment?amount=${calculateTotalPrice}`}> */}
        <Link>
            <button className="validate-booking" onClick={handleValidateBooking}>
                Validate Booking
            </button>
        </Link>
    </div>
 

  )
}

export default BookingCreatePage