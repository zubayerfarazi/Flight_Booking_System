import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Booking from "./pages/Booking";
import FlightDetails from "./pages/FlightDetails";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import VerifyUser from "./pages/VerifyUser";
import AdminDashboard from "./pages/AdminDashboard";
import EditBooking from "./pages/EditBooking";
import EditFlightPage from "./pages/EditFlightPage";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/verify/:token" element={<VerifyUser />} />
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/flights/:id" element={<FlightDetails />} />
      <Route path="/admin/flights/edit/:id" element={<EditFlightPage />} />
      <Route path="/bookings/:id" element={<Booking />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/bookings/edit/:bookingId" element={<EditBooking />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
    </Routes>
  </Router>
);

export default App;
