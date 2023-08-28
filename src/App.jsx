import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookingPage from "./Pages/BookingPage";
import HomePage from "./Pages/HomePage";
import OneWorkshopPage from "./Pages/OneWorkshopPage";
import SearchResultPage from "./Pages/SearchResultPage";
import BookingValidationPage from "./Pages/BookingValidationPage";
import FavoritesPage from "./Pages/FavoritesPage";
import PaymentPage from "./Pages/PaymentPage";
import CreateWorkshopPage from "./Pages/CreateWorkshopPage";
import SeeMyWorkshops from "./Pages/SeeMyWorkshops";
import SeeMySessions from "./Pages/SeeMySessions";
import UpdateMyWorkshopPage from "./Pages/UpdateMyWorkshopPage";
import CreateSessionPage from "./Pages/CreateSessionPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import IsLoggedIn from "./Components/IsLoggedIn";
import NavBar from "./Components/NavBar";
import Search from "./Components/Search";
import UpdateProfile from "./Components/UpdateProfile";
import IsAdmin from "./Components/IsAdmin"
import IsTeacher from "./Components/IsTeacher"
import BookingCreatePage from "./Pages/BookingCreatePage";


function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(localStorage.getItem("token"));
  function storeUser(userArg) {
      setUser(userArg);
      localStorage.setItem("user", JSON.stringify(userArg));
      // localStorage.setItem("token", JSON.stringify(userArg));
  }
  function removeUser() {
      setUser(null);
      localStorage.removeItem("user");
      // localStorage.removeItem("token");
  }

  return (
    <>
        {user ? <NavBar removeUser={removeUser} user={user}/> : <NavBar/>}

        {user && (
        <h1 className="welcome">Welcome {user.firstName} {user.lastName}</h1>
        )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/workshops/:workshopId" element={<OneWorkshopPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/booking/workshop/:workshopId" element={<BookingCreatePage />} />
        <Route path="/booking/:bookingId" element={<BookingPage />} />

        <Route path="/" element={<IsLoggedIn/>}>
          <Route path="/booking-details/" element={<BookingValidationPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
          <Route path="/create-workshop" element={<CreateWorkshopPage />} />
          <Route path="/see-workshops" element={<SeeMyWorkshops />} />
          <Route path="/update-workshop/:workshopId" element={<UpdateMyWorkshopPage />} />
        
          <Route path="/see-sessions" element={<SeeMySessions />} />
        <Route path="/" element={<IsTeacher/>}>
          <Route path="/create-session" element={<CreateSessionPage />} />
        </Route>
       
      </Routes>
    </>
  );
}

export default App;
