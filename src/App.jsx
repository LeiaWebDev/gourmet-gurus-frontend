import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookingPage from "./Pages/BookingPage";
import HomePage from "./Pages/HomePage";
import OneWorkshopPage from "./Pages/OneWorkshopPage";
import SearchResultPage from "./Pages/SearchResultPage";
import OrderValidationPage from "./Pages/OrderValidationPage";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/workshops/:workshopId" element={<OneWorkshopPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/order-details" element={<OrderValidationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/create-workshop" element={<CreateWorkshopPage />} />
        <Route path="/see-workshops" element={<SeeMyWorkshops />} />
        <Route path="/update-workshop" element={<UpdateMyWorkshopPage />} />
        <Route path="/see-sessions" element={<SeeMySessions />} />
        <Route path="/create-session" element={<CreateSessionPage />} />
      </Routes>
    </>
  );
}

export default App;
