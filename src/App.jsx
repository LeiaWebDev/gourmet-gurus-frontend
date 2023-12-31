import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OneWorkshopPage from "./Pages/OneWorkshopPage";
import SearchResultPage from "./Pages/SearchResultPage";
import PaymentPage from "./Pages/PaymentPage";
import CreateWorkshopPage from "./Pages/CreateWorkshopPage";
import SeeMyWorkshops from "./Pages/SeeMyWorkshops";
import SeeMySessions from "./Pages/SeeMySessions";
import UpdateMyWorkshopPage from "./Pages/UpdateMyWorkshopPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import IsLoggedIn from "./Components/IsLoggedIn";
import NavBar from "./Components/NavBar";
import Search from "./Components/Search";
import UpdateProfile from "./Components/UpdateProfile";
import IsAdmin from "./Components/isAdmin";
import IsTeacher from "./Components/IsTeacher";
import BookingCreatePage from "./Pages/BookingCreatePage";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/workshops/:workshopId" element={<OneWorkshopPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />

        <Route path="/" element={<IsLoggedIn />}>
          <Route
            path="/booking/workshop/:workshopId"
            element={<BookingCreatePage />}
          />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/users/:userId/update-profile"
            element={<UpdateProfile />}
          />
        </Route>

        <Route path="/" element={<IsTeacher />}>
          <Route path="/create-workshop" element={<CreateWorkshopPage />} />
          <Route path="/see-workshops" element={<SeeMyWorkshops />} />
          <Route path="/update-workshop/:workshopId"
            element={<UpdateMyWorkshopPage />}
          />
          <Route path="/see-sessions/:workshopId" element={<SeeMySessions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
